import {Controller, Post, Body, Res, HttpStatus} from "@nestjs/common";
import {Response} from "express";
import {LocalAuthGuard} from "../guards";
import {Public, UserExtractor} from "../decorators";
import {AccountContracts, IUserBaseData} from "@app-tasks/account";
import {UserService} from "./user.service";
import {RefreshTokenExtractor} from "../decorators/refresh-token-extractor.decorator";
import {createCookie} from "../helpers/create-cookie";
import {ConfigService} from "@nestjs/config";
import {RefreshTokenEntrypoint} from "../decorators/is-refresh-token.decorator";

@Controller("user")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
	) {}

	@Post("register")
	@Public()
	async register(
		@Body() body: AccountContracts.Auth.register.RequestDto,
		@Res() res: Response,
	) {
		const {tokenAccess, tokenRefresh} = await this.userService.register(body);
		this.genCookies(res, tokenRefresh, tokenAccess);
		return res.status(HttpStatus.OK).json();
	}

	@Post("login")
	@Public()
	@LocalAuthGuard()
	async login(
		@UserExtractor()
		{tokenAccess, tokenRefresh}: AccountContracts.Auth.login.ResponseDto, // здесь такой тип, потому что localStrategy в request.user кладет именно эти данные
		@Res() res: Response,
	) {
		this.genCookies(res, tokenRefresh, tokenAccess);
		return res.status(HttpStatus.OK).json();
	}

	@Post("logout")
	async logout(@UserExtractor() user: IUserBaseData, @Res() res: Response) {
		await this.userService.logout({userId: user.id});
		createCookie({
			res,
			key: this.configService.get("KEY_COOKIE_TOKEN_REFRESH") || "tokenRefresh",
			hash: "",
			path: "/api/user/refresh-token",
		});
		return res.status(HttpStatus.OK).json();
	}

	@Post("refresh-token")
	@RefreshTokenEntrypoint()
	async refreshToken(
		@UserExtractor() {id}: IUserBaseData,
		@RefreshTokenExtractor() token: string,
		@Res() res: Response,
	) {
		const {tokenAccess, tokenRefresh} = await this.userService.refreshToken({
			userId: id,
			refreshToken: token,
		});

		this.genCookies(res, tokenRefresh, tokenAccess);
		return res.status(HttpStatus.OK).json();
	}

	private genCookies(res: Response, tokenRefresh: string, tokenAccess: string) {
		createCookie({
			res,
			key: this.configService.get("KEY_COOKIE_TOKEN_REFRESH") || "tokenRefresh",
			hash: tokenRefresh,
			path: "/api/user/refresh-token",
		});
		createCookie({
			res,
			key: this.configService.get("KEY_COOKIE_TOKEN_ACCESS") || "tokenAccess",
			hash: tokenAccess,
			httpOnly: false,
		});
	}
}

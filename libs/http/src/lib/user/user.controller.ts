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
import {ApiUserContracts} from "../contracts/user.contracts";

@Controller("user")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
	) {}

	@Post("register")
	@Public()
	async register(
		@Body() body: ApiUserContracts.Auth.register.RequestDto,
		@Res() res: Response<ApiUserContracts.Auth.register.ResponseDto>,
	) {
		const {tokenRefresh, ...response} = await this.userService.register(body);
		this.genCookies(res, tokenRefresh);
		const t = response as ApiUserContracts.Auth.register.ResponseDto;
		return res.status(HttpStatus.OK).json(t);
	}

	@Post("login")
	@Public()
	@LocalAuthGuard()
	async login(
		@UserExtractor()
		{tokenRefresh, ...response}: AccountContracts.Auth.login.ResponseDto, // здесь такой тип, потому что localStrategy в request.user кладет именно эти данные
		@Res() res: Response<ApiUserContracts.Auth.register.ResponseDto>,
	) {
		this.genCookies(res, tokenRefresh);
		return res.status(HttpStatus.OK).json(response);
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
		@Res() res: Response<ApiUserContracts.Auth.tokenRefresh.ResponseDto>,
	) {
		const {tokenAccess, tokenRefresh} = await this.userService.refreshToken({
			userId: id,
			refreshToken: token,
		});

		this.genCookies(res, tokenRefresh);
		return res.status(HttpStatus.OK).json({tokenAccess});
	}

	private genCookies(res: Response, tokenRefresh: string) {
		createCookie({
			res,
			key: this.configService.get("KEY_COOKIE_TOKEN_REFRESH") || "tokenRefresh",
			hash: tokenRefresh,
			path: "/api/user/refresh-token",
		});
	}
}

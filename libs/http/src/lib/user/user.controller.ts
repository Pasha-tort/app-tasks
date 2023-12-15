import {Controller, Post, Body, Res, HttpStatus} from "@nestjs/common";
import {Response} from "express";
import {LocalAuthGuard} from "../guards";
import {Public, UserExtractor} from "../decorators";
import {AccountContracts, IJwtPayload, IUserBaseData} from "@account-lib";
import {UserService} from "./user.service";
import {RefreshTokenExtractor} from "../decorators/refresh-token-extractor.decorator";
import {createCookie} from "../helpers/create-cookie";
import {ConfigService} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";
// import {clearCookie} from "../helpers/clear-cookie";
import {RefreshTokenEntrypoint} from "../decorators/is-refresh-token.decorator";

@Controller("user")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}

	@Post("register")
	@Public()
	async register(@Body() body: AccountContracts.Auth.register.RequestDto) {
		return this.userService.register(body);
	}

	@Post("login")
	@Public()
	@LocalAuthGuard()
	async login(
		@UserExtractor()
		{tokenAccess, tokenRefresh}: AccountContracts.Auth.login.ResponseDto, // здесь такой тип, потому что localStrategy в request.user кладет именно эти данные
		@Res() res: Response,
	) {
		const decodedTokenRefresh =
			this.jwtService.decode<IJwtPayload>(tokenRefresh);
		const decodedTokenAccess = this.jwtService.decode<IJwtPayload>(tokenAccess);

		createCookie(
			res,
			this.configService.get("configService") || "tokenRefresh",
			tokenRefresh,
			{expire: decodedTokenRefresh.exp * 1000},
		);
		return res
			.status(HttpStatus.OK)
			.json({tokenAccess, expire: decodedTokenAccess.exp * 1000});
	}

	@Post("logout")
	async logout(@UserExtractor() user: IUserBaseData, @Res() res: Response) {
		await this.userService.logout({userId: user.id});
		createCookie(
			res,
			this.configService.get("configService") || "tokenRefresh",
			"",
			{expire: Date.now()},
		);
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

		const decodedTokenAccess =
			this.jwtService.decode<IJwtPayload>(tokenRefresh);
		const decodedTokenRefresh =
			this.jwtService.decode<IJwtPayload>(tokenRefresh);

		createCookie(
			res,
			this.configService.get("configService") || "tokenRefresh",
			tokenRefresh,
			{expire: decodedTokenRefresh.exp * 1000},
		);
		return res
			.status(HttpStatus.OK)
			.json({tokenAccess, expire: decodedTokenAccess.exp * 1000});
	}
}

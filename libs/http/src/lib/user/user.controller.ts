import {
	Controller,
	Post,
	Body,
	Res,
	HttpStatus,
	Get,
	HttpException,
} from "@nestjs/common";
import {Response} from "express";
import {LocalAuthGuard} from "../guards";
import {Public, UserExtractor} from "../decorators";
import {AccountContracts, IJwtPayload, IUserBaseData} from "@app-tasks/account";
import {UserService} from "./user.service";
import {RefreshTokenExtractor} from "../decorators/refresh-token-extractor.decorator";
import {createCookies} from "../helpers/create-cookie";
import {ConfigService} from "@nestjs/config";
import {RefreshTokenEntrypoint} from "../decorators/is-refresh-token.decorator";
import {ApiUserContracts} from "../contracts/user.contracts";
import {JwtService} from "@nestjs/jwt";

@Controller("user")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}

	@Post(ApiUserContracts.Auth.register.path)
	@Public()
	async register(
		@Body() body: ApiUserContracts.Auth.register.RequestDto,
		@Res() res: Response<ApiUserContracts.Auth.register.ResponseDto>,
	): Promise<Response<ApiUserContracts.Auth.register.ResponseDto>> {
		if (body.password !== body.confirm)
			throw new HttpException("Password mismatch", 401);
		const {tokenRefresh, tokenAccess, ...response} =
			await this.userService.register(body);
		this.genCookiesForTokens(res, tokenRefresh, tokenAccess);
		return res.status(HttpStatus.OK).json(response);
	}

	@Post(ApiUserContracts.Auth.login.path)
	@Public()
	@LocalAuthGuard()
	async login(
		@UserExtractor()
		{
			tokenRefresh,
			tokenAccess,
			...response
		}: AccountContracts.Auth.login.ResponseDto, // здесь такой тип, потому что localStrategy в request.user кладет именно эти данные
		@Res() res: Response<ApiUserContracts.Auth.register.ResponseDto>,
	): Promise<Response<ApiUserContracts.Auth.register.ResponseDto>> {
		this.genCookiesForTokens(res, tokenRefresh, tokenAccess);
		return res.status(HttpStatus.OK).json(response);
	}

	@Post(ApiUserContracts.Auth.logout.path)
	async logout(@UserExtractor() user: IUserBaseData, @Res() res: Response) {
		await this.userService.logout({userId: user.id});
		createCookies(res, [
			{
				key:
					this.configService.get("KEY_COOKIE_TOKEN_REFRESH") || "tokenRefresh",
				hash: "",
				path: "/api/user/refresh-token",
			},
			{
				key: this.configService.get("KEY_COOKIE_TOKEN_ACCESS") || "tokenAccess",
				hash: "",
			},
		]);
		return res.status(HttpStatus.OK).json({});
	}

	@Post(ApiUserContracts.Auth.tokenRefresh.path)
	@RefreshTokenEntrypoint()
	async tokenRefresh(
		@UserExtractor() user: IUserBaseData,
		@RefreshTokenExtractor() token: string,
		@Res() res: Response,
	): Promise<Response<ApiUserContracts.Auth.tokenRefresh.ResponseDto> | void> {
		const {tokenAccess, tokenRefresh, ...response} =
			await this.userService.refreshToken({
				userId: user.id,
				refreshToken: token,
			});
		this.genCookiesForTokens(res, tokenRefresh, tokenAccess);
		return res.status(HttpStatus.OK).json(response);
	}

	@Get(ApiUserContracts.Auth.checkToken.path)
	/**
	 * !! Это запрос не к ресурсу, этот запрос нужен для того что бы фронт мог проверить жив ли tokenAccess
	 * Если jwt guard пропустит запрос, то accessToken можно считать валидным и запрос успешно завершить,
	 * если с accessToken'ом что то не так, то guard завалаит запрос сама
	 */
	async checkToken(@Res() res: Response) {
		return res.status(HttpStatus.OK).json({});
	}

	private genCookiesForTokens(
		res: Response,
		tokenRefresh: string,
		tokenAccess: string,
	) {
		const trExp = new Date(
			this.jwtService.decode<IJwtPayload>(tokenRefresh).exp * 1000,
		);
		const taExp = new Date(
			this.jwtService.decode<IJwtPayload>(tokenAccess).exp * 1000,
		);

		createCookies(res, [
			{
				key:
					this.configService.get("KEY_COOKIE_TOKEN_REFRESH") || "tokenRefresh",
				hash: tokenRefresh,
				path: "/api/user/token-refresh",
				options: {expire: trExp},
			},
			{
				key: this.configService.get("KEY_COOKIE_TOKEN_ACCESS") || "tokenAccess",
				hash: tokenAccess,
				httpOnly: false,
				path: "/",
				options: {expire: taExp},
			},
			{
				key:
					this.configService.get("KEY_COOKIE_TOKEN_ACCESS_EXP") ||
					"tokenAccessExp",
				hash: taExp.getTime().toString(),
				httpOnly: false,
				path: "/",
				options: {expire: taExp},
			},
		]);
	}
}

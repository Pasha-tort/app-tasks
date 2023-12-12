import {Controller, Post, Body, UseGuards} from "@nestjs/common";
import {LocalAuthGuard} from "../guards";
import {Public, UserExtractor} from "../decorators";
import {AccountContracts, IJwtPayload, IUser} from "@account-lib";
import {UserService} from "./user.service";
import {RefreshTokenGuard} from "../guards/refresh-auth.guard";
import {RefreshTokenExtractor} from "../decorators/refresh-token-extractor.decorator";
import {RefreshTokenEntrypoint} from "../decorators/is-refresh-token.decorator";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

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
	) {
		return {access_token: tokenAccess, token_refresh: tokenRefresh};
	}

	@Post("logout")
	async logout(@UserExtractor() user: IUser) {
		await this.userService.logout({userId: user.id!});
	}

	@Post("refresh-token")
	@RefreshTokenEntrypoint()
	@UseGuards(RefreshTokenGuard)
	async refreshToken(
		@UserExtractor() user: IJwtPayload,
		@RefreshTokenExtractor() token: string,
	) {
		return this.userService.refreshToken({
			userId: user.iss,
			refreshToken: token,
		});
	}
}

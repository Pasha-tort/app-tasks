import {Controller, Post, Body} from "@nestjs/common";
import {LocalAuthGuard} from "../guards";
import {Public, UserExtractor} from "../decorators";
import {AccountContracts} from "@account-lib";
import {UserService} from "./user.service";

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
		{tokenAccess, tokenRefresh}: AccountContracts.Auth.login.ResponseDto,
	) {
		return {access_token: tokenAccess, token_refresh: tokenRefresh};
	}
}

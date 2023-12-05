import {Controller, Post, Body} from "@nestjs/common";
import {AccountContracts} from "@account-lib";
import {AuthService} from "./auth.service";
import {LocalAuthGuard, UserExtractor, UserEntity} from "@users-lib";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	async register(@Body() body: AccountContracts.Auth.register.RequestDto) {
		return this.authService.register(body);
	}

	@Post("login")
	@LocalAuthGuard()
	async login(@UserExtractor() user: UserEntity) {
		console.log({user});
		return this.authService.login(user);
	}
}

import {Controller, Post, Body} from "@nestjs/common";
import {LocalAuthGuard} from "../guards";
import {Public, UserExtractor} from "../decorators";
import {AccountContracts, UserEntity} from "@account-lib";
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
	async login(@UserExtractor() {token}: UserEntity) {
		return {access_token: token};
	}
}

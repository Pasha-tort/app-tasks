import {AccountRmqService} from "@account-lib";
import {Controller, Post} from "@nestjs/common";
import {ApiAccountContracts} from "@api-lib";

@Controller("account")
export class AccountController {
	constructor(private readonly accountRmqService: AccountRmqService) {}

	@Post("register")
	async register(payload: ApiAccountContracts.Auth.register.RequestDto) {
		return this.accountRmqService.register(payload);
	}

	@Post("login")
	async login(payload: ApiAccountContracts.Auth.login.RequestDto) {
		return this.accountRmqService.login(payload);
	}
}

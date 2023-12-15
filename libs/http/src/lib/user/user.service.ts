import {AccountRmqService, AccountContracts} from "@app-tasks/account";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserService {
	constructor(private readonly accountRmqService: AccountRmqService) {}

	async register(payload: AccountContracts.Auth.register.RequestDto) {
		return this.accountRmqService.register(payload);
	}

	async login(payload: AccountContracts.Auth.login.RequestDto) {
		return this.accountRmqService.login(payload);
	}

	async logout(payload: AccountContracts.Auth.logout.RequestDto) {
		return this.accountRmqService.logout(payload);
	}

	async refreshToken(payload: AccountContracts.Auth.refreshToken.RequestDto) {
		return this.accountRmqService.refreshToken(payload);
	}
}

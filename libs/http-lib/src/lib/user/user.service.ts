import {AccountRmqService, AccountContracts} from "@account-lib";
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

	async getAndCheckUser(
		payload: AccountContracts.Auth.getAndCheckUser.RequestDto,
	) {
		return this.accountRmqService.getAndCheckUser(payload);
	}
}

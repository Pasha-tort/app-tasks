import {Injectable} from "@nestjs/common";
import {RMQService, RMQRoute} from "nestjs-rmq";
import {AccountContracts} from "../slice";

@Injectable()
export class AccountRmqService {
	constructor(private readonly rmqService: RMQService) {}

	async register(payload: AccountContracts.Auth.register.RequestDto) {
		return this.rmqService.send<
			AccountContracts.Auth.register.RequestDto,
			AccountContracts.Auth.register.ResponseDto
		>(AccountContracts.Auth.register.topic, payload);
	}
	static registerRpc = () => RMQRoute(AccountContracts.Auth.register.topic);

	async login(payload: AccountContracts.Auth.login.RequestDto) {
		return this.rmqService.send<
			AccountContracts.Auth.login.RequestDto,
			AccountContracts.Auth.login.ResponseDto
		>(AccountContracts.Auth.login.topic, payload);
	}
	static loginRpc = () => RMQRoute(AccountContracts.Auth.login.topic);

	async logout(payload: AccountContracts.Auth.logout.RequestDto) {
		return this.rmqService.send(AccountContracts.Auth.logout.topic, payload);
	}
	static logoutRpc = () => RMQRoute(AccountContracts.Auth.logout.topic);

	async refreshToken(payload: AccountContracts.Auth.refreshToken.RequestDto) {
		return this.rmqService.send<
			AccountContracts.Auth.refreshToken.RequestDto,
			AccountContracts.Auth.refreshToken.ResponseDto
		>(AccountContracts.Auth.refreshToken.topic, payload);
	}
	static refreshTokenRpc = () =>
		RMQRoute(AccountContracts.Auth.refreshToken.topic);
}

import {Controller} from "@nestjs/common";
import {AccountContracts, AccountRmqService} from "@account-lib";
import {AuthService} from "./auth.service";
import {RMQTransform, RMQValidate} from "nestjs-rmq";

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@RMQValidate()
	@RMQTransform()
	@AccountRmqService.registerRpc()
	async register(dto: AccountContracts.Auth.register.RequestDto) {
		return this.authService.register(dto);
	}

	@RMQValidate()
	@RMQTransform()
	@AccountRmqService.loginRpc()
	async login(dto: AccountContracts.Auth.login.RequestDto) {
		return this.authService.login(dto);
	}

	@RMQValidate()
	@RMQTransform()
	@AccountRmqService.getAndCheckRpc()
	async getAndCheck(dto: AccountContracts.Auth.getAndCheck.RequestDto) {
		return this.authService.getAndCheck(dto);
	}
}

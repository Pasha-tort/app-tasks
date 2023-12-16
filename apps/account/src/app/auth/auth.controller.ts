import {Controller} from "@nestjs/common";
import {AccountContracts} from "@slice";
import {AccountRmqService} from "@transport";
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
	@AccountRmqService.logoutRpc()
	async logout(dto: AccountContracts.Auth.logout.RequestDto) {
		return this.authService.logout(dto);
	}

	@RMQValidate()
	@RMQTransform()
	@AccountRmqService.refreshTokenRpc()
	async refreshToken(dto: AccountContracts.Auth.refreshToken.RequestDto) {
		return this.authService.refreshTokens(dto);
	}
}

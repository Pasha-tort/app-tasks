import {Body, Controller} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {RMQRoute, RMQTransform, RMQValidate} from "nestjs-rmq";
import {AccountContracts} from "@account-lib";

@Controller()
export class AuthGateway {
	constructor(private readonly authService: AuthService) {}

	@RMQValidate()
	@RMQTransform()
	@RMQRoute(AccountContracts.Auth.register.topic)
	async register(@Body() dto: AccountContracts.Auth.register.RequestDto) {
		return this.authService.register(dto);
	}

	@RMQValidate()
	@RMQTransform()
	@RMQRoute(AccountContracts.Auth.login.topic)
	async login(@Body() dto: AccountContracts.Auth.login.RequestDto) {
		console.log({gatewayDto: dto});
		// return this.authService.login(dto);
	}
}

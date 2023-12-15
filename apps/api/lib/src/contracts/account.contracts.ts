import {AccountContracts} from "@app-tasks/account";
import {Exclude} from "class-transformer";

export namespace ApiAccountContracts {
	export namespace Auth {
		export namespace register {
			@Exclude()
			export class RequestDto extends AccountContracts.Auth.register
				.RequestDto {}

			@Exclude()
			export class ResponseDto extends AccountContracts.Auth.register
				.ResponseDto {}
		}

		export namespace login {
			@Exclude()
			export class RequestDto extends AccountContracts.Auth.login.RequestDto {}

			@Exclude()
			export class ResponseDto extends AccountContracts.Auth.login
				.ResponseDto {}
		}
	}
}

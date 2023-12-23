import {AccountContracts} from "@app-tasks/account";
import {Exclude} from "class-transformer";

export namespace ApiUserContracts {
	export namespace Auth {
		export namespace register {
			@Exclude()
			export class RequestDto extends AccountContracts.Auth.register
				.RequestDto {}

			export class ResponseDto
				implements
					Omit<AccountContracts.Auth.register.ResponseDto, "tokenRefresh">
			{
				tokenAccess: string;
				name: string;
				email: string;
				id: string;
			}
		}

		export namespace login {
			@Exclude()
			export class RequestDto extends AccountContracts.Auth.login.RequestDto {}

			export class ResponseDto
				implements
					Omit<AccountContracts.Auth.login.ResponseDto, "tokenRefresh">
			{
				tokenAccess: string;

				name: string;

				email: string;

				id: string;
			}
		}

		export namespace logout {
			@Exclude()
			export class RequestDto extends AccountContracts.Auth.logout.RequestDto {}
		}

		export namespace tokenRefresh {
			@Exclude()
			export class RequestDto extends AccountContracts.Auth.refreshToken
				.RequestDto {}

			export class ResponseDto
				implements
					Omit<AccountContracts.Auth.refreshToken.ResponseDto, "tokenRefresh">
			{
				tokenAccess: string;
			}
		}
	}
}

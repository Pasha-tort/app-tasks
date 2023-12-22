import {AccountContracts} from "@app-tasks/account";
import {Exclude, Expose} from "class-transformer";

export namespace ApiUserContracts {
	export namespace Auth {
		export namespace register {
			@Exclude()
			export class RequestDto extends AccountContracts.Auth.register
				.RequestDto {}

			@Exclude()
			export class ResponseDto
				implements
					Omit<AccountContracts.Auth.register.ResponseDto, "tokenRefresh">
			{
				@Expose()
				tokenAccess: string;

				@Expose()
				name: string;

				@Expose()
				email: string;

				@Expose()
				id: string;
			}
		}

		export namespace login {
			@Exclude()
			export class RequestDto extends AccountContracts.Auth.login.RequestDto {}

			@Exclude()
			export class ResponseDto
				implements
					Omit<AccountContracts.Auth.login.ResponseDto, "tokenRefresh">
			{
				@Expose()
				tokenAccess: string;

				@Expose()
				name: string;

				@Expose()
				email: string;

				@Expose()
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

			@Exclude()
			export class ResponseDto
				implements
					Omit<AccountContracts.Auth.refreshToken.ResponseDto, "tokenRefresh">
			{
				@Expose()
				tokenAccess: string;
			}
		}
	}
}

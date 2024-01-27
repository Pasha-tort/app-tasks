import {AccountContracts, IUserBaseData} from "@app-tasks/account.slice";
import {Exclude, Expose} from "class-transformer";
import {IsString} from "class-validator";

export namespace ApiUserContracts {
	export namespace Auth {
		export namespace register {
			export const path = "/register";
			@Exclude()
			export class RequestDto extends AccountContracts.Auth.register
				.RequestDto {
				@Expose()
				@IsString()
				confirm: string;
			}

			export class ResponseDto implements IUserBaseData {
				name: string;
				email: string;
				id: string;
			}
		}

		export namespace login {
			export const path = "/login";
			@Exclude()
			export class RequestDto extends AccountContracts.Auth.login.RequestDto {}

			export class ResponseDto implements IUserBaseData {
				name: string;
				email: string;
				id: string;
			}
		}

		export namespace tokenRefresh {
			export const path = "token-refresh";
			export class ResponseDto
				implements
					Pick<
						AccountContracts.Auth.refreshToken.ResponseDto,
						"email" | "name" | "id"
					>
			{
				name: string;
				email: string;
				id: string;
			}
		}

		export namespace logout {
			export const path = "/logout";
		}
		export namespace checkToken {
			export const path = "/check-token";

			export class ResponseDto implements IUserBaseData {
				name: string;
				email: string;
				id: string;
			}
		}

		export namespace editName {
			export const path = "/edit-name";

			@Exclude()
			export class RequestDto
				implements Pick<AccountContracts.Auth.editName.RequestDto, "newName">
			{
				@Expose()
				@IsString()
				newName: string;
			}

			@Exclude()
			export class ResponseDto extends AccountContracts.Auth.editName
				.ResponseDto {}
		}
	}
}

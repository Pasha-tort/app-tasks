import {AccountContracts, IUserBaseData} from "@app-tasks/account";
import {Exclude} from "class-transformer";

export namespace ApiUserContracts {
	export namespace Auth {
		export namespace register {
			@Exclude()
			export class RequestDto extends AccountContracts.Auth.register
				.RequestDto {}

			export class ResponseDto implements IUserBaseData {
				name: string;
				email: string;
				id: string;
			}
		}

		export namespace login {
			@Exclude()
			export class RequestDto extends AccountContracts.Auth.login.RequestDto {}

			export class ResponseDto implements IUserBaseData {
				name: string;
				email: string;
				id: string;
			}
		}
	}
}

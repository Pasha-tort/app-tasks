import {ApiUserContracts} from "@app-tasks/http/src/lib/contracts";

export const baseMessageError =
	"Произошла непредвиденная ошибка, обратитесь к администрации";
export const KEY_TOKEN_ACCESS = "tokenAccess";
export const KEY_TOKEN_ACCESS_EXP = "tokenAccessExp";
export const pathsDontTokenVerification: string[] = [
	ApiUserContracts.Auth.register.path,
	ApiUserContracts.Auth.login.path,
	ApiUserContracts.Auth.tokenRefresh.path,
];

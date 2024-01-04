import {ApiUserContracts} from "@app-tasks/http";

export const baseMessageError =
	"Произошла непредвиденная ошибка, обратитесь к администрации";
export const KEY_TOKEN_ACCESS = "tokenAccess";
export const KEY_TOKEN_ACCESS_EXP = "tokenAccessExp";
export const pathsDontTokenVerification = [
	ApiUserContracts.Auth.register.path,
	ApiUserContracts.Auth.login.path,
	ApiUserContracts.Auth.tokenRefresh,
];

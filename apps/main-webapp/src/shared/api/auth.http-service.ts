import {BaseHttpService} from "./base.http-service";
import {ApiUserContracts} from "@app-tasks/http/src/lib/contracts/user.contracts";
import {METHODS} from "./types";

export class AuthHttpService extends BaseHttpService {
	basePath = "/user";

	register(body: ApiUserContracts.Auth.register.RequestDto) {
		return this.sendRequest<ApiUserContracts.Auth.register.ResponseDto>({
			path: ApiUserContracts.Auth.register.path,
			body,
			method: METHODS.POST,
		});
	}

	login(body: ApiUserContracts.Auth.login.RequestDto) {
		return this.sendRequest<ApiUserContracts.Auth.login.ResponseDto>({
			path: ApiUserContracts.Auth.login.path,
			body,
			method: METHODS.POST,
		});
	}

	logout() {
		return this.sendRequest({
			path: ApiUserContracts.Auth.logout.path,
			method: METHODS.POST,
		});
	}

	tokenRefresh() {
		return this.sendRequest<ApiUserContracts.Auth.tokenRefresh.ResponseDto>({
			path: ApiUserContracts.Auth.tokenRefresh.path,
			method: METHODS.POST,
		});
	}

	checkToken() {
		return this.sendRequest<ApiUserContracts.Auth.checkToken.ResponseDto>({
			path: ApiUserContracts.Auth.checkToken.path,
			method: METHODS.GET,
		});
	}

	editName(body: ApiUserContracts.Auth.editName.RequestDto) {
		return this.sendRequest<ApiUserContracts.Auth.editName.ResponseDto>({
			body,
			path: ApiUserContracts.Auth.editName.path,
			method: METHODS.POST,
		});
	}
}

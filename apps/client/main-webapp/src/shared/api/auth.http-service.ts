import {BaseHttpService} from "./base.http-service";
import {ApiUserContracts} from "@app-tasks/http";
import {METHODS} from "./types";

export class AuthHttpService extends BaseHttpService {
	basePath = "/user";

	register(body: ApiUserContracts.Auth.register.RequestDto) {
		return this.sendRequest<ApiUserContracts.Auth.register.ResponseDto>({
			path: "/register",
			body,
			method: METHODS.POST,
		});
	}

	login(body: ApiUserContracts.Auth.login.RequestDto) {
		return this.sendRequest<ApiUserContracts.Auth.login.ResponseDto>({
			path: "/login",
			body,
			method: METHODS.POST,
		});
	}

	logout() {
		return this.sendRequest({
			path: "/logout",
			method: METHODS.POST,
		});
	}

	tokenRefresh() {
		return this.sendRequest<ApiUserContracts.Auth.tokenRefresh.ResponseDto>({
			path: "token-refresh",
			method: METHODS.POST,
		});
	}

	checkToken() {
		return this.sendRequest({
			path: "/check-token",
			method: METHODS.GET,
		});
	}
}

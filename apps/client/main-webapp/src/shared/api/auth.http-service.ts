import {BaseHttpService} from "./base.http-service";
import {ApiUserContracts} from "@app-tasks/http";
import {METHODS} from "./types";

export class AuthHttpService extends BaseHttpService {
	basePath = "/auth";

	async register(body: ApiUserContracts.Auth.register.RequestDto) {
		return this.sendRequest<ApiUserContracts.Auth.register.ResponseDto>({
			path: "/register",
			body,
			method: METHODS.POST,
		});
	}

	async login(body: ApiUserContracts.Auth.login.RequestDto) {
		return this.sendRequest<ApiUserContracts.Auth.login.ResponseDto>({
			path: "/login",
			body,
			method: METHODS.POST,
		});
	}

	async logout(body: ApiUserContracts.Auth.logout.RequestDto) {
		return this.sendRequest({
			path: "/logout",
			body,
			method: METHODS.POST,
		});
	}

	async tokenRefresh() {
		return this.sendRequest({
			path: "/token-refresh",
			method: METHODS.POST,
		});
	}
}

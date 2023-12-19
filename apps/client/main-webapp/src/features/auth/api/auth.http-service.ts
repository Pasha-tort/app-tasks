import {BaseHttpService} from "src/shared/api";
import {ApiAccountContracts} from "@app-tasks/api";

export class AuthHttpService extends BaseHttpService {
	basePath = "/auth";

	async register(body: ApiAccountContracts.Auth.register.RequestDto) {
		return this.getRequest<ApiAccountContracts.Auth.register.ResponseDto>({
			path: "/register",
			body,
		});
	}

	async login(body: ApiAccountContracts.Auth.login.RequestDto) {
		return this.getRequest<ApiAccountContracts.Auth.login.ResponseDto>({
			path: "/login",
			body,
		});
	}

	async logout() {
		return this.getRequest({
			path: "/logout",
		});
	}

	async tokenRefresh() {
		return this.getRequest({
			path: "/token-refresh",
		});
	}
}

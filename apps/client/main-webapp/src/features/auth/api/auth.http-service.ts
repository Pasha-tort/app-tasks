import {BaseHttpService} from "src/shared/api";
import {ApiAccountContracts} from "@app-tasks/api";

export class AuthHttpService extends BaseHttpService {
	basePath = "/auth";

	async register(body: ApiAccountContracts.Auth.register.RequestDto) {
		return this.getRequest(
			{
				path: "/register",
				body,
			},
			ApiAccountContracts.Auth.register.ResponseDto,
		);
	}

	async login(body: ApiAccountContracts.Auth.login.RequestDto) {
		return this.getRequest(
			{
				path: "/login",
				body,
			},
			ApiAccountContracts.Auth.login.ResponseDto,
		);
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
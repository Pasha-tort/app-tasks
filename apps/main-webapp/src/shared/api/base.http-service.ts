import {getCookie} from "../utils";
import {
	KEY_TOKEN_ACCESS,
	KEY_TOKEN_ACCESS_EXP,
	baseMessageError,
	pathsDontTokenVerification,
} from "./constants";
import {RenderException} from "./exceptions";
import {METHODS} from "./types";

export class BaseHttpService {
	protected basePath: string;
	async sendRequest<ResDto = object>({
		path,
		body,
		method = METHODS.GET,
	}: {
		path: string;
		body?: object;
		method?: METHODS;
	}) {
		const cookieTokenAccessExp = getCookie(KEY_TOKEN_ACCESS_EXP);
		const cookieTokenAccess = getCookie(KEY_TOKEN_ACCESS);

		// если нет cookie хранящая время истечения accessToken или нету cookie которая хранит сам token
		// или до конца истечения времени жизни accessToken осталось менее 5 секунд, то обнволяем токены.
		// Такая логика нужна что бы у нас точно был запас во времени между проверкой сущуствования accessToken и вызова
		if (
			!pathsDontTokenVerification.includes(path) &&
			(!cookieTokenAccessExp ||
				!cookieTokenAccess ||
				Number(cookieTokenAccessExp) - Date.now() < 5000)
		) {
			const response = await this.refreshToken();
			if (response.status >= 400) await this.errorHandler(response);
		}

		const headers: HeadersInit = {
			"Content-Type": "application/json",
			Authorization: this.getHeaderAuthorization(),
		};
		const data = JSON.stringify(body);
		const url = `http://localhost:3001/api${this.basePath}${path}`;
		const requestInit: RequestInit = {
			method,
			body: data,
			headers,
			credentials: "include",
		};
		return await this.request<ResDto>(url, requestInit);
	}

	private async request<ResDto = object>(
		url: string,
		requestInit?: RequestInit,
	) {
		const response = await fetch(url, requestInit);
		if (response.status >= 400) {
			await this.errorHandler(response);
		}
		return response.json() as Promise<ResDto>;
	}

	private getHeaderAuthorization() {
		const cookie = getCookie(KEY_TOKEN_ACCESS);
		if (!cookie) return "";
		return `Bearer ${cookie.split("=")[1]}`;
	}

	private async refreshToken() {
		return fetch("http://localhost:3001/api/user/token-refresh", {
			method: "POST",
			credentials: "include",
		});
	}

	private async errorHandler(response: Response) {
		const body = await response.json();
		if (response.status === 401)
			throw new RenderException(body?.message || baseMessageError);
		if (response.status === 400)
			throw new RenderException(body?.message || baseMessageError);
		throw new RenderException(baseMessageError);
	}
}

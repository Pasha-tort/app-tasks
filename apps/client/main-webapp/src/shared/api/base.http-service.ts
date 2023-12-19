import {METHODS} from "./types";
import axios, {AxiosHeaders} from "axios";

export class BaseHttpService {
	protected basePath: string;
	async getRequest<ResDto = object>({
		path,
		body,
		method = METHODS.GET,
		params,
	}: {
		path: string;
		body?: object | BodyInit;
		method?: METHODS;
		params?: string;
	}) {
		const headersGen = new AxiosHeaders();
		headersGen.set("test-cookie", "test");
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return axios.request<any, ResDto>({
			method,
			url: `http://localhost:3001${this.basePath}/${path}`,
			data: body,
			headers: headersGen,
			params,
		});
	}
}

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
		const headers = {
			"Content-Type": "application/json",
		};
		// headersGen.set("test-cookie", "test");
		const data = JSON.stringify(body);
		const response = await fetch(
			`http://localhost:3001/api${this.basePath}${path}`,
			{
				method,
				body: data,
				headers,
			},
		);
		return response.json() as Promise<ResDto>;
	}
}

import useFetch, {Interceptors, Res} from "use-http";
import {METHODS} from "./types";
import {Type} from "@nestjs/common/interfaces/type.interface";
import {plainToInstance} from "class-transformer";

type Flatten<T> = T extends (infer Item)[] ? Item : T;

export class BaseHttpService {
	protected basePath: string;
	getRequest<ResDto = object>(
		{
			path,
			body,
			method = METHODS.GET,
			headers,
		}: {
			path: string;
			body?: object | BodyInit;
			method?: METHODS;
			headers?: HeadersInit;
		},
		dtoRes?: Type<Flatten<ResDto>>,
	) {
		const interceptors: Interceptors<ResDto> = {
			response: dtoRes
				? async ({response}) => {
						return plainToInstance(dtoRes, response) as Res<ResDto>;
				  }
				: undefined,
		};
		const headersGen = {
			...headers,
			"Set-Cookie": "test-cookie",
		};
		return () =>
			//TODO да тут бы доставать host и port из .env, но так как у меня нету прода и так сойдет
			useFetch(`http//:localhost:3001${this.basePath}${path}`, {
				method,
				headers: headersGen,
				body,
				interceptors,
			});
	}
}

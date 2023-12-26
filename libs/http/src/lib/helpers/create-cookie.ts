import {Response} from "express";

type DataCookie = {
	key: string;
	hash: string;
	path?: string;
	httpOnly?: boolean;
	options?:
		| {
				expire?: number | Date;
				ttl?: undefined;
		  }
		| {ttl?: number; expire?: undefined};
};

/**
 * Функция мутирует значение res
 * @param ttl значение задается в ms
 * @param expire значение задается в ms
 */
export function createCookies(res: Response, dataCookies: DataCookie[]) {
	dataCookies.forEach(cookie => {
		const {key, hash, path, options, httpOnly = true} = cookie;
		res.cookie(key, hash, {
			expires: options?.expire
				? new Date(options.expire)
				: options?.ttl
				? new Date(new Date().getTime() + options.ttl)
				: undefined,
			sameSite: "strict", //строгое ограничение по домену
			httpOnly, //js не может с этим работать
			path,
		});
	});
}

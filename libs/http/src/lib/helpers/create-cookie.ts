import {Response} from "express";

/**
 * Функция мутирует значение res
 * @param ttl значение задается в ms
 * @param expire значение задается в ms
 */
export function createCookie(
	res: Response,
	key: string,
	hash: string,
	options?:
		| {
				expire?: number;
				ttl?: undefined;
		  }
		| {ttl?: number; expire?: undefined},
) {
	res.cookie(key, hash, {
		expires: options?.expire
			? new Date(options.expire)
			: options?.ttl
			? new Date(new Date().getTime() + options.ttl)
			: undefined,
		sameSite: "strict", //строгое ограничение по домену
		httpOnly: true, //js не может с этим работать
		path: "/api/user/refresh-token",
	});
}

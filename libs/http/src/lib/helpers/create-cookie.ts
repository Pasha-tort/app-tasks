import {Response} from "express";

/**
 * Функция мутирует значение res
 * @param ttl значение задается в ms
 * @param expire значение задается в ms
 */
export function createCookie({
	res,
	key,
	hash,
	path,
	options,
	httpOnly = true,
}: {
	res: Response;
	key: string;
	hash: string;
	path?: string;
	httpOnly?: boolean;
	options?:
		| {
				expire?: number;
				ttl?: undefined;
		  }
		| {ttl?: number; expire?: undefined};
}) {
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
}

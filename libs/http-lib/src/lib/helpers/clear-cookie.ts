import {Response} from "express";

/**
 * Функция мутирует значение res
 */
export function clearCookie(res: Response, key: string) {
	res.clearCookie(key);
}

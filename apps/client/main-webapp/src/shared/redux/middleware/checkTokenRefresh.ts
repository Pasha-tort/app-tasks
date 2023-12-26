// import {MiddlewareAPI} from "@reduxjs/toolkit";
// import {getCookie} from "src/shared/helpers";
// import {tokenRefreshAction} from "../user";
// import {AppDispatch} from "../store";

// //TODO не разобрался в варианте как выкрутить middleware круче - с типами
// export const checkTokenRefreshMiddleware =
// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	(middlewareApi: MiddlewareAPI) => (next: any) => {
// 		if (
// 			getCookie("accessToken") ||
// 			action.type === tokenRefreshAction.pending.type ||
// 			action?.meta?.requestStatus !== "pending"
// 		)
// 			return next(action);

// 		const dispatch = middlewareApi.dispatch as AppDispatch;

// 		// если пройзойдет ошибка, то action изменит стейт, компонент прочитает стейт и сделает редирект на страницу auth
// 		// а здесь мы прочитаем неудачное окончание запроса для tokenRefresh и отменим дальнейшее выполнение функции
// 		dispatch(tokenRefreshAction()).then(({type}) => {
// 			console.log("дождался обработки refreshToken в middleware", type);
// 			if (type === "tokenRefresh/rejected") return;
// 			return next(action);
// 		});
// 		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 		return (action: any) => {

// 	}};

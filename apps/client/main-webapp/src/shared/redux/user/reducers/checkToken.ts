import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {clientHttp} from "src/shared/api";
import {StateCurrentUser} from "../state";
import {getCookie} from "src/shared/helpers";
import {tokenRefreshAction} from "./refreshToken";

export const checkTokenAction = createAsyncThunk("checkToken", async () => {
	const cookie = getCookie("tokenAccess");
	if (!cookie) {
		tokenRefreshAction();
	} else {
		await clientHttp.user.checkToken().catch(() => {
			tokenRefreshAction();
		});
		// accessToken есть но нужно проверить его валидность
		// если он не валидный, то мы запускаем refresh логику(она будет в отдельной функции в этом компаоненте)
		// если он валидный то пропускаем пользователя дальше
	}
});
/**
 * в этом редюсере не нужна логика с обработкой ошибки, так как если action закончится с ошибкой,
 * то запустится refreshTokenAction и если ошибка произойдет уже в нем, то обработает кейс с reject
 */
export const checkTokenReducer = (
	builder: ActionReducerMapBuilder<StateCurrentUser>,
) => {
	builder.addCase(checkTokenAction.pending, state => {
		state.status = "loading";
	});
	builder.addCase(checkTokenAction.fulfilled, state => {
		state.status = "succeeded";
	});
};

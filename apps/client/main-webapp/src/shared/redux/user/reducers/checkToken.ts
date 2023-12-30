import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {clientHttp, RenderException} from "src/shared/api";
import {StateCurrentUser, initialState} from "../state";

export const checkTokenAction = createAsyncThunk(
	"checkToken",
	async (_, {rejectWithValue}) => {
		try {
			return await clientHttp.auth.checkToken();
		} catch (e) {
			if (e instanceof RenderException) return rejectWithValue(e.message);
			throw e;
		}
	},
);
/**
 * в этом редюсере не нужна логика с обработкой ошибки, так как если action закончится с ошибкой,
 * то запустится refreshTokenAction и если ошибка произойдет уже в нем, то обработает кейс с reject
 */
export const checkTokenReducer = (
	builder: ActionReducerMapBuilder<StateCurrentUser>,
) => {
	builder.addCase(checkTokenAction.pending, state => {
		state.status = "loading";
		state.error = null;
	});
	builder.addCase(checkTokenAction.fulfilled, state => {
		state.status = "succeeded";
	});
	builder.addCase(checkTokenAction.rejected, (state, {payload}) => ({
		...initialState,
		status: "failed",
		error: payload as string,
	}));
};

import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {clientHttp, RenderException} from "@main-webapp/shared";
import {StateCurrentUser, initialState} from "../state";

export const logoutAction = createAsyncThunk("logout", async (_, thunkApi) => {
	return clientHttp.auth.logout().catch(e => {
		if (e instanceof RenderException) return thunkApi.rejectWithValue(e);
		throw e;
	});
});
export const logoutReducer = (
	builder: ActionReducerMapBuilder<StateCurrentUser>,
) => {
	builder.addCase(logoutAction.pending, state => {
		state.error = null;
	});
	builder.addCase(logoutAction.fulfilled, state => ({
		...initialState,
		status: "exited",
	}));
	builder.addCase(logoutAction.rejected, (state, {payload}) => ({
		...initialState,
		status: "failed",
		error: payload as string,
	}));
};

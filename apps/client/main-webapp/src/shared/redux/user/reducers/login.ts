import {ApiUserContracts} from "@app-tasks/http";
import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {RenderException, clientHttp} from "src/shared/api";
import {StateCurrentUser} from "../state";

export const loginAction = createAsyncThunk(
	"login",
	async (body: ApiUserContracts.Auth.login.RequestDto, thunkApi) => {
		return clientHttp.auth.login(body).catch(e => {
			if (e instanceof RenderException)
				return thunkApi.rejectWithValue(e.message);
			throw e;
		});
	},
);
export const loginReducer = (
	builder: ActionReducerMapBuilder<StateCurrentUser>,
) => {
	builder.addCase(loginAction.pending, state => {
		state.status = "loading";
		state.error = null;
	});
	builder.addCase(loginAction.fulfilled, (state, {payload}) => {
		return {
			...state,
			status: "succeeded",
			...payload,
		};
	});
	builder.addCase(loginAction.rejected, (state, {payload}) => {
		state.status = "failed";
		state.error = payload as string;
	});
};

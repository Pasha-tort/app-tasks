import {ApiUserContracts} from "@app-tasks/http";
import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {clientHttp} from "src/shared/api";
import {StateCurrentUser} from "../state";

export const loginAction = createAsyncThunk(
	"login",
	async (body: ApiUserContracts.Auth.login.RequestDto) => {
		const data = await clientHttp.user.login(body);
		return data;
	},
);
export const loginReducer = (
	builder: ActionReducerMapBuilder<StateCurrentUser>,
) => {
	builder.addCase(loginAction.pending, state => {
		state.status = "loading";
	});
	builder.addCase(loginAction.fulfilled, (state, {payload}) => {
		return {
			...state,
			status: "succeeded",
			...payload,
		};
	});
	builder.addCase(loginAction.rejected, (state, payload) => {
		state.error = payload.error.message;
	});
};

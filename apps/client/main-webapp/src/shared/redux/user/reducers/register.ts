import {ApiUserContracts} from "@app-tasks/http";
import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {clientHttp} from "src/shared/api";
import {StateCurrentUser} from "../state";

export const registerAction = createAsyncThunk(
	"register",
	async (body: ApiUserContracts.Auth.register.RequestDto) => {
		const data = await clientHttp.user.register(body);
		return data;
	},
);
export const registerReducer = (
	builder: ActionReducerMapBuilder<StateCurrentUser>,
) => {
	builder.addCase(registerAction.pending, state => {
		state.error = null;
		state.status = "loading";
	});
	builder.addCase(registerAction.fulfilled, (state, {payload}) => {
		return {
			...state,
			status: "succeeded",
			...payload,
		};
	});
	builder.addCase(registerAction.rejected, (state, payload) => {
		state.error = payload.error.message;
	});
};

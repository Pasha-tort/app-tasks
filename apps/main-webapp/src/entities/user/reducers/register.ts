import {ApiUserContracts} from "@app-tasks/http/src/lib/contracts";
import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {clientHttp, RenderException} from "@main-webapp/shared";
import {StateCurrentUser} from "../state";

export const registerAction = createAsyncThunk(
	"register",
	async (body: ApiUserContracts.Auth.register.RequestDto, thunkApi) => {
		return clientHttp.auth.register(body).catch(e => {
			if (e instanceof RenderException) {
				return thunkApi.rejectWithValue(e.message);
			}
			throw e;
		});
	},
);
export const registerReducer = (
	builder: ActionReducerMapBuilder<StateCurrentUser>,
) => {
	builder.addCase(registerAction.pending, state => {
		state.status = "loading";
		state.error = null;
	});
	builder.addCase(registerAction.fulfilled, (state, {payload}) => {
		return {
			...state,
			status: "succeeded",
			...payload,
		};
	});
	builder.addCase(registerAction.rejected, (state, {payload}) => {
		state.status = "failed";
		state.error = payload as string;
	});
};

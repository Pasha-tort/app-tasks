import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {clientHttp, RenderException} from "@main-webapp/shared";
import {StateCurrentUser} from "../state";
import {ApiUserContracts} from "@app-tasks/http/src/lib/contracts";

export const editNameAction = createAsyncThunk(
	"edit-name",
	async (payload: ApiUserContracts.Auth.editName.RequestDto, thunkApi) => {
		return clientHttp.auth.editName(payload).catch(e => {
			if (e instanceof RenderException) return thunkApi.rejectWithValue(e);
			throw e;
		});
	},
);
export const editNameReducer = (
	builder: ActionReducerMapBuilder<StateCurrentUser>,
) => {
	builder.addCase(editNameAction.pending, state => {
		state.edited = true;
	});
	builder.addCase(editNameAction.fulfilled, (state, {payload}) => {
		state.edited = false;
		state.name = payload.name;
	});
	builder.addCase(editNameAction.rejected, state => {
		state.edited = false;
	});
};

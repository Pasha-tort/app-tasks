import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {RenderException, clientHttp} from "src/shared/api";
import {StateCurrentUser} from "../state";

export const tokenRefreshAction = createAsyncThunk(
	"tokenRefresh",
	async (_, thunkApi) => {
		return clientHttp.auth.tokenRefresh().catch(e => {
			if (e instanceof RenderException) return thunkApi.rejectWithValue(e);
			throw e;
		});
	},
);
export const tokenRefreshReducer = (
	builder: ActionReducerMapBuilder<StateCurrentUser>,
) => {
	builder.addCase(tokenRefreshAction.pending, state => {
		state.status = "loading";
		state.error = null;
	});
	builder.addCase(tokenRefreshAction.fulfilled, state => {
		state.status = "succeeded";
	});
	builder.addCase(tokenRefreshAction.rejected, (state, {payload}) => {
		state.status = "failed";
		state.error = payload as string;
	});
};

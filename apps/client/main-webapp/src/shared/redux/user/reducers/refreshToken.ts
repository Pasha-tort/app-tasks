import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {clientHttp} from "src/shared/api";
import {StateCurrentUser} from "../state";

export const tokenRefreshAction = createAsyncThunk("tokenRefresh", async () => {
	console.log("код в tokenRefreshAction");
	await clientHttp.user.tokenRefresh();
});
export const tokenRefreshReducer = (
	builder: ActionReducerMapBuilder<StateCurrentUser>,
) => {
	builder.addCase(tokenRefreshAction.pending, state => {
		state.status = "loading";
	});
	builder.addCase(tokenRefreshAction.fulfilled, state => {
		state.status = "succeeded";
	});
	builder.addCase(tokenRefreshAction.rejected, (state, payload) => {
		state.status = "failed";
		state.error = payload.error.message;
	});
};

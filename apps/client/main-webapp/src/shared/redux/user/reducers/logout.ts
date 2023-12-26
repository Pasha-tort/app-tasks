import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {clientHttp} from "src/shared/api";
import {StateCurrentUser, initialState} from "../state";
import {BaseException} from "src/shared/api/exceptions";

export const logoutAction = createAsyncThunk("logout", async (_, thunkApi) => {
	console.log("пришел в logout");
	const data = await clientHttp.user.logout().catch((e: BaseException) => {
		console.log(e.messageError);
		return thunkApi.rejectWithValue(e.messageError);
	});
	console.log({data});
	return data;
});
/**
 * здесь не нужно отслеживания состояния загрузки, оно будет локальное в компоненте
 */
export const logoutReducer = (
	builder: ActionReducerMapBuilder<StateCurrentUser>,
) => {
	builder.addCase(logoutAction.fulfilled, state => {
		state = initialState;
	});
	builder.addCase(logoutAction.rejected, state => {
		state = initialState;
	});
};

import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {IUserBaseData} from "@app-tasks/account/src/slice";
import {RootState} from "../store";

const initialState: IUserBaseData = {
	id: "",
	name: "",
	email: "",
};

const currentUserSlice = createSlice({
	name: "currentUser",
	initialState,
	reducers: {
		register(state, action: PayloadAction<IUserBaseData>) {
			state = action.payload;
		},
		login(state, action: PayloadAction<IUserBaseData>) {
			state = action.payload;
		},
		logout(state) {
			state = initialState;
		},
	},
});

export const selectCurrentUser = (state: RootState) => state.currentUser;
export const {
	register: registerAction,
	login: loginAction,
	logout: logoutAction,
} = currentUserSlice.actions;
export default currentUserSlice.reducer;

import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {IUserBaseData} from "@app-tasks/account/src/slice";

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
	selectors: {
		selectCurrentUser(state: IUserBaseData) {
			return state;
		},
	},
});

export const {selectCurrentUser} = currentUserSlice.selectors;
export const {
	register: registerAction,
	login: loginAction,
	logout: logoutAction,
} = currentUserSlice.actions;
export default currentUserSlice.reducer;

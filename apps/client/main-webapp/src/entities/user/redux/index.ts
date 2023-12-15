import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "#";

const initialState: IUser = {
	accessToken: "",
	id: "",
	name: "",
	email: "",
};

const UserSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		registrationCompleted(state, action) {},
		loginCompleted(state, action) {},
		logoutCompleted(state, action) {},
		tokenRefresh(state, action) {},
	},
});

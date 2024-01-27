import {createSlice} from "@reduxjs/toolkit";
import {initialState} from "./state";
import {
	checkTokenReducer,
	loginReducer,
	logoutReducer,
	registerReducer,
	tokenRefreshReducer,
	editNameReducer,
} from "./reducers";

const currentUserSlice = createSlice({
	name: "currentUser",
	initialState,
	reducers: {},
	extraReducers: builder => {
		registerReducer(builder);
		loginReducer(builder);
		logoutReducer(builder);
		tokenRefreshReducer(builder);
		checkTokenReducer(builder);
		editNameReducer(builder);
	},
	selectors: {
		selectCurrentUserStatus(state) {
			return state.status;
		},
		selectCurrentUserEdited(state) {
			return state.edited;
		},
		selectCurrentUserName(state) {
			return state.name;
		},
	},
});

export const {
	selectCurrentUserStatus,
	selectCurrentUserEdited,
	selectCurrentUserName,
} = currentUserSlice.selectors;
export default currentUserSlice.reducer;

import {createSlice} from "@reduxjs/toolkit";
import {IUserBaseData} from "@app-tasks/account/src/slice";
import {initialState} from "./state";
import {
	checkTokenReducer,
	loginReducer,
	logoutReducer,
	registerReducer,
	tokenRefreshReducer,
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
	},
	selectors: {
		selectCurrentUser(state: IUserBaseData) {
			return state;
		},
	},
});

export const {selectCurrentUser} = currentUserSlice.selectors;
export default currentUserSlice.reducer;

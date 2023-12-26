import {configureStore} from "@reduxjs/toolkit";
import {currentUserReducer} from "./user";
// import {checkTokenRefreshMiddleware} from "./middleware/checkTokenRefresh";

export const store = configureStore({
	reducer: {
		currentUser: currentUserReducer,
	},
	// middleware: getDefaultMiddleware =>
	// 	getDefaultMiddleware().concat(checkTokenRefreshMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

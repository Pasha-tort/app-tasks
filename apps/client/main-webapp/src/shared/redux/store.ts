import {configureStore} from "@reduxjs/toolkit";
import {reducerCurrentUser} from "./auth";

export const store = configureStore({
	reducer: {
		currentUser: reducerCurrentUser,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

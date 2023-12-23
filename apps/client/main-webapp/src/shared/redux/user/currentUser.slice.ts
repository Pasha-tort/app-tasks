import {
	createSlice,
	createAsyncThunk,
	ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import {IUserBaseData} from "@app-tasks/account/src/slice";
import {clientHttp} from "src/shared/api";
import {ApiUserContracts} from "@app-tasks/http";

export const registerAction = createAsyncThunk(
	"register",
	async (body: ApiUserContracts.Auth.register.RequestDto) => {
		const data = await clientHttp.user.register(body);
		return data;
	},
);
const registerReducer = (
	builder: ActionReducerMapBuilder<StateCurrentUser>,
) => {
	builder.addCase(registerAction.pending, state => {
		state.error = null;
		state.status = "loading";
	});
	builder.addCase(registerAction.fulfilled, (state, payload) => {
		return {
			...state,
			status: "succeeded",
			...payload,
		};
	});
	builder.addCase(registerAction.rejected, (state, payload) => {
		state.error = payload.error.message;
	});
};

export const loginAction = createAsyncThunk(
	"login",
	async (body: ApiUserContracts.Auth.login.RequestDto) => {
		const data = await clientHttp.user.login(body);
		return data;
	},
);
const loginReducer = (builder: ActionReducerMapBuilder<StateCurrentUser>) => {
	builder.addCase(loginAction.pending, state => {
		state.status = "loading";
	});
	builder.addCase(loginAction.fulfilled, (state, payload) => {
		return {
			...state,
			status: "succeeded",
			...payload,
		};
	});
};

export const logoutAction = createAsyncThunk(
	"logout",
	async (body: ApiUserContracts.Auth.logout.RequestDto) => {
		const data = await clientHttp.user.logout(body);
		return data;
	},
);
const logoutReducer = (builder: ActionReducerMapBuilder<StateCurrentUser>) => {
	builder.addCase(logoutAction.pending, state => {
		state.status = "succeeded";
	});
	builder.addCase(logoutAction.fulfilled, state => {
		return initialState;
	});
};

type StateCurrentUser = IUserBaseData & {
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string | null;
	tokenAccess?: string;
};
const initialState: StateCurrentUser = {
	id: "",
	name: "",
	email: "",
	status: "idle",
	tokenAccess: "",
};

const currentUserSlice = createSlice({
	name: "currentUser",
	initialState,
	reducers: {},
	extraReducers: builder => {
		registerReducer(builder);
		loginReducer(builder);
		logoutReducer(builder);
	},
	selectors: {
		selectCurrentUser(state: IUserBaseData) {
			return state;
		},
	},
});

export const {selectCurrentUser} = currentUserSlice.selectors;
export default currentUserSlice.reducer;

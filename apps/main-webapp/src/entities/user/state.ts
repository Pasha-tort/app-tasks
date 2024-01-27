import {IUserBaseData} from "@app-tasks/account.slice/src/user.interface";
export type StateCurrentUser = IUserBaseData & {
	status: "idle" | "loading" | "succeeded" | "failed" | "exited";
	edited: boolean;
	error: string | null;
};
export const initialState: StateCurrentUser = {
	id: "",
	name: "",
	email: "",
	status: "idle",
	edited: false,
	error: null,
};

import {IUserBaseData} from "@app-tasks/account";

export type StateCurrentUser = IUserBaseData & {
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	tokenAccess?: string;
};
export const initialState: StateCurrentUser = {
	id: "",
	name: "",
	email: "",
	status: "idle",
	error: null,
	tokenAccess: "",
};

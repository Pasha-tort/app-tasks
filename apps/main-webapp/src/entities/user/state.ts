import {IUserBaseData, AccountContracts} from "@app-tasks/account.slice";
console.log(AccountContracts.Auth.login.topic);
export type StateCurrentUser = IUserBaseData & {
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
};
export const initialState: StateCurrentUser = {
	id: "",
	name: "",
	email: "",
	status: "idle",
	error: null,
};

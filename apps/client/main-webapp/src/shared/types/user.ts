import {IUserBaseData} from "@app-tasks/account";

export interface IUser extends IUserBaseData {
	accessToken: string;
}

import {Types} from "mongoose";

interface IBaseUser {
	name: string;
	lastName?: string;
	email: string;
	passwordHash: string;
	tokenRefreshHash?: string;
}

export interface IUserDocument extends IBaseUser {
	_id?: Types.ObjectId;
}

export interface IUser extends IBaseUser {
	id?: string;
}

export interface IJWT {
	iss: string; // id пользователя
	sub: IUser;
}

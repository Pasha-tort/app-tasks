import {Types} from "mongoose";

interface IBaseUser {
	name: string;
	lastName?: string;
	email: string;
	passwordHash: string;
	token?: string;
}

export interface IUserDocument extends IBaseUser {
	_id?: Types.ObjectId;
}

export interface IUser extends IBaseUser {
	id?: string;
}

export interface IUserJWT {
	email: string;
	userId: string;
}

import {Types} from "mongoose";

interface IBaseUser {
	name: string;
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

export interface IUserBaseData {
	id: string;
	name: string;
	email: string;
}

export interface IJwtPayload {
	iss: string; // id пользователя
	sub: IUserBaseData;
	iat: number;
	exp: number;
}

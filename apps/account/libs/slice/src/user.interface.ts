interface IBaseUser {
	name: string;
	email: string;
	passwordHash: string;
	tokenRefreshHash?: string;
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

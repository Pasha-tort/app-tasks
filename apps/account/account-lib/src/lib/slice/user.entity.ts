import {genSalt, hash, compare} from "bcryptjs";
import {IUser, IUserDocument} from "./user.interface";

export class UserEntity implements IUser {
	id?: string;
	name: string;
	lastName?: string;
	email: string;
	passwordHash: string;
	tokenRefreshHash?: string;

	constructor(data: IUserDocument);
	constructor(data: IUser);
	constructor({
		name,
		lastName,
		email,
		passwordHash,
		tokenRefreshHash,
		_id,
		id,
	}: IUser & IUserDocument) {
		this.id = _id?.toString() || id;
		this.name = name;
		this.lastName = lastName;
		this.email = email;
		this.passwordHash = passwordHash;
		this.tokenRefreshHash = tokenRefreshHash;
	}

	async setPassword(password: string, salt: number) {
		const newSalt = await genSalt(salt);
		this.passwordHash = await hash(password, newSalt);
		return this;
	}

	async setRefreshToken(token: string, salt: number) {
		const newSalt = await genSalt(salt);
		this.tokenRefreshHash = await hash(token, newSalt);
		return this;
	}

	async validationPassword(password: string) {
		return compare(password, this.passwordHash);
	}
}

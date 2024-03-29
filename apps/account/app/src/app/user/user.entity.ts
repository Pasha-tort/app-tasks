import {genSalt, hash, compare} from "bcryptjs";
import {IUser} from "@app-tasks/account.slice";
import {User} from "./schemas/user.schema";

export class UserEntity implements IUser {
	id?: string;
	name: string;
	email: string;
	passwordHash: string;
	tokenRefreshHash?: string;

	constructor(data: User);
	constructor(data: IUser);
	constructor({
		name,
		email,
		passwordHash,
		tokenRefreshHash,
		_id,
		id,
	}: IUser & User) {
		this.id = _id?.toString() || id;
		this.name = name;
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

	async validateRefreshToken(token: string) {
		if (this.tokenRefreshHash) return compare(token, this.tokenRefreshHash);
		else return false;
	}
}

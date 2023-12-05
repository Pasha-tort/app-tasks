import {IUser} from "./user.interface";
import {genSalt, hash, compare} from "bcryptjs";

export class UserEntity implements IUser {
	id?: string;
	name: string;
	email: string;
	passwordHash: string;

	constructor({_id, name, email, passwordHash}: IUser) {
		this.id = _id?.toString();
		this.name = name;
		this.email = email;
		this.passwordHash = passwordHash;
	}

	async setPassword(password: string, salt: number) {
		const newSalt = await genSalt(salt);
		const hashV = await hash(password, newSalt);
		this.passwordHash = hashV;
		return this;
	}

	async validationPassword(password: string) {
		return compare(password, this.passwordHash);
	}
}

import {genSalt, hash, compare} from "bcryptjs";
import {IUser, IUserDocument} from "./user.interface";

export class UserEntity implements IUser {
	id?: string;
	name: string;
	lastName?: string;
	email: string;
	passwordHash: string;
	token?: string;

	constructor(data: IUserDocument);
	constructor(data: IUser);
	constructor({
		name,
		lastName,
		email,
		passwordHash,
		token,
		_id,
		id,
	}: IUser & IUserDocument) {
		this.id = _id?.toString() || id;
		this.name = name;
		this.lastName = lastName;
		this.email = email;
		this.passwordHash = passwordHash;
		this.token = token;
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

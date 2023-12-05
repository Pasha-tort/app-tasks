import {Injectable} from "@nestjs/common";
import {UserEntity} from "./user.entity";
import {WrongLoginOrPassException} from "./user.exception";
import {UserRepositories} from "./user.repositories";

@Injectable()
export class UserService {
	constructor(private readonly userRepositories: UserRepositories) {}

	async validateUser(email: string, password: string) {
		const user = await this.userRepositories.findUserByEmail(email);
		if (!user) throw new WrongLoginOrPassException();
		const userEntity = new UserEntity(user);
		const isCorrectPass = await userEntity.validationPassword(password);
		if (!isCorrectPass) throw new WrongLoginOrPassException();
		return userEntity;
	}
}

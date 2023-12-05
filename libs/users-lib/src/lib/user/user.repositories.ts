import {Injectable} from "@nestjs/common";
import {User, UserModel} from "./schemas/user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {UserEntity} from "./user.entity";
import {UserExistException} from "@account-lib";

@Injectable()
export class UserRepositories {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: UserModel,
	) {}

	async createUser(user: UserEntity) {
		const newUser = new this.userModel(user);
		return newUser.save();
	}

	async updateUser({id, ...user}: UserEntity) {
		return this.userModel.findByIdAndUpdate(id, {$set: {...user}});
	}

	async findUserByEmail(email: string) {
		return this.userModel.findOne({email});
	}

	async findUserById(id: string) {
		return this.userModel.findById(id);
	}

	async deleteUser(email: string) {
		this.userModel.deleteOne({email});
	}

	async exist(login: string, throwError: boolean = false) {
		const user = await this.userModel.exists({login});
		if (throwError && user) throw new UserExistException();
		if (user) return true;
		else return false;
	}
}

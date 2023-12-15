import {Injectable} from "@nestjs/common";
import {User, UserModel} from "./schemas/user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {UserExistException, UserEntity, IUser} from "@app-tasks/account";

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

	async updateUserById(id: string, user: Partial<IUser>) {
		return this.userModel.findByIdAndUpdate(id, {$set: user});
	}

	async findUserByEmail(email: string) {
		return this.userModel.findOne({email});
	}

	/**
	 * метод специально для проверки данных из jwt токена(для авторизации)
	 */
	async findUserByIdAndEmail(userId: string, email: string) {
		return this.userModel.findOne({_id: userId, email});
	}

	async findUserById(id: string) {
		return this.userModel.findById(id);
	}

	async findUser(user: Omit<IUser, "id">) {
		return this.userModel.findOne(user);
	}

	async deleteUser(email: string) {
		this.userModel.deleteOne({email});
	}

	async exist(user: Partial<IUser>, throwError: boolean = false) {
		const userExist = await this.userModel.exists(user);
		if (throwError && userExist) throw new UserExistException();
		if (userExist) return true;
		else return false;
	}
}

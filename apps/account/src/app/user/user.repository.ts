import {Injectable} from "@nestjs/common";
import {User, UserModel} from "./schemas/user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {
	UserExistException,
	UserEntity,
	IUser,
	UserNotFoundException,
} from "@slice";

@Injectable()
export class UserRepository {
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

	async findUserByEmail(email: string, throwError: boolean = false) {
		const searchedUser = await this.userModel.findOne({email});
		return this.processingResult(searchedUser, throwError);
	}

	/**
	 * метод специально для проверки данных из jwt токена(для авторизации)
	 */
	async findUserByIdAndEmail(
		userId: string,
		email: string,
		throwError: boolean = false,
	) {
		const searchedUser = await this.userModel.findOne({_id: userId, email});
		return this.processingResult(searchedUser, throwError);
	}

	async findUserById(id: string, throwError: boolean = false) {
		const searchedUser = await this.userModel.findById(id);
		return this.processingResult(searchedUser, throwError);
	}

	async findUser(user: Omit<IUser, "id">, throwError: boolean = false) {
		const searchedUser = await this.userModel.findOne(user);
		return this.processingResult(searchedUser, throwError);
	}

	async deleteUser(email: string) {
		await this.userModel.deleteOne({email});
	}

	async exist(user: Partial<IUser>, throwError: boolean = false) {
		const userExist = await this.userModel.exists(user);
		if (throwError && userExist) throw new UserExistException();
		if (userExist) return true;
		else return false;
	}

	private processingResult(user: User, throwError: boolean) {
		if (!user && throwError) throw new UserNotFoundException();
		return user;
	}
}

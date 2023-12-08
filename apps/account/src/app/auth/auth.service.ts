import {Injectable} from "@nestjs/common";
import {
	AccountContracts,
	UserEntity,
	UserNotFoundException,
	WrongLoginOrPassException,
} from "@account-lib";
import {ConfigService} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";
import {UserRepositories} from "../user/user.repositories";

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepositories: UserRepositories,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}

	async register(
		dto: AccountContracts.Auth.register.RequestDto,
	): Promise<AccountContracts.Auth.register.ResponseDto> {
		await this.userRepositories.exist({email: dto.email}, true);
		const newUserEntity = await new UserEntity({
			name: dto.name,
			email: dto.email,
			passwordHash: "",
		}).setPassword(
			dto.password,
			Number(this.configService.get("PASSWORD_SALT")),
		);
		const newUser = await this.userRepositories.createUser(newUserEntity);
		return {email: newUser.email};
	}

	async login({
		email,
		password,
	}: AccountContracts.Auth.login.RequestDto): Promise<AccountContracts.Auth.login.ResponseDto> {
		const user = await this.userRepositories.findUserByEmail(email);
		if (!user) throw new WrongLoginOrPassException();
		const userEntity = new UserEntity(user);

		const isCorrectPass = await userEntity.validationPassword(password);
		if (!isCorrectPass) throw new WrongLoginOrPassException();

		userEntity.token = this.jwtService.sign({
			email: user.email,
			userId: user.id,
		});
		await this.userRepositories.updateUserById(userEntity.id, userEntity);
		return userEntity;
	}

	async getAndCheck({
		userId,
		email,
	}: AccountContracts.Auth.getAndCheck.RequestDto) {
		const user = await this.userRepositories.findUserByIdAndEmail(
			userId,
			email,
		);
		if (!user) throw new UserNotFoundException();
		return user;
	}
}

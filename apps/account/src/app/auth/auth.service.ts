import {Injectable} from "@nestjs/common";
import {AccountContracts} from "@account-lib";
import {UserEntity, UserRepositories} from "@users-lib";
import {ConfigService} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";

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
		await this.userRepositories.exist(dto.email);
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

	async login(
		user: UserEntity,
	): Promise<AccountContracts.Auth.login.ResponseDto> {
		return {
			access_token: this.jwtService.sign({
				username: user.email,
				sub: user.id,
			}),
		};
	}

	// async validateUser(email: string, password: string) {
	// 	const user = await this.userRepositories.findUserByEmail(email);
	// 	if (!user) throw new WrongLoginOrPassException();
	// 	const userEntity = new UserEntity(user);
	// 	const isCorrectPass = await userEntity.validationPassword(password);
	// 	if (!isCorrectPass) throw new WrongLoginOrPassException();
	// 	return userEntity;
	// }
}

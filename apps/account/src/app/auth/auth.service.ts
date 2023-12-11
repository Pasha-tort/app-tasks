import {Injectable} from "@nestjs/common";
import {
	AccountContracts,
	IUser,
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
		}).setPassword(dto.password, Number(this.configService.get("SALT")));

		const newUser = await this.userRepositories.createUser(newUserEntity);
		const userEntity = new UserEntity(newUser); // создаем новый UserEntity так записали в базу нового пользователя и у него теперь есть id

		const tokens = await this.getTokens(userEntity);
		const {tokenRefreshHash} = await userEntity.setRefreshToken(
			tokens.tokenRefresh,
			Number(this.configService.get("SALT")),
		);
		await this.userRepositories.updateUserById(newUser.id, {tokenRefreshHash});

		return tokens;
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

		const tokens = await this.getTokens(userEntity);
		const {tokenRefreshHash} = await userEntity.setRefreshToken(
			tokens.tokenRefresh,
			Number(this.configService.get("SALT")),
		);
		await this.userRepositories.updateUserById(userEntity.id, {
			tokenRefreshHash,
		});

		return tokens;
	}

	async getTokens(user: IUser) {
		const [tokenAccess, tokenRefresh] = await Promise.all([
			this.jwtService.signAsync({
				iss: user.id,
				sub: user,
			}), // options'ы задаются в authModule в JwtModule
			this.jwtService.signAsync(
				{
					iss: user.id,
					sub: user,
				},
				{
					secret: this.configService.get("JWT_REFRESH_SECRET"),
					expiresIn: this.configService.get("JWT_REFRESH_TOKEN_EXP"),
				},
			),
		]);
		return {tokenAccess, tokenRefresh};
	}

	async getAndCheckUser({
		userId,
	}: AccountContracts.Auth.getAndCheckUser.RequestDto) {
		const user = await this.userRepositories.findUserById(userId);
		if (!user) throw new UserNotFoundException();
		return user;
	}
}

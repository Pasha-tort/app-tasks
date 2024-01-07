import {Injectable} from "@nestjs/common";
import {
	AccountContracts,
	IUser,
	WrongLoginOrPassException,
	WrongTokenRefreshException,
} from "@app-tasks/account.slice";
import {ConfigService} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";
import {UserRepository} from "@account/app/user/user.repository";
import {UserEntity} from "@account/app/user/user.entity";

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}

	async register({
		name,
		email,
		password,
	}: AccountContracts.Auth.register.RequestDto): Promise<AccountContracts.Auth.register.ResponseDto> {
		await this.userRepository.exist({email}, true);
		const newUserEntity = await new UserEntity({
			name,
			email,
			passwordHash: "",
		}).setPassword(password, Number(this.configService.get("SALT")));

		const newUser = await this.userRepository.createUser(newUserEntity);
		const userEntity = new UserEntity(newUser); // создаем новый UserEntity так записали в базу нового пользователя и у него теперь есть id

		const tokens = await this.getTokens(userEntity);
		const {tokenRefreshHash} = await userEntity.setRefreshToken(
			tokens.tokenRefresh,
			Number(this.configService.get("SALT")),
		);
		await this.userRepository.updateUserById(newUser.id, {tokenRefreshHash});

		return {
			...tokens,
			name: newUser.name,
			email: newUser.email,
			id: newUser.id || newUser._id.toString(),
		};
	}

	async login({
		email,
		password,
	}: AccountContracts.Auth.login.RequestDto): Promise<AccountContracts.Auth.login.ResponseDto> {
		const user = await this.userRepository.findUserByEmail(email, true);
		if (!user) throw new WrongLoginOrPassException();
		const userEntity = new UserEntity(user);

		const isCorrectPass = await userEntity.validationPassword(password);
		if (!isCorrectPass) throw new WrongLoginOrPassException();

		const tokens = await this.getTokens(userEntity);
		const {tokenRefreshHash} = await userEntity.setRefreshToken(
			tokens.tokenRefresh,
			Number(this.configService.get("SALT")),
		);
		await this.userRepository.updateUserById(userEntity.id, {
			tokenRefreshHash,
		});

		return {
			...tokens,
			name: userEntity.name,
			email: userEntity.email,
			id: userEntity.id,
		};
	}

	async logout({userId}: AccountContracts.Auth.logout.RequestDto) {
		return this.userRepository.updateUserById(userId, {
			tokenRefreshHash: null,
		});
	}

	async refreshTokens({
		userId,
		refreshToken,
	}: AccountContracts.Auth.refreshToken.RequestDto): Promise<AccountContracts.Auth.refreshToken.ResponseDto> {
		const user = await this.userRepository.findUserById(userId, true);
		const userEntity = new UserEntity(user);
		if (!user || !user.tokenRefreshHash) throw new WrongTokenRefreshException();

		const isCorrectToken = userEntity.validateRefreshToken(refreshToken);
		if (!isCorrectToken) throw new WrongTokenRefreshException();

		const tokens = await this.getTokens(userEntity);
		const {tokenRefreshHash} = await userEntity.setRefreshToken(
			tokens.tokenRefresh,
			Number(this.configService.get("SALT")),
		);
		await this.userRepository.updateUserById(user.id, {tokenRefreshHash});

		return {
			...tokens,
			name: userEntity.name,
			email: userEntity.email,
			id: userEntity.id,
		};
	}

	async getTokens(user: IUser) {
		const {passwordHash, tokenRefreshHash, ...dataUser} = user; // избавляемся от двух полей которые не нужны в данных которые будут зашиты в токены

		const [tokenAccess, tokenRefresh] = await Promise.all([
			this.jwtService.signAsync({
				iss: dataUser.id,
				sub: dataUser,
			}), // options'ы задаются в authModule в JwtModule
			this.jwtService.signAsync(
				{
					iss: dataUser.id,
					sub: dataUser,
				},
				{
					secret: this.configService.get("JWT_REFRESH_SECRET"),
					expiresIn: this.configService.get("JWT_REFRESH_TOKEN_EXP"),
				},
			),
		]);

		return {
			tokenAccess,
			tokenRefresh,
		};
	}
}

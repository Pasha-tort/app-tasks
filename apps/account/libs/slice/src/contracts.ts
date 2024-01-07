import {IsEmail, IsJWT, IsMongoId, IsString} from "class-validator";
import {Exclude, Expose} from "class-transformer";
import {IUser, IUserBaseData} from "./user.interface";

export namespace AccountContracts {
	export namespace User {
		export class User implements IUser {
			id?: string;
			name: string;
			email: string;
			passwordHash: string;
			tokenRefresh?: string;
		}
	}

	export class Tokens {
		tokenAccess: string;
		tokenRefresh: string;
	}
	export namespace Auth {
		export namespace register {
			export const topic = "account.register.command";

			@Exclude()
			export class RequestDto implements Pick<IUser, "email" | "name"> {
				@Expose()
				@IsEmail(undefined, {message: "Поле email должно быть валидным"})
				email: string;

				@Expose()
				@IsString()
				password: string;

				@Expose()
				@IsString()
				name: string;
			}

			export class ResponseDto extends Tokens implements IUserBaseData {
				name: string;
				email: string;
				id: string;
			}
		}

		export namespace login {
			export const topic = "account.login.command";

			@Exclude()
			export class RequestDto {
				@Expose()
				@IsEmail()
				email: string;

				@Expose()
				@IsString()
				password: string;
			}

			export class ResponseDto extends Tokens implements IUserBaseData {
				name: string;
				email: string;
				id: string;
			}
		}

		export namespace logout {
			export const topic = "account.logout.command";

			@Exclude()
			export class RequestDto {
				@Expose()
				@IsMongoId()
				userId: string;
			}
		}

		export namespace refreshToken {
			export const topic = "account.refreshToken.command";

			@Exclude()
			export class RequestDto {
				@Expose()
				@IsMongoId()
				userId: string;

				@Expose()
				@IsJWT()
				refreshToken: string;
			}

			export class ResponseDto extends Tokens implements IUserBaseData {
				name: string;
				email: string;
				id: string;
			}
		}
	}
}

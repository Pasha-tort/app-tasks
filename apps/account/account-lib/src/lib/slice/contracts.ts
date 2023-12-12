import {Exclude, Expose} from "class-transformer";
import {IsEmail, IsString} from "class-validator";
import {IUser} from "./user.interface";

export namespace AccountContracts {
	export namespace User {
		@Exclude()
		export class User implements IUser {
			@Expose()
			id?: string;

			@Expose()
			name: string;

			@Expose()
			email: string;

			@Expose()
			passwordHash: string;

			@Expose()
			tokenRefresh?: string;
		}
	}

	@Exclude()
	export class Tokens {
		@Expose()
		tokenAccess: string;

		@Expose()
		tokenRefresh: string;
	}
	export namespace Auth {
		export namespace register {
			export const topic = "account.register.command";

			@Exclude()
			export class RequestDto implements Omit<IUser, "passwordHash"> {
				@Expose()
				@IsEmail()
				email: string;

				@Expose()
				@IsString()
				password: string;

				@Expose()
				@IsString()
				name: string;
			}

			@Exclude()
			export class ResponseDto extends Tokens {}
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

			@Exclude()
			export class ResponseDto {
				@Expose()
				tokenAccess: string;

				@Expose()
				tokenRefresh: string;
			}
		}

		export namespace logout {
			export const topic = "account.logout.command";
			@Exclude()
			export class RequestDto {
				@Expose()
				userId: string;
			}
		}

		export namespace refreshToken {
			export const topic = "account.refreshToken.command";
			@Exclude()
			export class RequestDto {
				@Expose()
				userId: string;

				@Expose()
				refreshToken: string;
			}

			@Exclude()
			export class ResponseDto extends Tokens {}
		}
	}
}

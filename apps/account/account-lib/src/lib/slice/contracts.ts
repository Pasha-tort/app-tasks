import {Exclude, Expose} from "class-transformer";
import {IsEmail, IsString, IsOptional, IsMongoId} from "class-validator";
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

				@Expose()
				@IsOptional()
				@IsString()
				lastName?: string;
			}

			@Exclude()
			export class ResponseDto {
				@Expose()
				tokenAccess: string;

				@Expose()
				tokenRefresh: string;
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

			@Exclude()
			export class ResponseDto {
				@Expose()
				tokenAccess: string;

				@Expose()
				tokenRefresh: string;
			}
		}

		export namespace getAndCheckUser {
			export const topic = "account.getAndCheckUser.command";

			@Exclude()
			export class RequestDto {
				@Expose()
				@IsMongoId()
				userId: string;
			}

			@Exclude()
			export class ResponseDto extends User.User {}
		}
	}
}
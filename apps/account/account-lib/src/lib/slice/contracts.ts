import {Exclude, Expose} from "class-transformer";
import {IsEmail, IsString, IsOptional} from "class-validator";

export namespace AccountContracts {
	export namespace Auth {
		export namespace register {
			export const topic = "account.register.command";

			@Exclude()
			export class RequestDto {
				@Expose()
				@IsEmail()
				email: string;

				@Expose()
				@IsString()
				password: string;

				@Expose()
				@IsString()
				name: string; // уникальное значение

				@Expose()
				@IsOptional()
				@IsString()
				lastName?: string;
			}

			@Exclude()
			export class ResponseDto {
				@Expose()
				email: string;
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
				access_token: string;
			}
		}
	}
}

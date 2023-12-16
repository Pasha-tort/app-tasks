import {Exclude, Expose} from "class-transformer";

export namespace ApiTaskContracts {
	export namespace addTask {
		export class RequestDto {
			@Expose()
			task: string;
		}

		@Exclude()
		export class ResponseDto {
			@Expose()
			response: string;
		}
	}
}

import {Allow} from "class-validator";

export namespace ApiTaskContracts {
	export namespace addTask {
		export class RequestDto {
			@Allow()
			task: string;
		}

		export class ResponseDto {
			response: string;
		}
	}
}

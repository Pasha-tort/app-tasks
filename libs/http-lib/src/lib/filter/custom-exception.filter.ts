import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpStatus,
} from "@nestjs/common";
import {Response} from "express";
import {RMQError} from "nestjs-rmq";

@Catch(RMQError)
export class CustomExceptionFilter implements ExceptionFilter {
	catch(exception: RMQError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		switch (exception.code) {
			case 403:
				response.status(HttpStatus.FORBIDDEN).json(exception);
				break;
			default:
				response.status(HttpStatus.BAD_REQUEST).json(exception);
				break;
		}
	}
}

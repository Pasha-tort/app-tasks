import {CallHandler, ExecutionContext, NestInterceptor} from "@nestjs/common";
import {Response} from "express";
import {createCookie} from "../helpers/create-cookie";

export class CorsInterceptors implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler) {
		const res = context.switchToHttp().getResponse<Response>();
		createCookie({res, key: "Access-Control-Allow-Origin", hash: "*"});
		return next.handle();
	}
}

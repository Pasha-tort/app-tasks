import {IJwtPayload} from "@account-lib";
import {HttpStatus, Injectable, Logger, NestMiddleware} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";
import {Request, Response, NextFunction} from "express";
import {NAME_FIELD_REFRESH_TOKEN_TO_REQUEST} from "../constants";
import {createHttpException} from "./create-http-exception";

@Injectable()
export class TokenRefreshExtractorMiddleware implements NestMiddleware {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly logger: Logger,
	) {}
	async use(request: Request, res: Response, next: NextFunction) {
		const token = request?.cookies?.tokenRefresh as string;
		if (!token) {
			res
				.status(HttpStatus.UNAUTHORIZED)
				.send(createHttpException({message: "Unauthorized", statusCode: 401}));
			return;
		}

		try {
			const verifiedToken = await this.jwtService.verifyAsync<IJwtPayload>(
				token,
				{
					secret: this.configService.get("JWT_REFRESH_SECRET"),
				},
			);
			if (Date.now() > verifiedToken.exp * 1000) {
				res
					.status(HttpStatus.UNAUTHORIZED)
					.send(
						createHttpException({message: "Unauthorized", statusCode: 401}),
					);
				return;
			}

			request.user = verifiedToken.sub;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(request as any)[NAME_FIELD_REFRESH_TOKEN_TO_REQUEST] = token;
			next();
		} catch (e) {
			this.logger.error(e);
			res
				.status(HttpStatus.UNAUTHORIZED)
				.send(createHttpException({message: "Unauthorized", statusCode: 401}));
			return;
		}
	}
}

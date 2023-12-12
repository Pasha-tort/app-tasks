import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {NAME_FIELD_REFRESH_TOKEN_TO_REQUEST} from "../constants";

export const RefreshTokenExtractor = createParamDecorator(
	(_, ctx: ExecutionContext) => {
		const user = ctx.switchToHttp().getRequest()?.user;
		const token = user?.[NAME_FIELD_REFRESH_TOKEN_TO_REQUEST];

		// в запросе может присутствовать refreshToken, поэтому надо удалить его из данных пользователя
		if (user && user[NAME_FIELD_REFRESH_TOKEN_TO_REQUEST])
			delete user[NAME_FIELD_REFRESH_TOKEN_TO_REQUEST];

		return token;
	},
);

import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {NAME_FIELD_REFRESH_TOKEN_TO_REQUEST} from "../constants";

export const RefreshTokenExtractor = createParamDecorator(
	(_, ctx: ExecutionContext) =>
		ctx.switchToHttp().getRequest()?.[NAME_FIELD_REFRESH_TOKEN_TO_REQUEST],
);

import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const CookieExtractor = createParamDecorator(
	(cookieName: string, ctx: ExecutionContext) =>
		ctx.switchToHttp().getRequest()?.cookies?.[cookieName],
);

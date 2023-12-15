import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const UserExtractor = createParamDecorator(
	(_, ctx: ExecutionContext) => ctx.switchToHttp().getRequest()?.user,
);

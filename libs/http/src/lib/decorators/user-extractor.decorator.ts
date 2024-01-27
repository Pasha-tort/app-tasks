import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const UserExtractor = createParamDecorator(
	(_, ctx: ExecutionContext) => {
		return ctx.switchToHttp().getRequest()?.user;
	},
);

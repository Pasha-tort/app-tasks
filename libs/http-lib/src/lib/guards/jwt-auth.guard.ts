import {ExecutionContext, Injectable, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "../decorators/constants";

export function JwtAuthGuard() {
	return UseGuards(AuthGuard("jwt"));
}

@Injectable()
export class JwtAuthGuardProvider extends AuthGuard("jwt") {
	constructor(private readonly reflector: Reflector) {
		super();
	}

	override canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) return true;
		return super.canActivate(context);
	}
}

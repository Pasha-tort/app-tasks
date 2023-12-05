import {
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {JwtService} from "@nestjs/jwt";
import {Request} from "express";

export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const request = ctx.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) throw new UnauthorizedException();
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: this.configService.get("JWT_SECRET"),
			});
			request.user = payload;
		} catch (e) {
			throw new UnauthorizedException();
		}
		return true;
	}

	private extractTokenFromHeader(request: Request) {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		console.log({type});
		return type === "Bearer" ? token : undefined;
	}
}

import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import {Request} from "express";
import {NAME_FIELD_REFRESH_TOKEN_TO_REQUEST} from "../constants";
import {IJwtPayload} from "@account-lib";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
	Strategy,
	"jwt-refresh",
) {
	constructor(private readonly configService: ConfigService) {
		super({
			secretOrKey: configService.get("JWT_REFRESH_SECRET"),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			passReqToCallback: true,
		});
	}

	async validate(request: Request, payload: IJwtPayload) {
		const refreshToken = request
			.get("Authorization")
			?.replace("Bearer", "")
			.trim();
		return {...payload, [NAME_FIELD_REFRESH_TOKEN_TO_REQUEST]: refreshToken};
		// const refreshToken = request.cookies["refreshToken"];
		// const user = await this.authService.refreshToken(payload.sub, refreshToken);
		// request.res.cookie("jwt", user.accessToken, {httpOnly: true});
		// request.res.cookie("refreshToken", user.refreshToken, {httpOnly: true});
		// return user;
	}
}

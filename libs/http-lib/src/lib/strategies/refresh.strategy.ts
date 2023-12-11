import {AccountRmqService} from "@account-lib";
import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	"jwt-refresh",
) {
	constructor(
		private readonly configService: ConfigService,
		private accountRmqService: AccountRmqService,
	) {
		super({
			secretOrKey: configService.get("JWT_REFRESH_SECRET"),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			passReqToCallback: true,
		});
	}

	async validate(request: Request, payload: unknown) {
		console.log({request, payload});
		// const refreshToken = request.cookies["refreshToken"];
		// const user = await this.authService.refreshToken(payload.sub, refreshToken);
		// request.res.cookie("jwt", user.accessToken, {httpOnly: true});
		// request.res.cookie("refreshToken", user.refreshToken, {httpOnly: true});
		// return user;
	}
}

import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {Strategy, ExtractJwt} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {AccountRmqService, IJWT} from "@account-lib";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		private readonly accountRmqService: AccountRmqService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get("JWT_ACCESS_SECRET"),
		});
	}

	async validate({sub}: IJWT) {
		if (sub) return sub;
		return;
	}
}

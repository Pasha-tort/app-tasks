import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {Strategy, ExtractJwt} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {IUser} from "../user/user.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get("JWT_SECRET"),
		});
	}

	async validate(payload: IUser) {
		console.log({payload});
		return {userId: payload._id?.toString(), username: payload.email};
	}
}

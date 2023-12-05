import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {UserService} from "../user/user.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userService: UserService) {
		super({usernameField: "email"});
	}

	async validate(username: string, password: string) {
		return this.userService.validateUser(username, password);
	}
}

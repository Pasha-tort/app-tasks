import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "../strategies/local.strategy";
import {UserService} from "./user.service";
import {getJwtConfig} from "@configs";
import {JwtStrategy} from "../strategies/jwt.strategy";
import {JwtModule} from "@nestjs/jwt";
import {AccountRmqService} from "@account-lib";
import {UserController} from "./user.controller";

@Module({
	imports: [PassportModule, JwtModule.registerAsync(getJwtConfig())],
	controllers: [UserController],
	providers: [LocalStrategy, JwtStrategy, UserService, AccountRmqService],
})
export class UserModule {}

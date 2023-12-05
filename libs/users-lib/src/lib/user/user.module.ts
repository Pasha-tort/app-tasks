import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {UserFeature} from "./schemas/user.schema";
import {UserRepositories} from "./user.repositories";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "../strategies/local.strategy";
import {UserService} from "./user.service";
import {JwtModuleCustom} from "../strategies/jwt.module";

@Module({
	imports: [
		MongooseModule.forFeature([UserFeature]),
		PassportModule,
		JwtModuleCustom,
	],
	exports: [UserRepositories, PassportModule, JwtModuleCustom],
	providers: [UserRepositories, LocalStrategy, UserService],
})
export class UserModule {}

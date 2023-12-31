import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {JwtModule} from "@nestjs/jwt";
import {UserRepositories} from "../user/user.repositories";
import {MongooseModule} from "@nestjs/mongoose";
import {UserFeature} from "../user/schemas/user.schema";
import {getJwtConfig} from "@configs";

@Module({
	imports: [
		MongooseModule.forFeature([UserFeature]),
		JwtModule.registerAsync(getJwtConfig()),
	],
	controllers: [AuthController],
	providers: [AuthService, UserRepositories],
})
export class AuthModule {}

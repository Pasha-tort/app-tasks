import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {JwtModule} from "@nestjs/jwt";
import {UserRepository} from "@src/app/user/user.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {UserFeature} from "../user/schemas/user.schema";
import {getJwtConfig} from "@app-tasks/configs";

@Module({
	imports: [
		MongooseModule.forFeature([UserFeature]),
		JwtModule.registerAsync(getJwtConfig()),
	],
	controllers: [AuthController],
	providers: [AuthService, UserRepository],
})
export class AuthModule {}

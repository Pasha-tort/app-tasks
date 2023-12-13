import {Logger, MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "../strategies/local.strategy";
import {UserService} from "./user.service";
import {getJwtConfig} from "@configs";
import {JwtStrategy} from "../strategies/jwt.strategy";
import {JwtModule} from "@nestjs/jwt";
import {AccountRmqService} from "@account-lib";
import {UserController} from "./user.controller";
import {TokenRefreshExtractorMiddleware} from "../middlewares/token-refresh-extractor.middleware";

@Module({
	imports: [PassportModule, JwtModule.registerAsync(getJwtConfig())],
	controllers: [UserController],
	providers: [
		Logger,
		LocalStrategy,
		JwtStrategy,
		UserService,
		AccountRmqService,
	],
})
export class UserModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(TokenRefreshExtractorMiddleware)
			.forRoutes("user/refresh-token");
	}
}

import {Module} from "@nestjs/common";
import {
	getConfigModule,
	getMongoConfig,
	getRmqConfig,
} from "@app-tasks/configs";
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import path from "path";
import {RMQModule} from "nestjs-rmq";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";

@Module({
	imports: [
		ConfigModule.forRoot(
			getConfigModule({
				pathsEnv: [
					path.join(path.resolve(), "apps", "account", "app", "src", ".env"),
				],
			}),
		),
		MongooseModule.forRootAsync(getMongoConfig()),
		RMQModule.forRootAsync(getRmqConfig()),
		AuthModule,
		UserModule,
	],
})
export class AppModule {}

import {Module} from "@nestjs/common";
import {getMongoConfig, getConfigModule, getRmqConfig} from "@configs";
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import path from "path";
import {RMQModule} from "nestjs-rmq";

@Module({
	imports: [
		ConfigModule.forRoot(
			getConfigModule({
				pathsEnv: [
					path.join(path.resolve(), "apps", "account-service", "src", ".env"),
				],
			}),
		),
		MongooseModule.forRootAsync(getMongoConfig()),
		RMQModule.forRootAsync(getRmqConfig()),
	],
})
export class AppModule {}

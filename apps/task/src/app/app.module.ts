import path from "path";
import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {getConfigModule, getMongoConfig, getRmqConfig} from "@configs";
import {MongooseModule} from "@nestjs/mongoose";
import {RMQModule} from "nestjs-rmq";

@Module({
	imports: [
		ConfigModule.forRoot(
			getConfigModule({
				pathsEnv: [path.join(path.resolve(), "apps", "account", "src", ".env")],
			}),
		),
		MongooseModule.forRootAsync(getMongoConfig()),
		RMQModule.forRootAsync(getRmqConfig()),
	],
})
export class AppModule {}

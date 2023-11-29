import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {RMQModule} from "nestjs-rmq";
import {getRmqConfig, getConfigModule} from "@configs";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import path from "path";

@Module({
	imports: [
		ConfigModule.forRoot(
			getConfigModule({
				pathsEnv: [
					path.join(path.resolve(), "apps", "account-service", "src", ".env"),
				],
			}),
		),
		RMQModule.forRootAsync(getRmqConfig()),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

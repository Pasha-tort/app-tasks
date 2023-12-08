import {Module} from "@nestjs/common";
import {APP_GUARD} from "@nestjs/core";
import {ConfigModule} from "@nestjs/config";
import {RMQModule} from "nestjs-rmq";
import {getRmqConfig, getConfigModule} from "@configs";
import path from "path";
import {TaskModule} from "./task/task.module";
import {JwtAuthGuardProvider, UserModule} from "@http-lib";

@Module({
	imports: [
		ConfigModule.forRoot(
			getConfigModule({
				pathsEnv: [path.join(path.resolve(), "apps", "api", "src", ".env")],
			}),
		),
		RMQModule.forRootAsync(getRmqConfig()),
		UserModule,
		TaskModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuardProvider,
		},
	],
})
export class AppModule {}

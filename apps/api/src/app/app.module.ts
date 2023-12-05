import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {RMQModule} from "nestjs-rmq";
import {getRmqConfig, getConfigModule} from "@configs";
import {AccountModule} from "./account/account.module";
import path from "path";
import {TaskModule} from "./task/task.module";
import {JwtModuleCustom} from "@users-lib";

@Module({
	imports: [
		ConfigModule.forRoot(
			getConfigModule({
				pathsEnv: [path.join(path.resolve(), "apps", "api", "src", ".env")],
			}),
		),
		RMQModule.forRootAsync(getRmqConfig()),
		JwtModuleCustom,
		AccountModule,
		TaskModule,
	],
})
export class AppModule {}

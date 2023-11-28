import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {mongooseConnect, getConfigModule} from "configs";

import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {UserFeature} from "./user/schemas/user.schema";
import path from "path";

@Module({
	imports: [
		getConfigModule({pathsEnv: [path.resolve("@root/.env")]}),
		mongooseConnect(),
		MongooseModule.forFeature([UserFeature]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

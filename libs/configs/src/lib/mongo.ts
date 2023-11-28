// import {Type} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigService, ConfigModule} from "@nestjs/config";

export const mongooseConnect = () =>
	MongooseModule.forRootAsync({
		useFactory: async (configService: ConfigService) => ({
			uri: `mongodb://${configService.get("MONGODB_HOST")}`,
			pass: configService.get("MONGO_PASSWORD"),
			user: configService.get("MONGO_USERNAME"),
			dbName: configService.get("MONGODB_NAME"),
			// authSource: configService.get("MONGO_AUTHDATABASE"),
		}),
		inject: [ConfigService],
		imports: [ConfigModule],
	});

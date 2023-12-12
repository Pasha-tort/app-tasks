import {ConfigService} from "@nestjs/config";
import {MongooseModuleAsyncOptions} from "@nestjs/mongoose";

export const getMongoConfig: () => MongooseModuleAsyncOptions = () => ({
	useFactory: async (configService: ConfigService) => ({
		uri: getMongoStringConnect(configService),
		authSource: configService.get("MONGO_AUTHDATABASE"),
	}),
	inject: [ConfigService],
});

const getMongoStringConnect = (configService: ConfigService) =>
	"mongodb://" +
	configService.get("MONGO_LOGIN") +
	":" +
	configService.get("MONGO_PASSWORD") +
	"@" +
	configService.get("MONGO_HOST") +
	":" +
	configService.get("MONGO_PORT") +
	"/" +
	configService.get("MONGODB_NAME");

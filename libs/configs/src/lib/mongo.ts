import { Type } from "@nestjs/common";
import { MongooseOptionsFactory, MongooseModule } from "@nestjs/mongoose";
import {ConfigService, ConfigModule} from "@nestjs/config";

export const mongooseConnect = (config?: Type<MongooseOptionsFactory>) => {
  if (config) {
    return MongooseModule.forRootAsync({
      useClass: config,
    });
  } else {
    return {
      module: MongooseModule,
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get("MONGODB_HOST")}`,
        pass: configService.get("MONGO_PASSWORD"),
        user: configService.get("MONGO_USERNAME"),
        dbName: configService.get("MONGODB_NAME"),
        // authSource: configService.get("MONGO_AUTHDATABASE"),
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }
  }
};
	
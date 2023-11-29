import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {UserFeature} from "./schemas/user.schema";

@Module({
	imports: [MongooseModule.forFeature([UserFeature])],
})
export class UserModule {}

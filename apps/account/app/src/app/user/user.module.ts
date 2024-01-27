import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {UserFeature} from "./schemas/user.schema";
import {UserController} from "./user.controller";
import {UserRepository} from "./user.repository";

@Module({
	imports: [MongooseModule.forFeature([UserFeature])],
	controllers: [UserController],
	providers: [UserRepository],
})
export class UserModule {}

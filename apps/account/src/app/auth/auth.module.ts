import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthGateway} from "./auth.gateway";
import {UserModule} from "@users-lib";
import {AuthController} from "./auth.controller";

@Module({
	imports: [UserModule],
	controllers: [AuthController, AuthGateway],
	providers: [AuthService],
})
export class AuthModule {}

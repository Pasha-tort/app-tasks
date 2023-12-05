import {Module} from "@nestjs/common";
import {AccountController} from "./account.controller";
import {AccountService} from "./account.service";
import {AccountRmqService} from "@account-lib";

@Module({
	providers: [AccountService, AccountRmqService],
	controllers: [AccountController],
})
export class AccountModule {}

import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

export function LocalAuthGuard() {
	return UseGuards(AuthGuard("local"));
}

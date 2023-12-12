import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

export function RefreshTokenGuard() {
	return UseGuards(AuthGuard("jwt-refresh"));
}

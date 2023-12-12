// import {UseGuards} from "@nestjs/common";
import {Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class RefreshTokenGuard extends AuthGuard("jwt-refresh") {}

// export function RefreshTokenGuard() {
// 	return UseGuards(AuthGuard("jwt-refresh"));
// }

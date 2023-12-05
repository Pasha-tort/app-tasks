import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {getJwtConfig} from "@configs";
import {JwtStrategy} from "../strategies/jwt.strategy";

@Module({
	imports: [JwtModule.registerAsync(getJwtConfig())],
	exports: [JwtModule],
	providers: [JwtStrategy],
})
export class JwtModuleCustom {}

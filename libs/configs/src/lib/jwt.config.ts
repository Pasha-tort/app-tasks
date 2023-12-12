import {JwtModuleAsyncOptions} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

export function getJwtConfig(): JwtModuleAsyncOptions {
	return {
		inject: [ConfigService],
		useFactory: (configService: ConfigService) => {
			return {
				secret: configService.get("JWT_ACCESS_SECRET"),
				signOptions: {expiresIn: configService.get("JWT_ACCESS_TOKEN_EXP")},
			};
		},
	};
}

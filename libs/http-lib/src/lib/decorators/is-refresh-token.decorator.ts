import {SetMetadata} from "@nestjs/common";
import {IS_REFRESH_TOKEN_KEY} from "../constants";

export const RefreshTokenEntrypoint = () =>
	SetMetadata(IS_REFRESH_TOKEN_KEY, true);

import {UserHttpService} from "./auth.http-service";

export const clientHttp = {
	user: new UserHttpService(),
};

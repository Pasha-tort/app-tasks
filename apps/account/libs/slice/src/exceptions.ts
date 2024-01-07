import {RMQError} from "nestjs-rmq/dist/classes/rmq-error.class";
import {ERROR_TYPE} from "nestjs-rmq/dist/constants";

export class UserExistException extends RMQError {
	constructor() {
		super("Пользователь с таким логином уже существует", ERROR_TYPE.TRANSPORT);
	}
}

export class WrongLoginOrPassException extends RMQError {
	constructor() {
		super("Неверный логин или пароль", ERROR_TYPE.TRANSPORT);
	}
}

export class WrongTokenRefreshException extends RMQError {
	constructor() {
		super("Access denied", ERROR_TYPE.TRANSPORT, 403);
	}
}

export class UserNotFoundException extends RMQError {
	constructor() {
		super("Пользователь не найден", ERROR_TYPE.TRANSPORT);
	}
}

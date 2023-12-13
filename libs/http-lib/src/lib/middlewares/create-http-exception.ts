import {HttpException} from "@nestjs/common";

export function createHttpException({
	message,
	statusCode,
}: {
	message: string;
	statusCode: number;
}) {
	return HttpException.createBody({message, statusCode});
}

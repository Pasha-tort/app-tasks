import {
	PipeTransform,
	Injectable,
	ArgumentMetadata,
	// ValidationPipeOptions,
	HttpStatus,
	HttpException,
} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "./exceptions";

@Injectable()
export class ValidationPipe implements PipeTransform {
	async transform(value: object, meatadata: ArgumentMetadata) {
		if (this.isEmpty(value))
			throw new HttpException(
				`Validation failed: no payload provided`,
				HttpStatus.BAD_REQUEST,
			);
		const obj = plainToInstance(meatadata.metatype!, value);
		const errors = await validate(obj, {
			transform: true,
			transformOptions: {
				exposeDefaultValues: true,
			},
		});
		if (errors.length) {
			const messages = errors.map(
				err =>
					`${err.property} - ${Object.values(err.constraints || []).join(
						", ",
					)}`,
			);
			throw new ValidationException(messages);
		}
		return value;
	}

	private isEmpty(value: object) {
		if (Object.keys(value).length < 1) {
			return true;
		}
		return false;
	}
}

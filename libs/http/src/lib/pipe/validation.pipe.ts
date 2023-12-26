import {PipeTransform, Injectable, ArgumentMetadata} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "./exceptions";

@Injectable()
export class ValidationPipe implements PipeTransform {
	async transform(value: object, metadata: ArgumentMetadata) {
		if (!value || metadata.type === "custom" || this.isEmpty(value))
			return value;
		const obj = plainToInstance(metadata.metatype!, value);
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

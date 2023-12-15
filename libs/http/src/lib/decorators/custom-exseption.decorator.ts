import {applyDecorators, SetMetadata, Type} from "@nestjs/common";
import {RMQError} from "nestjs-rmq";

export const CUSTOM_EXCEPTION = Symbol("CustomException");

export const CustomException = <T extends RMQError>(exception: Type<T>[]) =>
	applyDecorators(SetMetadata(CUSTOM_EXCEPTION, exception));

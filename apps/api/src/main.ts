import {Logger, ValidationPipe} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app/app.module";
import {CustomExceptionFilter} from "@http-lib";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = "api";
	app.setGlobalPrefix(globalPrefix);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: {
				exposeDefaultValues: true,
			},
		}),
	);
	app.useGlobalFilters(new CustomExceptionFilter());
	const port = process.env.PORT || 3000;
	await app.listen(port);
	Logger.log(
		`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
	);
}

bootstrap();

import {Logger, ValidationPipe} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";

import {AppModule} from "./app/app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = "account-api";
	app.setGlobalPrefix(globalPrefix);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: {
				exposeDefaultValues: true,
			},
		}),
	);
	const port = process.env.PORT || 3001;
	await app.listen(port);
	Logger.log(
		`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
	);
}

bootstrap();

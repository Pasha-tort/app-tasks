import {Logger, ValidationPipe} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app/app.module";
import {CustomExceptionFilter} from "@app-tasks/http";
import cookieParser from "cookie-parser";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = "api";
	app.setGlobalPrefix(globalPrefix);
	app.use(cookieParser());
	app.enableCors({
		origin: "http://localhoost:4200",
		methods: "GET,POST",
		allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
		credentials: true,
	});
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: {
				exposeDefaultValues: true,
			},
		}),
	);
	// app.useGlobalInterceptors(new CorsInterceptors());
	app.useGlobalFilters(new CustomExceptionFilter());
	const port = process.env.PORT || 3001;
	await app.listen(port);
	Logger.log(
		`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
	);
}

bootstrap();

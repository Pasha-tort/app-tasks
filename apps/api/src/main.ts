import {Logger} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app/app.module";
import {
	CustomExceptionFilter,
	ValidationPipe as ValidationPipeCustom,
} from "@app-tasks/http";
import cookieParser from "cookie-parser";

const {PORT} = process.env;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: "http://localhost:4200",
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	});
	const globalPrefix = "api";
	app.setGlobalPrefix(globalPrefix);
	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipeCustom());
	app.useGlobalFilters(new CustomExceptionFilter());
	const port = PORT || 3001;
	await app.listen(port);
	Logger.log(
		`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
	);
}

bootstrap();

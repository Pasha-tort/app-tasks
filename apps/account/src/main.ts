import {Logger} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app/app.module";
import {Transport} from "@nestjs/microservices";

const {PORT, HOST} = process.env;

async function bootstrap() {
	const port = PORT || 3002;
	const app = await NestFactory.createMicroservice(AppModule, {
		transport: Transport.TCP,
		options: {
			host: HOST,
			port: port,
		},
	});
	app.listen();
	Logger.log(`🚀 Microservice is running on: http://${HOST}:${port}`); // порт указывается в файле project.json
}

bootstrap();

import {ConfigService} from "@nestjs/config";
import {IRMQServiceAsyncOptions} from "nestjs-rmq";

export const getRmqConfig: () => IRMQServiceAsyncOptions = () => ({
	useFactory: async (configService: ConfigService) => ({
		exchangeName: configService.get("AMQP_EXCHANGE") ?? "",
		connections: [
			{
				login: configService.get("AMQP_LOGIN") ?? "",
				password: configService.get("AMQP_PASSWORD") ?? "",
				host: configService.get("AMQP_HOST") ?? "",
			},
		],
		queueName: configService.get("AMQP_QUEUE"),
		serviceName: configService.get("AMQP_SERVICE_NAME"),
		prefetchCount: 32,
	}),
	inject: [ConfigService],
});

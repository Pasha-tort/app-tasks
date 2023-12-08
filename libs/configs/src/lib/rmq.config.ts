import {ConfigService} from "@nestjs/config";
import {IRMQServiceAsyncOptions, IRMQServiceOptions} from "nestjs-rmq";

export const getRmqConfig: (
	cfg?: Partial<IRMQServiceOptions>,
) => IRMQServiceAsyncOptions = (cfg?: Partial<IRMQServiceOptions>) => ({
	useFactory: (configService: ConfigService) => ({
		exchangeName: configService.get("AMQP_EXCHANGE_MAIN") ?? "",
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
		assertExchangeType: "direct",
		...cfg,
	}),
	inject: [ConfigService],
});

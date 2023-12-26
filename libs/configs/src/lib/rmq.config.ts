import {ConfigService} from "@nestjs/config";
import {
	IRMQServiceAsyncOptions,
	IRMQServiceOptions,
	IRmqErrorHeaders,
	RMQError,
	RMQErrorHandler,
} from "nestjs-rmq";

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
		errorHandler: MyErrorHandler,
		...cfg,
	}),
	inject: [ConfigService],
});

class MyErrorHandler extends RMQErrorHandler {
	public static override handle(headers: IRmqErrorHeaders): Error | RMQError {
		return new RMQError(
			headers["-x-error"],
			headers["-x-type"],
			headers["-x-status-code"],
			headers["-x-data"],
			headers["-x-service"],
			headers["-x-host"],
		);
	}
}

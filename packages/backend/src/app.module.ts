import {
	type MiddlewareConsumer,
	Module,
	type NestModule,
	type OnApplicationShutdown,
} from "@nestjs/common";
import { Logger } from "@repo/backend/config/logger/api-logger.js";
import * as modules from "@repo/backend/modules.exported.js";
import { TypegooseModule } from "nestjs-typegoose";
import { RedisModule } from "@nestjs-modules/ioredis";
import { MONGO_CONFIG, MONGO_URI } from "./mongoose.config.js";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
	imports: [
		TypegooseModule.forRoot(`${MONGO_URI}`, MONGO_CONFIG),
		RedisModule.forRoot({
			type: "single",
			url: "redis://localhost:6379",
		}),
		ScheduleModule.forRoot(),
		...Object.values(modules),
	]
})
export class AppModule implements NestModule, OnApplicationShutdown {
	onApplicationShutdown(signal?: string): void {
		if (signal) {
			Logger.info(`Received shutdown signal: ${signal} 👋`);
		}
	}

	configure(_consumer: MiddlewareConsumer): any {
		//
	}
}

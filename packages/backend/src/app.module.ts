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
import { MONGO_CONFIG, MONGO_URI } from "@repo/backend/mongoose.config.js";
import { ScheduleModule } from "@nestjs/schedule";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { UserEntityMO } from "@repo/backend/entities/User/index-mo.js";
import { UserRolesEntityMO } from "@repo/backend/entities/User/roles-mo.js";

@Module({
	imports: [
		MikroOrmModule.forRoot({
			entities: [UserEntityMO, UserRolesEntityMO],
			driver: PostgreSqlDriver,
			dbName: process.env.DATABASE_NAME,
			host: process.env.DATABASE_HOST,
			port: Number.parseInt(process.env.DATABASE_PORT),
			user: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
		}),
		RedisModule.forRoot({
			type: "single",
			url: "redis://localhost:6379",
		}),
		ScheduleModule.forRoot(),
		...Object.values(modules),
	],
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

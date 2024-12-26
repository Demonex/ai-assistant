import {
	type MiddlewareConsumer,
	Module,
	type NestModule,
	type OnApplicationShutdown,
} from "@nestjs/common";
import { Logger } from "@repo/backend/config/logger/api-logger.js";
import * as modules from "@repo/backend/modules.exported.js";
import { RedisModule } from "@nestjs-modules/ioredis";
import { ScheduleModule } from "@nestjs/schedule";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { UserEntity } from "@repo/backend/entities/User/index.js";
import { TenantEntity } from "./entities/Tenant/index.js";
import { TenantRelsEntity } from "./entities/Tenant/rels.js";

@Module({
	imports: [
		MikroOrmModule.forRoot({
			entities: [UserEntity, TenantEntity, TenantRelsEntity],
			driver: PostgreSqlDriver,
			dbName: process.env.DATABASE_NAME,
			host: process.env.DATABASE_HOST,
			port: Number.parseInt(process.env.DATABASE_PORT),
			user: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
		}),
		RedisModule.forRoot({
			type: "single",
			url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
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

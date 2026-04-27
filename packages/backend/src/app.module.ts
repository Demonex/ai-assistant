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
import { TenantEntity } from "@repo/backend/entities/Tenant/index.js";
import { ChatMessageEntity } from "@repo/backend/entities/Chat/index.js";
import { CollectionEntity } from "@repo/backend/entities/Collection/index.js";
import { DocEntity } from "@repo/backend/entities/Doc/index.js";
import { ProviderEntity } from "@repo/backend/entities/Provider/index.js";
import { CollectionProvidersEntity } from "@repo/backend/entities/Collection/collection-providers.js";
import { GroupEntity } from "@repo/backend/entities/Group/index.js";
import { WikiJsDocEntity } from "@repo/backend/entities/Wiki/index.js";
import { GroupUsersEntity } from "@repo/backend/entities/Group/group-users.js";
import { GroupPermissionsEntity } from "@repo/backend/entities/Group/group-group-permissions.js";
import { GroupCollectionPermissionsEntity } from "@repo/backend/entities/Group/group-collection-permissions.js";
import "dotenv/config";
import { NeuroEntity } from "@repo/backend/entities/Neuro/index.js";
import { ModelEntity } from "@repo/backend/entities/Model/index.js";

@Module({
	imports: [
		MikroOrmModule.forRoot({
			entities: [
				UserEntity,
				TenantEntity,
				ChatMessageEntity,
				CollectionEntity,
				DocEntity,
				ProviderEntity,
				CollectionProvidersEntity,
				GroupEntity,
				GroupUsersEntity,
				NeuroEntity,
				ModelEntity,
				GroupPermissionsEntity,
				GroupCollectionPermissionsEntity,
				WikiJsDocEntity,
			],
			driver: PostgreSqlDriver,
			dbName: process.env.DATABASE_NAME,
			host: process.env.DATABASE_HOST,
			port: Number.parseInt(process.env.DATABASE_PORT),
			user: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			allowGlobalContext: true,
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

	configure(_consumer: MiddlewareConsumer) {
		//
	}
}

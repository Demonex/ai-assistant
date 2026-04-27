import { Module } from "@nestjs/common";
import { DatabaseService } from "@repo/backend/services/Database.js";

@Module({
	imports: [],
	providers: [DatabaseService],
	exports: [],
	controllers: [],
})
export class DatabaseModule {}

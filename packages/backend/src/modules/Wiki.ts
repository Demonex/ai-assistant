import { Module } from "@nestjs/common";
import { WikiService } from "@repo/backend/services/Wiki.js";
// import { WikiSyncService } from "@repo/backend/services/WikiSync.js";
import { WikiController } from "@repo/backend/controllers/Wiki.js";

@Module({
	imports: [],
	providers: [WikiService],
	controllers: [WikiController],
	exports: [WikiService],
})
export class WikiModule {}

import { Module } from "@nestjs/common";
import { WikiService } from "@repo/backend/services/Wiki.js";
import { WikiController } from "@repo/backend/controllers/Wiki.js";

@Module({
	controllers: [WikiController],
	providers: [WikiService],
})
export class WikiModule {}

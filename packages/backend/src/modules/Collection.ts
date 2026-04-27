import { Module } from "@nestjs/common";

import { CollectionController } from "@repo/backend/controllers/Collection.js";
import { CollectionService } from "@repo/backend/services/Collection.js";

@Module({
	imports: [],
	providers: [CollectionService],
	exports: [CollectionService],
	controllers: [CollectionController],
})
export class CollectionModule {}

import { Module } from "@nestjs/common";

import { CollectionController } from "../controllers/Collection.js";
import { CollectionService } from "../services/Collection.js";

@Module({
	imports: [],
	providers: [CollectionService],
	exports: [CollectionService],
	controllers: [CollectionController],
})
export class CollectionModule {}

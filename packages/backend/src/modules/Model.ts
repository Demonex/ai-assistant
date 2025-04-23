import { Module } from "@nestjs/common";
import { ModelController } from "@repo/backend/controllers/Model.js";
import { ModelService } from "@repo/backend/services/Models.js";

@Module({
	imports: [],
	providers: [ModelService],
	exports: [ModelService],
	controllers: [ModelController],
})
export class ModelModule {}

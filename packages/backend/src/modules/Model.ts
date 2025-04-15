import { Module } from "@nestjs/common";
import { ModelController } from "../controllers/Model.js";
import { ModelService } from "../services/Models.js";

@Module({
	imports: [],
	providers: [ModelService],
	exports: [ModelService],
	controllers: [ModelController],
})
export class ModelModule {}

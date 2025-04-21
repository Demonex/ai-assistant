import { Module } from "@nestjs/common";
import { NeuroService } from "@repo/backend/services/Neuro.js";
import { NeuroController } from "@repo/backend/controllers/Neuro.js";

@Module({
	imports: [],
	providers: [NeuroService],
	exports: [NeuroService],
	controllers: [NeuroController],
})
export class NeuroModule {}

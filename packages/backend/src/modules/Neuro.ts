import { Module } from "@nestjs/common";
import { NeuroService } from "../services/Neuro.js";
import { NeuroController } from "../controllers/Neuro.js";

@Module({
	imports: [],
	providers: [NeuroService],
	exports: [NeuroService],
	controllers: [NeuroController],
})
export class NeuroModule {}

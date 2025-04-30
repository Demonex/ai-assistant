import { Module } from "@nestjs/common";
import { AudioService } from "@repo/backend/services/Audio.js";
import { AudioController } from "../controllers/Audio.js";

@Module({
	imports: [],
	providers: [AudioService],
	exports: [AudioService],
	controllers: [AudioController],
})
export class AudioModule {}

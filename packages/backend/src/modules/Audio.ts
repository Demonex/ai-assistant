import { Module } from "@nestjs/common";
import { AudioService } from "@repo/backend/services/Audio.js";

@Module({
	imports: [],
	providers: [AudioService],
	exports: [AudioService],
})
export class AudioModule {}

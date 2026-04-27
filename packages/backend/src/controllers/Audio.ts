import {
	Body,
	Controller,
	Post,
	UploadedFiles,
	UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Authorized } from "@repo/backend/decorators/auth.js";
import { UserId } from "@repo/backend/decorators/user.js";
import { AudioUploadMediaDto } from "@repo/backend/dto/Audio.js";
import { AudioService } from "@repo/backend/services/Audio.js";

@ApiTags("transcription")
@Controller("/api/v1")
export class AudioController {
	constructor(private readonly audioService: AudioService) {}

	@Authorized()
	@Post("transcription")
	@ApiConsumes("multipart/form-data")
	@ApiBody({ type: AudioUploadMediaDto })
	@UseInterceptors(
		FilesInterceptor("media", 500, {
			fileFilter: (_, file, callback) => {
				file.originalname = Buffer.from(file.originalname, "latin1").toString(
					"utf8",
				);
				return callback(null, true);
			},
		}),
	)
	async transcribe(
		@UserId() _id: number,
		@Body() data: AudioUploadMediaDto,
		@UploadedFiles() media: AudioUploadMediaDto["media"],
	) {
		data.media = media;
		return this.audioService.transcribe(data);
	}
}

import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import type { UploadedFile } from "../types/Chat.js";

export class ChatMessageDto {
	@IsString()
	@ApiProperty()
	readonly raw: string;
}

export class ChatUploadMediaDto {
	@ApiProperty({
		type: "array",
		format: "binary",
		isArray: true,
	})
	media: UploadedFile[];
}

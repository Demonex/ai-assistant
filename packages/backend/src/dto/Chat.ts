import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChatMessageDto {
	@IsString()
	@ApiProperty()
	readonly raw: string;
}

export class ChatUploadMediaDto {
	@ApiProperty({
		type: "file",
		format: "binary",
		isArray: true,
	})
	media: any[];
}

import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsObject, IsOptional, IsString } from "class-validator";

export class ChatMessageDto {
	@IsString()
	@ApiProperty()
	readonly raw: string;

	@IsObject()
	@IsOptional()
	@ApiProperty()
	readonly response: {
		[key: string]: unknown;
	};

	@IsDateString()
	@ApiProperty()
	readonly created_at: string;
}

export class ChatUploadMediaDto {
	@ApiProperty({
		type: "file",
		format: "binary",
		isArray: true,
	})
	media: any[];
}

import { ApiProperty } from "@nestjs/swagger";
import {
	IsDateString,
	IsEmail,
	IsObject,
	IsOptional,
	IsString,
} from "class-validator";

export class ChatMessageDto {
	@IsString()
	@ApiProperty()
	readonly raw: string;

	@IsEmail()
	@IsOptional()
	@ApiProperty()
	readonly email!: string;
}

export class ChatUploadMediaDto {
	@ApiProperty({
		type: "file",
		format: "binary",
		isArray: true,
	})
	media: any[];
}

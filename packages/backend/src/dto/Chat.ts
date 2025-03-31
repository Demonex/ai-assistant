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

	@IsOptional()
	@IsEmail()
	@ApiProperty({ required: true })
	readonly email!: string;
}

type UploadedFile = {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	size: number;
	buffer: Buffer;
	destination?: string;
	filename?: string;
	path?: string;
};

export class ChatUploadMediaDto {
	@ApiProperty({
		type: "file",
		format: "binary",
		isArray: true,
	})
	media: UploadedFile[];
}

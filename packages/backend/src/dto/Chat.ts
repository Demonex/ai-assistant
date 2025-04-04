import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class ChatMessageDto {
	@IsString()
	@ApiProperty()
	readonly raw: string;

	@IsEmail()
	@IsOptional()
	@ApiProperty()
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
		type: "array",
		format: "binary",
		isArray: true,
	})
	media: UploadedFile[];
}

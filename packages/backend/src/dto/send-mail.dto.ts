import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class SendMailDto {
	@ApiProperty({
		type: [String],
		description: 'Array of "to" emails.',
	})
	@IsNotEmpty()
	@IsArray()
	recipients: string[];

	@ApiProperty({
		type: String,
		description: "Email`s subject.",
	})
	@IsNotEmpty()
	@IsString()
	subject: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		type: String,
		description: "Email`s body in html format.",
	})
	html: string;
}

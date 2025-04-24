import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateModelDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	type: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	tenant: string;
}

export class UpdateModelDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	type: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	tenant: string;
}

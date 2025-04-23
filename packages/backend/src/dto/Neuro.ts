import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNeuroDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	model: string;

	@ApiProperty()
	@IsOptional()
	modelSettings: string | null;
}

export class UpdateNeuroDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	title: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	model: string;

	@ApiProperty()
	@IsOptional()
	modelSettings: string | null;
}

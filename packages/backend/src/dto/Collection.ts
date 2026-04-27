import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCollectionDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	tenantTitle: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	embeddingTitle: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	llmTitle: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	rerankerTitle: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	providerTitle: string;
}

export class UpdateCollectionDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	title: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	description: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	tenantTitle: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	embeddingTitle: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	llmTitle: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	rerankerTitle: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	providerTitle: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCollectionDto {
	@ApiProperty()
	@IsString()
	title!: string;

	@ApiProperty()
	@IsString()
	description!: string;

	@ApiProperty()
	@IsString()
	tenantTitle!: string;

	@ApiProperty()
	@IsString()
	embeddingTitle!: string;

	@ApiProperty()
	@IsString()
	llmTitle!: string;

	@ApiProperty()
	@IsString()
	rerankerTitle!: string;

	@ApiProperty()
	@IsString()
	providerTitle!: string;
}

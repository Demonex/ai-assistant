import { IsInt, IsString } from "class-validator";

export class createCollectionDto {
	@IsInt()
	tenant: number;

	@IsString()
	title: string;

	@IsInt()
	embedding: number;

	@IsInt()
	llm: number;

	@IsInt()
	reranker: number;

	@IsString()
	description: string;
}

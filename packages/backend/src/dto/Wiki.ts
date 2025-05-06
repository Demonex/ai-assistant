import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNumber } from "class-validator";

export class UploadWikiJsDocsDto {
	@IsArray()
	@ArrayNotEmpty()
	@IsNumber({}, { each: true })
	@ApiProperty({ type: [Number] })
	readonly ids: number[];
}

export class RemoveWikiJsDocsDto {
	@IsArray()
	@ArrayNotEmpty()
	@IsNumber({}, { each: true })
	@ApiProperty({ type: [Number] })
	ids: number[];
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class UploadWikiJsDocumentsDto {
	@IsNumber({}, { each: true })
	@ApiProperty({ type: [Number] })
	readonly ids: number[];
}

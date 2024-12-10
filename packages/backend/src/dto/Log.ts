import { IsEmail, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PostLogDto {
	@IsString()
	@ApiProperty()
	readonly osBuildFingerprint?: string;
}

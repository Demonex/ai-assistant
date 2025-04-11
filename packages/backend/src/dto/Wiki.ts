import { ApiProperty } from "@nestjs/swagger";

export class WikiRequestDto {
	@ApiProperty({
		description: "Ключ API для доступа к Wiki",
		example: "string",
	})
	apiKey: string;
}

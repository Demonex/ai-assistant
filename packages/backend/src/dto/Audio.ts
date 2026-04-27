import { ApiProperty } from "@nestjs/swagger";
import type { UploadedFile } from "../types/Chat.js";

export class AudioUploadMediaDto {
	@ApiProperty({
		type: "array",
		items: {
			type: "file",
			format: "binary",
		},
	})
	media: UploadedFile[];
}

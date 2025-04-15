// wiki.controller.ts
import {
	Controller,
	Post,
	Body,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { WikiService } from "@repo/backend/services/Wiki.js";
import { WikiRequestDto } from "@repo/backend/dto/Wiki.js";

@Controller("wiki")
@ApiTags("Wiki")
export class WikiController {
	constructor(private readonly wikiService: WikiService) {}

	@Post("tree")
	@ApiOperation({ summary: "Получить структуру страниц Wiki" })
	@ApiBody({ type: WikiRequestDto, description: "Данные запроса" })
	async getPagesTree(@Body() body: { apiKey: string }) {
		if (!body.apiKey) {
			throw new HttpException(
				"API ключ не предоставлен",
				HttpStatus.BAD_REQUEST,
			);
		}

		try {
			const data = await this.wikiService.getPagesTree(body.apiKey);
			return data;
		} catch (error) {
			throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

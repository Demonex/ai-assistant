import { Controller, Post, Body } from "@nestjs/common";
import { WikiService } from "@repo/backend/services/Wiki.js";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags("Wiki")
@Controller("wiki")
export class WikiController {
	constructor(private readonly wikiService: WikiService) {}

	@Post("sync")
	@ApiBody({
		schema: {
			type: "object",
			properties: {
				apiKey: { type: "string" },
				baseUrl: { type: "string" },
				collectionId: { type: "number" },
			},
			required: ["apiKey", "baseUrl", "collectionId"],
		},
	})
	async sync(
		@Body() body: { apiKey: string; baseUrl: string; collectionId: number },
	) {
		await this.wikiService.saveFetchedPages(
			body.apiKey,
			body.baseUrl,
			body.collectionId,
		);

		return { status: "ok" };
	}
}

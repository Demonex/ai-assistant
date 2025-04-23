import { Controller, Post, Body } from "@nestjs/common";
import { WikiService } from "@repo/backend/services/Wiki.js";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags("Wiki")
@Controller("wiki")
export class WikiController {
	constructor(private readonly wikiService: WikiService) {}

	@Post("tree")
	@ApiBody({
		schema: {
			type: "object",
			properties: {
				apiKey: { type: "string" },
				baseUrl: { type: "string" },
				locale: { type: "string", default: "en" },
			},
			required: ["apiKey", "baseUrl"],
		},
	})
	async getTree(
		@Body() body: { apiKey: string; baseUrl: string; locale?: string },
	) {
		const tree = await this.wikiService.fetchPageTree(
			body.apiKey,
			body.baseUrl,
			body.locale || "en",
		);
		return tree;
	}
}

import { Controller, Get } from "@nestjs/common";
import { WikiService } from "@repo/backend/services/Wiki.js";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Wiki")
@Controller("wiki")
export class WikiController {
	constructor(private readonly wikiService: WikiService) {}

	@Get("tree")
	@ApiOperation({ summary: "Получить дерево документов Wiki.js" })
	async getTree() {
		const tree = await this.wikiService.fetchPageTree();
		return tree;
	}
}

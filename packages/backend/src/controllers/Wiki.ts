import { Controller, Get } from "@nestjs/common";
import { WikiService } from "@repo/backend/services/Wiki.js";

@Controller("wiki")
export class WikiController {
	constructor(private readonly wikiService: WikiService) {}

	@Get("tree")
	async getTree() {
		return this.wikiService.getPagesTree();
	}
}

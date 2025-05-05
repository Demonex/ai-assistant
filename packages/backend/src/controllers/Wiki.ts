import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { WikiService } from "@repo/backend/services/Wiki.js";
import { ApiTags, ApiBody } from "@nestjs/swagger";
// import { Authorized } from "@repo/backend/decorators/auth.js";
import { UploadWikiJsDocumentsDto } from "@repo/backend/dto/Wiki.js";

@ApiTags("Wiki")
@Controller("wiki")
export class WikiController {
	constructor(private readonly wikiService: WikiService) {}

	// @Authorized()
	@Get("tree/:collectionId")
	async getWikiTree(@Param("collectionId") collectionId: number) {
		return await this.wikiService.fetchPageTree(collectionId);
	}

	// @Authorized()
	@Post("upload/:collectionId")
	@HttpCode(200)
	@ApiBody({
		type: UploadWikiJsDocumentsDto,
	})
	async postUploadDocuments(
		@Param("collectionId") collectionId: number,
		@Body() data: UploadWikiJsDocumentsDto,
	) {
		return this.wikiService.uploadDocuments(collectionId, data.ids);
	}
}

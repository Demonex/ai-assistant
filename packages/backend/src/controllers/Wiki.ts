import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
} from "@nestjs/common";
import { WikiService } from "@repo/backend/services/Wiki.js";
import { ApiTags, ApiBody } from "@nestjs/swagger";
// import { Authorized } from "@repo/backend/decorators/auth.js";
import {
	RemoveWikiJsDocsDto,
	UploadWikiJsDocsDto,
} from "@repo/backend/dto/Wiki.js";

@ApiTags("Wiki")
@Controller("wiki")
export class WikiController {
	constructor(private readonly wikiService: WikiService) {}

	// @Authorized()
	@Get(":collectionId/tree")
	async getWikiTree(@Param("collectionId") collectionId: number) {
		return await this.wikiService.fetchPageTree(collectionId);
	}

	// @Authorized()
	@Post(":collectionId/upload")
	@HttpCode(200)
	@ApiBody({
		type: UploadWikiJsDocsDto,
	})
	async postUploadDocuments(
		@Param("collectionId") collectionId: number,
		@Body() data: UploadWikiJsDocsDto,
	) {
		return this.wikiService.uploadDocuments(collectionId, data.ids);
	}

	// @Authorized()
	@Delete(":collectionId/remove")
	@HttpCode(200)
	@ApiBody({
		type: RemoveWikiJsDocsDto,
	})
	async removeDocuments(
		@Param("collectionId") collectionId: number,
		@Body() data: RemoveWikiJsDocsDto,
	) {
		return this.wikiService.removeDocuments(collectionId, data.ids);
	}
}

import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { WikiService } from "@repo/backend/services/Wiki.js";
import { ApiTags } from "@nestjs/swagger";
import { Authorized } from "@repo/backend/decorators/auth.js";
import {
	RemoveWikiJsDocsDto,
	UploadWikiJsDocsDto,
} from "@repo/backend/dto/Wiki.js";

@ApiTags("Wiki")
@Controller("/api/v1/wiki")
export class WikiController {
	constructor(private readonly wikiService: WikiService) {}

	@Authorized()
	@Get(":collectionId/tree")
	getWikiTree(@Param("collectionId") collectionId: number) {
		return this.wikiService.fetchPageTree(collectionId);
	}

	@Authorized()
	@Post(":collectionId/upload")
	postUploadDocuments(
		@Param("collectionId") collectionId: number,
		@Body() uploadWikiJsDocsDto: UploadWikiJsDocsDto,
	) {
		return this.wikiService.uploadDocuments(
			collectionId,
			uploadWikiJsDocsDto.ids,
		);
	}

	@Authorized()
	@Delete(":collectionId/remove")
	removeDocuments(
		@Param("collectionId") collectionId: number,
		@Body() removeWikiJsDocsDto: RemoveWikiJsDocsDto,
	) {
		return this.wikiService.removeDocuments(
			collectionId,
			removeWikiJsDocsDto.ids,
		);
	}
}

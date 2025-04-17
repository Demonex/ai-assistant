import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Authorized } from "../decorators/auth.js";
import { CollectionService } from "../services/Collection.js";
import { TenantId, UserId } from "../decorators/user.js";
import { CreateCollectionDto } from "../dto/Collection.js";

ApiTags("collection");
@Controller("/api/v1")
export class CollectionController {
	constructor(private readonly collectionService: CollectionService) {}

	@Authorized()
	@Get("/collections")
	async getCollections(
		@UserId() userId: number,
		@TenantId() currentTenant: number,
	) {
		return this.collectionService.findAll(userId, currentTenant);
	}

	@Authorized()
	@Get("/collections/:id")
	async getCollectionItem(@Param("id", ParseIntPipe) id: number) {
		return this.collectionService.findOne(id);
	}

	@Authorized()
	@Post("/collections")
	async createCollection(@Body() createCollectionDto: CreateCollectionDto) {
		return this.collectionService.createCollection(createCollectionDto);
	}
}

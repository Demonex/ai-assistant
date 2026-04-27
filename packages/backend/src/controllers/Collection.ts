import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Authorized } from "../decorators/auth.js";
import { CollectionService } from "../services/Collection.js";
import { UserId } from "../decorators/user.js";
import { CreateCollectionDto, UpdateCollectionDto } from "../dto/Collection.js";

ApiTags("collection");
@Controller("/api/v1")
export class CollectionController {
	constructor(private readonly collectionService: CollectionService) {}

	@Authorized()
	@Get("/collections/:tenantId")
	async getCollections(
		@UserId() userId: number,
		@Param("tenantId") tenantId: number,
	) {
		return this.collectionService.findAll(userId, tenantId);
	}

	@Authorized()
	@Get("/collections/collection/:id")
	async getCollectionItem(@Param("id", ParseIntPipe) id: number) {
		return this.collectionService.findOne(id);
	}

	@Authorized()
	@Post("/collections")
	async createCollection(@Body() createCollectionDto: CreateCollectionDto) {
		return this.collectionService.createCollection(createCollectionDto);
	}

	@Authorized()
	@Patch("collections/:id")
	async updateCollection(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateCollectionDto: UpdateCollectionDto,
	) {
		return this.collectionService.updateCollection(id, updateCollectionDto);
	}
}

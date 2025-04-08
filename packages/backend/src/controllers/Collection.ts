import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Authorized } from "../decorators/auth.js";
import { CollectionService } from "../services/Collection.js";
import { TenantId, UserId } from "../decorators/user.js";

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
		return this.collectionService.getCollections(userId, currentTenant);
	}
}

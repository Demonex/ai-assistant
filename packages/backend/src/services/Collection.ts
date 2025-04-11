import { Injectable } from "@nestjs/common";
import { ChatMessageEntity } from "../entities/Chat/index.js";

import { EntityManager } from "@mikro-orm/core";

import { CollectionEntity } from "../entities/Collection/index.js";

@Injectable()
export class CollectionService {
	constructor(private readonly em: EntityManager) {}

	async getCollections(userId: ChatMessageEntity["user"]["id"], currentTenant) {
		const collections = await this.em.find<CollectionEntity>(
			CollectionEntity,
			{
				tenant: currentTenant,
			},
			{
				populate: ["embedding", "llm", "reranker", "providers"],
			},
		);

		return collections;
	}
}

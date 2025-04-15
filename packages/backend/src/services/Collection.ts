import { Injectable, NotFoundException } from "@nestjs/common";
import { ChatMessageEntity } from "../entities/Chat/index.js";

import { EntityManager } from "@mikro-orm/core";

import { CollectionEntity } from "../entities/Collection/index.js";

@Injectable()
export class CollectionService {
	constructor(private readonly em: EntityManager) {}

	async findAll(userId: ChatMessageEntity["user"]["id"], currentTenant) {
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

	async findOne(collectionId) {
		const collection = await this.em.findOne<CollectionEntity>(
			CollectionEntity,
			{
				id: collectionId,
			},
			{
				populate: ["embedding", "llm", "reranker", "providers", "tenant"],
			},
		);

		if (!collection) {
			throw new NotFoundException(
				`Коллекции с id:${collectionId} не существует`,
			);
		}
		return collection;
	}
}

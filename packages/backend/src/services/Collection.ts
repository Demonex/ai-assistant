import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { ChatMessageEntity } from "../entities/Chat/index.js";

import { EntityManager } from "@mikro-orm/core";

import { CollectionEntity } from "../entities/Collection/index.js";
import { CreateCollectionDto, UpdateCollectionDto } from "../dto/Collection.js";
import { TenantEntity } from "../entities/Tenant/index.js";
import { NeuroEntity } from "../entities/Neuro/index.js";
import { ProviderEntity } from "../entities/Provider/index.js";

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
				populate: ["embedding", "llm", "reranker", "providers"] as string[],
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
				populate: [
					"embedding",
					"llm",
					"reranker",
					"providers",
					"tenant",
				] as string[],
			},
		);

		if (!collection) {
			throw new NotFoundException(
				`Collection with id:${collectionId} does not exist`,
			);
		}
		return collection;
	}

	async createCollection(createCollectionDto: CreateCollectionDto) {
		this.validateCollectionDto(createCollectionDto);

		await this.checkCollectionExists(createCollectionDto.title);

		const { tenant, llm, embedding, reranker, providers } =
			await this.loadRequiredEntities(createCollectionDto);

		const collection = this.createNewCollectionEntity(createCollectionDto, {
			tenant,
			llm,
			embedding,
			reranker,
			providers,
		});

		await this.em.persistAndFlush(collection);
		return collection;
	}

	async updateCollection(id: number, updateCollectionDto: UpdateCollectionDto) {
		const collection = await this.em.findOne<CollectionEntity>(
			CollectionEntity,
			{ id },
		);

		if (!collection) {
			throw new NotFoundException("Collection not found");
		}

		Object.keys(updateCollectionDto).forEach((item) => {
			if (updateCollectionDto[item] !== undefined) {
				collection[item] = updateCollectionDto[item];
			}
		});

		await this.em.flush();

		return collection;
	}

	private validateCollectionDto(dto: CreateCollectionDto) {
		if (!dto) {
			throw new BadRequestException("Collection data is required");
		}
	}

	private async checkCollectionExists(title: string) {
		const existingCollection = await this.em.findOne(CollectionEntity, {
			title,
		});
		if (existingCollection) {
			throw new BadRequestException(
				`Collection with title "${title}" already exists`,
			);
		}
	}

	private async loadRequiredEntities(dto: CreateCollectionDto) {
		const [tenant, llm, embedding, reranker, providers] = await Promise.all([
			this.getEntityByTitle(dto.tenantTitle, TenantEntity),
			this.getEntityByTitle(dto.llmTitle, NeuroEntity),
			this.getEntityByTitle(dto.embeddingTitle, NeuroEntity),
			this.getEntityByTitle(dto.rerankerTitle, NeuroEntity),
			this.getEntityByTitle(dto.providerTitle, ProviderEntity),
		]);

		return { tenant, llm, embedding, reranker, providers };
	}

	private createNewCollectionEntity(dto: CreateCollectionDto, entities) {
		const now = new Date();

		return this.em.create(CollectionEntity, {
			title: dto.title,
			description: dto.description,
			...entities,
			providers: [entities.providers],
			created_at: now,
			updated_at: now,
		});
	}

	private async getEntityByTitle(title, entityName) {
		const entity = await this.em.findOne(entityName, { title });

		if (!entity) {
			throw new NotFoundException(
				`${entityName} with title "${title}" not found`,
			);
		}
		return entity;
	}
}

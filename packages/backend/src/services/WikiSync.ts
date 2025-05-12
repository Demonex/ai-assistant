import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { EntityManager } from "@mikro-orm/core";
import { GraphQLClient, gql } from "graphql-request";
import {
	ProviderEntity,
	PROVIDER_TYPE,
} from "@repo/backend/entities/Provider/index.js";
import { WikiJsDocEntity } from "@repo/backend/entities/Wiki/index.js";
import { parsePeriod } from "@repo/backend/utils/index.js";
import type {
	WikiPageTreeType,
	WikiSinglePageResponseType,
	WikiSinglePageType,
} from "@repo/backend/types/Wiki.js";

@Injectable()
export class WikiSyncService {
	private readonly logger = new Logger(WikiSyncService.name);

	constructor(private readonly em: EntityManager) {}

	private createClient(apiKey: string, baseUrl: string) {
		return new GraphQLClient(`${baseUrl}/graphql`, {
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		});
	}

	private async fetchPageList(client: GraphQLClient) {
		const query = gql`
			query {
				pages {
					list {
						id
						title
						path
						isPublished
						isPrivate
						updatedAt
					}
				}
			}
		`;
		const res: WikiPageTreeType = await client.request(query);
		return res.pages.list;
	}

	private async fetchPage(
		client: GraphQLClient,
		id: number,
	): Promise<WikiSinglePageType> {
		const query = gql`
			query ($id: Int!) {
				pages {
					single(id: $id) {
						id
						title
						path
						updatedAt
						content
					}
				}
			}
		`;
		const data: WikiSinglePageResponseType = await client.request(query, {
			id,
		});
		return data.pages.single;
	}

	@Cron(CronExpression.EVERY_MINUTE)
	async syncWikiJs() {
		const now = new Date();
		const provider = await this.em.findOne(ProviderEntity, {
			type: PROVIDER_TYPE.wikijs,
		});

		if (!provider) {
			this.logger.warn("WikiJS provider not found");
			return;
		}

		const settings = provider.settings || {};
		const updatePeriodStr = settings.update_period;
		const lastUpdate = settings.last_update_time
			? new Date(settings.last_update_time)
			: null;

		if (!updatePeriodStr) {
			this.logger.warn(`Provider ${provider.id} missing update_period`);
			return;
		}

		let msPeriod: number;
		try {
			msPeriod = parsePeriod(updatePeriodStr);
		} catch {
			this.logger.warn(`Invalid update_period for provider ${provider.id}`);
			return;
		}

		const shouldUpdate =
			!lastUpdate || now.getTime() - lastUpdate.getTime() >= msPeriod;

		if (!shouldUpdate) return;

		try {
			const { api_key, url } = settings;

			if (!api_key || !url) {
				this.logger.warn(`Provider ${provider.id} missing api_key or url`);
				return;
			}

			const client = this.createClient(api_key, url);
			const wikiDocs = await this.fetchPageList(client);

			const allowedWikiMap = new Map<number, string>();
			const allowedIds = new Set<number>();

			for (const doc of wikiDocs) {
				const allowed = doc.isPublished && !doc.isPrivate;
				if (allowed) {
					allowedWikiMap.set(doc.id, doc.updatedAt);
					allowedIds.add(doc.id);
				}
			}

			const dbDocs = await this.em.find(WikiJsDocEntity, {});
			const dbMap = new Map<number, WikiJsDocEntity[]>();

			for (const doc of dbDocs) {
				if (!dbMap.has(doc.fileId)) {
					dbMap.set(doc.fileId, []);
				}
				dbMap.get(doc.fileId)!.push(doc);
			}

			const toDelete: WikiJsDocEntity[] = [];
			const toUpdate: WikiJsDocEntity[] = [];

			const qdrantToDelete: { id: number; collectionId: number }[] = [];
			const qdrantToUpdate: {
				id: number;
				collectionId: number;
				content: string;
			}[] = [];

			for (const [fileId, entities] of dbMap.entries()) {
				const wikiUpdatedAt = allowedWikiMap.get(fileId);

				if (!wikiUpdatedAt) {
					toDelete.push(...entities);
					qdrantToDelete.push(
						...entities.map((e) => ({
							id: e.fileId,
							collectionId: e.collectionId,
						})),
					);
				} else if (entities[0].fileUpdateAt !== wikiUpdatedAt) {
					const page = await this.fetchPage(client, fileId);

					for (const entity of entities) {
						entity.fileUpdateAt = wikiUpdatedAt;
						toUpdate.push(entity);

						qdrantToUpdate.push({
							id: page.id,
							collectionId: entity.collectionId,
							content: page.content,
						});
					}
				}
			}

			if (toDelete.length > 0) {
				await this.em.removeAndFlush(toDelete);
			}

			if (toUpdate.length > 0) {
				await this.em.flush();
			}

			provider.settings.last_update_time = now.toISOString();
			await this.em.flush();

			// Эти массивы использовать для Qdrant
			// qdrantToDelete
			// qdrantToUpdate
		} catch (e) {
			throw new Error(`Error sync ${e.message}`);
		}
	}
}

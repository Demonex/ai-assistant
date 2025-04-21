import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/core";
import { WikiDocEntity } from "@repo/backend/entities/Wiki/index.js";
import { type WikiPageTree, type WikiPage } from "@repo/backend/types/Wiki.js";
import { GraphQLClient, gql } from "graphql-request";

@Injectable()
export class WikiService {
	constructor(
		@InjectRepository(WikiDocEntity)
		private readonly wikiRepo: EntityRepository<WikiDocEntity>,
		private readonly em: EntityManager,
	) {}

	private createClient(apiKey: string, baseUrl: string) {
		return new GraphQLClient(`${baseUrl}/graphql`, {
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		});
	}

	async fetchPages(apiKey: string, baseUrl: string): Promise<WikiPage[]> {
		const client = this.createClient(apiKey, baseUrl);

		const query = gql`
			query {
				pages {
					list {
						id
						title
						path
						isPublished
						createdAt
						updatedAt
					}
				}
			}
		`;

		const data: WikiPageTree = await client.request(query);
		return data.pages.list;
	}

	async saveFetchedPages(
		apiKey: string,
		baseUrl: string,
		docCollectionProviderId: number,
	) {
		const pages = await this.fetchPages(apiKey, baseUrl);

		for (const page of pages) {
			const doc = this.wikiRepo.create({
				ext_id: page.id.toString(),
				ext_parent_id: null,
				name: page.title,
				last_date_modified: new Date(page.updatedAt),
				view_url: `${baseUrl}/${page.path}`,
				doc_collection_provider_id: docCollectionProviderId,
			});

			await this.em.persistAndFlush(doc);
		}
	}
}

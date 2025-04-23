import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/core";
import { WikiDocEntity } from "@repo/backend/entities/Wiki/index.js";
import { GraphQLClient, gql } from "graphql-request";
import type {
	WikiPageTree,
	WikiPageTreeNode,
} from "@repo/backend/types/Wiki.js";

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

	private async fetchRecursiveTree(
		client: GraphQLClient,
		locale: string,
		parent?: number,
		results: WikiPageTreeNode[] = [],
	): Promise<WikiPageTreeNode[]> {
		const query = gql`
			query GetTree($parent: Int, $locale: String!) {
				pages {
					tree(parent: $parent, locale: $locale, mode: ALL) {
						id
						title
						path
						parent
						isFolder
						pageId
						depth
					}
				}
			}
		`;
		const { pages } = await client.request(query, { parent, locale });

		for (const node of pages.tree) {
			const item: WikiPageTreeNode = {
				...node,
				children: [],
			};

			results.push(item);

			if (item.isFolder) {
				await this.fetchRecursiveTree(client, locale, item.id, results);
			}
		}

		return results;
	}

	private async fetchPageMeta(
		client: GraphQLClient,
	): Promise<WikiPageTreeNode[]> {
		const query = gql`
			query {
				pages {
					list {
						id
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

	async fetchPageTree(
		apiKey: string,
		baseUrl: string,
		locale = "en",
	): Promise<WikiPageTreeNode[]> {
		const client = this.createClient(apiKey, baseUrl);

		const flatList = await this.fetchRecursiveTree(client, locale);

		const pageMeta = await this.fetchPageMeta(client);

		const metaMap = new Map<number, { createdAt: string; updatedAt: string }>();
		for (const page of pageMeta) {
			metaMap.set(page.id, {
				createdAt: page.createdAt,
				updatedAt: page.updatedAt,
			});
		}

		const filtered = flatList.filter((node) => {
			return node.isFolder || (node.pageId && metaMap.has(node.pageId));
		});

		for (const node of filtered) {
			if (!node.isFolder && node.pageId && metaMap.has(node.pageId)) {
				const meta = metaMap.get(node.pageId)!;
				node.createdAt = meta.createdAt;
				node.updatedAt = meta.updatedAt;
			}
		}

		const map = new Map<number, WikiPageTreeNode>();
		const roots: WikiPageTreeNode[] = [];

		for (const node of filtered) {
			node.children = [];
			map.set(node.id, node);
		}

		for (const node of filtered) {
			if (node.parent && map.has(node.parent)) {
				map.get(node.parent)!.children!.push(node);
			} else {
				roots.push(node);
			}
		}

		const pruneEmptyFolders = (nodes: WikiPageTreeNode[]): WikiPageTreeNode[] =>
			nodes
				.map((node) => {
					if (node.children && node.children.length > 0) {
						node.children = pruneEmptyFolders(node.children);
					}
					return node;
				})
				.filter((node) => {
					if (node.isFolder) {
						return node.children && node.children.length > 0;
					}
					return true;
				});

		return pruneEmptyFolders(roots);
	}
}

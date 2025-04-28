import { Injectable } from "@nestjs/common";
import { GraphQLClient, gql } from "graphql-request";
import { ProviderService } from "@repo/backend/services/Provider.js";
import type {
	WikiPageType,
	WikiPageTreeType,
} from "@repo/backend/types/Wiki.js";
import { PROVIDER_TYPE } from "@repo/backend/entities/Provider/index.js";

@Injectable()
export class WikiService {
	constructor(private readonly providerService: ProviderService) {}

	private createClient(apiKey: string, baseUrl: string) {
		return new GraphQLClient(`${baseUrl}/graphql`, {
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		});
	}

	private async fetchPageList(client: GraphQLClient): Promise<WikiPageType[]> {
		const query = gql`
			query {
				pages {
					list {
						id
						title
						path
						isPublished
						isPrivate
						createdAt
						updatedAt
					}
				}
			}
		`;

		const data: WikiPageTreeType = await client.request(query);
		return data.pages.list;
	}

	async fetchPageTree(): Promise<WikiPageType[]> {
		const providers = await this.providerService.getProviders();

		const provider = providers.find((p) => p.type === PROVIDER_TYPE.wikijs);

		if (!provider) {
			throw new Error("WikiJS provider not found");
		}

		const { url, apiKey } = provider.settings;

		if (!url || !apiKey) {
			throw new Error("WikiJS provider URL is missing");
		}

		const client = this.createClient(apiKey, url);
		const pages = await this.fetchPageList(client);

		const nodeMap = new Map();
		const roots: WikiPageType[] = [];

		for (const page of pages) {
			if (!page.isPublished || page.isPrivate) continue;

			const depth = page.path.split("/").length;
			const node = {
				id: page.id,
				title: page.title,
				path: page.path,
				isFolder: false,
				depth,
				createdAt: page.createdAt,
				updatedAt: page.updatedAt,
			};

			nodeMap.set(page.path, node);
		}

		for (const node of nodeMap.values()) {
			const parts = node.path.split("/");
			const parentPath = parts.slice(0, -1).join("/");

			if (parentPath && nodeMap.has(parentPath)) {
				const parent = nodeMap.get(parentPath)!;

				if (!parent.isFolder) {
					parent.isFolder = true;
					parent.children = [];
				}

				parent.children.push(node);
				node.parent = parent.id;
			} else {
				roots.push(node);
			}
		}

		for (const node of nodeMap.values()) {
			if (!node.isFolder && "children" in node) {
				delete node.children;
			}
		}

		return roots;
	}
}

import { Injectable } from "@nestjs/common";
import { GraphQLClient, gql } from "graphql-request";
import type {
	WikiPageType,
	WikiPageTreeType,
} from "@repo/backend/types/Wiki.js";

@Injectable()
export class WikiService {
	private createClient(apiKey: string, baseUrl: string) {
		return new GraphQLClient(`${baseUrl}/graphql`, {
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		});
	}

	private async fetchPageList(
		client: GraphQLClient,
	): Promise<WikiPageTreeType[]> {
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

		const data: WikiPageType = await client.request(query);
		return data.pages.list;
	}

	async fetchPageTree(
		apiKey: string,
		baseUrl: string,
	): Promise<WikiPageTreeType[]> {
		const client = this.createClient(apiKey, baseUrl);
		const pages = await this.fetchPageList(client);

		const nodeMap = new Map();
		const pathToId = new Map();
		const roots: WikiPageTreeType[] = [];

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
			pathToId.set(page.path, page.id);
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

				(parent.children as WikiPageTreeType[]).push(node);
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

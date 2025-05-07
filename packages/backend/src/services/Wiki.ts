import { Injectable, NotFoundException } from "@nestjs/common";
import { GraphQLClient, gql } from "graphql-request";
import type {
	WikiPageType,
	WikiPageTreeType,
	WikiSinglePageResponseType,
	WikiSinglePageType,
} from "@repo/backend/types/Wiki.js";
import {
	PROVIDER_TYPE,
	ProviderEntity,
} from "@repo/backend/entities/Provider/index.js";
import { WikiJsDocEntity } from "@repo/backend/entities/Wiki/index.js";
import { EntityManager, TableNotFoundException } from "@mikro-orm/core";

@Injectable()
export class WikiService {
	constructor(private readonly em: EntityManager) {}

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

	async fetchPageTree(collectionId: number): Promise<WikiPageType[]> {
		const provider = await this.em.findOne(ProviderEntity, {
			type: PROVIDER_TYPE.wikijs,
		});

		if (!provider) {
			throw new Error("WikiJS provider not found");
		}

		const { url, api_key } = provider.settings;

		if (!url) {
			throw new Error("WikiJS provider url is missing");
		}

		if (!api_key) {
			throw new Error("WikiJS provider api_key is missing");
		}

		const client = this.createClient(api_key, url);
		const pages = await this.fetchPageList(client);

		let uploadedDocs: WikiJsDocEntity[] = [];

		try {
			uploadedDocs = await this.em.find(WikiJsDocEntity, { collectionId });
		} catch (e) {
			if (!(e instanceof TableNotFoundException)) {
				console.error(e);
				throw new Error("Table not found");
			}
		}

		const uploadedSet = new Set(
			uploadedDocs.map((doc) => `${doc.fileId}_${doc.collectionId}`),
		);

		const nodeMap = new Map();
		const roots: WikiPageType[] = [];

		for (const page of pages) {
			if (!page.isPublished || page.isPrivate) continue;

			const depth = page.path.split("/").length;
			const isUpload = uploadedSet.has(`${page.id}_${collectionId}`);

			const node = {
				id: page.id,
				title: page.title,
				path: page.path,
				isFolder: false,
				isUpload,
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
			if (node.isFolder && "isUpload" in node) {
				delete node.isUpload;
			}
		}

		return roots;
	}

	//// UPLOAD DOCS

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

	async uploadDocuments(collectionId: number, data: number[]) {
		const provider = await this.em.findOne(ProviderEntity, {
			type: PROVIDER_TYPE.wikijs,
		});

		if (!provider) {
			throw new NotFoundException("WikiJs provider not found");
		}

		const { url, api_key } = provider.settings;

		if (!url) {
			throw new Error("WikiJS provider url is missing");
		}
		if (!api_key) {
			throw new Error("WikiJS provider api_key is missing");
		}

		const client = this.createClient(api_key, url);

		const qdrantDocs = [];
		const pgDocs = [];

		for (const id of data) {
			const page = await this.fetchPage(client, id);

			const wikijsDoc = this.em.create(WikiJsDocEntity, {
				vectorFilePath: page.path,
				collectionId: collectionId,
				providerId: provider.id,
				fileId: page.id,
				fileName: page.title,
				fileUpdateAt: page.updatedAt,
			});

			pgDocs.push(wikijsDoc);

			qdrantDocs.push({
				id: page.id,
				collection_id: collectionId,
				file_name: page.title,
				content: page.content,
			});
		}

		await this.em.persistAndFlush(pgDocs);
		return { status: "success", uploadCount: pgDocs.length };
	}

	/// REMOVE DOCS

	async removeDocuments(collectionId: number, data: number[]) {
		const docs = await this.em.find(WikiJsDocEntity, {
			collectionId,
			fileId: { $in: data },
		});

		const deletedCount = await this.em.nativeDelete(WikiJsDocEntity, {
			collectionId,
			fileId: { $in: docs.map((d) => d.fileId) },
		});

		return { status: "deleted", deletedCount };
	}
}

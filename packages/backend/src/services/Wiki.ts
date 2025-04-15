import { Injectable } from "@nestjs/common";
import { GraphQLClient, gql } from "graphql-request";

@Injectable()
export class WikiService {
	private client: GraphQLClient;

	constructor() {
		this.client = new GraphQLClient(process.env.WIKI_API_URL, {
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	async getPagesTree(apiKey: string) {
		const tempClient = new GraphQLClient(process.env.WIKI_API_URL, {
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
		});

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

		const data = await tempClient.request(query);
		return data;
	}
}

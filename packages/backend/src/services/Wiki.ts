import { Injectable } from "@nestjs/common";
import { GraphQLClient, gql } from "graphql-request";

@Injectable()
export class WikiService {
	private client: GraphQLClient;

	constructor() {
		this.client = new GraphQLClient(process.env.WIKI_API_URL, {
			headers: {
				Authorization: `Bearer ${process.env.WIKI_API_KEY}`,
				"Content-Type": "application/json",
			},
		});
	}

	async getPagesTree() {
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

		const data = await this.client.request(query);
		return data;
	}
}

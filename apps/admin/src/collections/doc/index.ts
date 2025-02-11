import type { CollectionConfig } from "payload";

// import defaultAccess from "@/utilities/defaultAccess";
import defaultAccess from "@/utilities/defaultAccess";
import { collection } from "@/collections/collection";
import { provider } from "@/collections/provider";

const docAccess = {
	...defaultAccess,
};

export const doc: CollectionConfig = {
	slug: "doc",
	access: docAccess,
	admin: {
		defaultColumns: ["name", "collection", "provider"],
		useAsTitle: "name",
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			defaultValue: ({ user, locale, req }) => {
				console.log(user, locale, req.query, req.id, req.body, req.payload);
			},
		},
		{
			name: "collection",
			type: "relationship",
			relationTo: collection.slug as "collection",
			required: true,
		},
		{
			name: "provider",
			type: "relationship",
			relationTo: provider.slug as "provider",
			required: true,
		},
	],
	versions: {
		drafts: {
			autosave: {
				interval: 100, // We set this interval for optimal live preview
			},
		},
		maxPerDoc: 50,
	},
	upload: {},
	hooks: {
		beforeChange: [
			async ({ data, user, operation, req: { headers, payload }, context }) => {
				switch (operation) {
					case "create" /*case "update":*/: {
						const referer = headers.get("referer");
						if (!referer) {
							throw new Error("referer not found");
						}
						const collectionId = referer.split("/").at(-1) as string;
						if (!referer) {
							throw new Error("referer not found");
						}
						const collection = await payload.findByID({
							collection: "collection",
							id: collectionId,
							draft: true,
							user,
						});
						data.name = data.filename;
						data.collection = collectionId;
						const [provider] = collection.providers;
						if (provider.length !== 24) {
							data.provider = provider.id;
						}
						console.log("data", data);
						console.log("collectionId", collectionId);
						console.log("collection", collection);
						console.log("provider", provider);
						break;
					}
				}
			},
		],
	},
};

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
		defaultColumns: ["filename", "collection", "provider"],
		useAsTitle: "filename",
		hidden: true,
	},
	fields: [
		{
			name: "vectorFilePath",
			type: "text",
			required: true,
			defaultValue: ({ req }) => {
				// console.log(user, locale, req.query, req.id, req.body, req.payload);
				console.log(req.doc_collection);
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
						data.collection = Number(collectionId);
						const [provider] = collection.providers;
						data.provider = provider.provider.id;

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

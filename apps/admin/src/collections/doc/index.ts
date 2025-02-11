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
	versions: false,
	upload: {},
};

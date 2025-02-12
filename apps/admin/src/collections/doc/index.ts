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
	upload: {},
};

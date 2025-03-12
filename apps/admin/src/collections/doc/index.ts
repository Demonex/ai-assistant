import type { CollectionConfig } from "payload";

// import defaultAccess from "@/utilities/defaultAccess";
import defaultAccess from "@/utilities/defaultAccess";
import { collection } from "@/collections/collection";
import { provider } from "@/collections/provider";

const docAccess = {
	...defaultAccess,
	create: () => false,
	update: () => false,
};

export const doc: CollectionConfig = {
	slug: "doc",
	labels: {
		singular: "Документ",
		plural: "Документы",
	},
	access: docAccess,
	admin: {
		defaultColumns: ["filename", "collection", "provider"],
		useAsTitle: "filename",
		// hidden: true,
	},
	fields: [
		{
			name: "filename",
			type: "text",
			required: true,
		},
		{
			name: "filesize",
			type: "number",
			required: true,
			admin: {
				hidden: true,
			},
		},
		{
			name: "mimeType",
			type: "text",
			required: true,
			admin: {
				hidden: true,
			},
		},
		{
			name: "vectorFilePath",
			type: "text",
			required: true,
			defaultValue: ({ req }) => {
				// console.log(user, locale, req.query, req.id, req.body, req.payload);
				// console.log(req.doc_collection);
			},
			admin: {
				hidden: true,
			},
		},
		{
			name: "collection",
			type: "relationship",
			relationTo: collection.slug as "collection",
			required: true,
			label: "Коллекция",
		},
		{
			name: "provider",
			type: "relationship",
			relationTo: provider.slug as "provider",
			required: true,
			label: "Провайдер",
		},
	],
	versions: false,
};

import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { collection } from "@/collections/collection";
import { provider } from "@/collections/provider";

export const doc: CollectionConfig = {
	slug: "doc",
	access: defaultAccess,
	admin: {
		defaultColumns: ["name", "description", "preview"],
		useAsTitle: "name",
	},
	fields: [
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
		{
			name: "name",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "description",
			type: "text",
			localized: true,
		},
		{
			name: "type",
			type: "select",
			options: ["pdf", "pptx", "docx"],
			required: true,
		},
		{
			name: "meta",
			type: "json",
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
};

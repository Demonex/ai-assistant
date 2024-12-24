import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { neuro } from "@/collections/neuro";

export const collection: CollectionConfig = {
	slug: "collection",
	access: defaultAccess,
	admin: {
		defaultColumns: ["title", "description", "preview"],
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
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
			name: "embedding",
			type: "relationship",
			relationTo: neuro.slug as "neuro",
			required: true,
		},
		{
			name: "llm",
			type: "relationship",
			relationTo: neuro.slug as "neuro",
			required: true,
		},
		{
			name: "reranker",
			type: "relationship",
			relationTo: neuro.slug as "neuro",
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
};

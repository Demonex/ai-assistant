import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { neuro } from "@/collections/neuro";
import { MODEL_TYPE } from "../model";
import { group } from "../group";

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
			filterOptions: {
				"model.type": {
					equals: MODEL_TYPE.embedding,
				},
			},
		},
		{
			name: "llm",
			type: "relationship",
			relationTo: neuro.slug as "neuro",
			required: true,
			filterOptions: {
				"model.type": {
					equals: MODEL_TYPE.llm,
				},
			},
		},
		{
			name: "reranker",
			type: "relationship",
			relationTo: neuro.slug as "neuro",
			required: true,
			filterOptions: {
				"model.type": {
					equals: MODEL_TYPE.reranker,
				},
			},
		},
		{
			name: "settings",
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

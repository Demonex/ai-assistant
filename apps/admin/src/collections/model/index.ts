import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { tenant } from "@/collections/tenant";

export enum MODEL_TYPE {
	llm = "llm",
	embedding = "embedding",
	reranker = "reranker",
}

export const model: CollectionConfig = {
	slug: "model",
	access: defaultAccess,
	admin: {
		defaultColumns: ["title", "description", "preview"],
		useAsTitle: "title",
	},
	fields: [
		{
			name: "tenant",
			type: "relationship",
			relationTo: tenant.slug as "tenant",
			required: true,
		},
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
			name: "type",
			type: "select",
			options: Object.values(MODEL_TYPE),
			required: true,
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

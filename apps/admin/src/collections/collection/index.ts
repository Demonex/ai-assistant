import type { CollectionConfig } from "payload";
import defaultAccess from "@/utilities/defaultAccess";
import { neuro } from "@/collections/neuro";
import { MODEL_TYPE } from "../model";
import { provider } from "../provider";

export const collection: CollectionConfig = {
	slug: "collection",
	access: defaultAccess,
	admin: {
		defaultColumns: ["title", "embedding", "llm", "reranker", "providers"],
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
			name: "providers",
			type: "array",
			label: "Providers",
			labels: {
				singular: "provider",
				plural: "providers",
			},
			fields: [
				{
					name: "provider",
					type: "relationship",
					relationTo: provider.slug as "provider",
					required: true,
				},
				{
					name: "enabled",
					type: "checkbox",
					defaultValue: false,
				},
				{
					name: "settings",
					type: "json",
				},
				{
					name: "docs",
					type: "upload",
					relationTo: "doc",
					hasMany: true,
				},
			],
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

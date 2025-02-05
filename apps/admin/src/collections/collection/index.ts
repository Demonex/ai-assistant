import { neuro } from "@/collections/neuro";
import defaultAccess, { checkPermissions } from "@/utilities/defaultAccess";
import type { CollectionConfig } from "payload";
import { GROUP_PERMISSIONS, MODEL_TYPE } from "@/types/types";
import { provider } from "../provider";
import { tenant } from "../tenant";

const collectionAccess = {
	...defaultAccess,
};

export const collection: CollectionConfig = {
	slug: "collection",
	access: collectionAccess,
	admin: {
		defaultColumns: ["title", "embedding", "llm", "reranker", "providers"],
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "tenant",
			type: "relationship",
			relationTo: tenant.slug as "tenant",
			required: true,
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

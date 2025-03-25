import { getCollectionAccess, getDropDownAccess } from "@/access/collection";
import { neuro } from "@/collections/neuro";
import { MODEL_TYPE } from "@/types/types";
import defaultAccess from "@/utilities/defaultAccess";
import type { CollectionConfig } from "payload";
import { provider } from "../provider";
import { tenant } from "../tenant";

const collectionAccess = {
	...defaultAccess,
	...getCollectionAccess(),
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
			name: "tenant",
			type: "relationship",
			relationTo: tenant.slug as "tenant",
			required: true,
		},
		{
			name: "title",
			type: "text",
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
					type: "text",
					admin: {
						components: {
							Field: "@/components/Field",
						},
					},
					virtual: true,
					access: getDropDownAccess(),
				},
				// {
				// 	name: "docs",
				// 	type: "upload",
				// 	relationTo: "doc",
				// 	hasMany: true,
				// },
			],
		},
	],
	versions: false,
};

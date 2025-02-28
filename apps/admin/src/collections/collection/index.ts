import { getCollectionAccess } from "@/access/collection";
import { neuro } from "@/collections/neuro";
import { MODEL_TYPE } from "@/types/types";
import defaultAccess from "@/utilities/defaultAccess";
import type { CollectionConfig } from "payload";
import { provider } from "../provider";
import { tenant } from "../tenant";
// import { CustomUploadField } from "../../components/Field";

const collectionAccess = {
	...defaultAccess,
	// ...getCollectionAccess()
};

export const collection: CollectionConfig = {
	slug: "collection",
	access: collectionAccess,
	labels: {
		singular: "Коллекция",
		plural: "Коллекции",
	},
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
			label: "Тенант",
		},
		{
			name: "title",
			type: "text",
			required: true,
			label: "Название",
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
			label: "Embedding Нейросервис",
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
			label: "LLM Нейросервис",
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
			label: "Reranker Нейросервис",
		},
		{
			name: "providers",
			type: "array",
			label: "Провайдеры",
			labels: {
				singular: "Провайдер",
				plural: "Провайдеры",
			},
			fields: [
				{
					name: "provider",
					type: "relationship",
					relationTo: provider.slug as "provider",
					required: true,
					label: "Провайдер",
				},
				{
					name: "enabled",
					type: "checkbox",
					defaultValue: false,
					label: "Включена",
				},
				{
					name: "settings",
					type: "json",
					label: "Настройки провайдера",
				},
				{
					name: "docs",
					type: "text",
					admin: {
						components: {
							Field: "@/components/Field",
						},
					},
					label: "Документы",
					virtual: true,
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

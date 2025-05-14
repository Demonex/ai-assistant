import type { CollectionConfig } from "payload";

// import defaultAccess from "@/utilities/defaultAccess";
import { collection } from "@/collections/collection";
import { provider } from "@/collections/provider";
import { DocService } from "@/services/DocService.js";
import defaultAccess from "@/utilities/defaultAccess";

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
	},
	hooks: {
		beforeDelete: [
			async ({ id }) => {
				console.log("hello");
				await DocService.delete(+id);
				// console.log(, collection, context, id, req);
			},
		],
	},
	fields: [
		{
			name: "filename",
			type: "text",
			required: true,
			label: "Название",
		},
		{
			name: "filesize",
			type: "number",
			required: true,
			label: "Размер",
			admin: {
				hidden: true,
			},
		},
		{
			name: "mimeType",
			type: "text",
			required: true,
			label: "MIME Type",
			admin: {
				hidden: true,
			},
		},
		{
			name: "file_uuid",
			type: "text",
			required: true,
			label: "uuid",
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
		{
			name: "metaData",
			type: "json",
			label: "Метаданные",
			admin: {
				hidden: true,
			},
		},
	],
	versions: false,
};

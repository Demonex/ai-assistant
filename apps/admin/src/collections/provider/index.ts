import type { CollectionConfig } from "payload";

import { tenant } from "@/collections/tenant";
import defaultAccess from "@/utilities/defaultAccess";
import { getProviderAccess } from "@/access/provider";

const providerAccess = {
	...defaultAccess,
	...getProviderAccess(),
};

export const provider: CollectionConfig = {
	slug: "provider",
	labels: {
		singular: "Провайдер",
		plural: "Провайдеры",
	},
	access: providerAccess,
	admin: {
		defaultColumns: ["title", "description", "type"],
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
			name: "description",
			type: "text",
			label: "Описание",
		},
		{
			name: "type",
			type: "select",
			options: ["minio", "confluence"],
			required: true,
			label: "Тип провайдера",
		},
		{
			name: "settings",
			type: "json",
			label: "Настройки провайдера",
		},
	],
	versions: false,
};

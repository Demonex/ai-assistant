import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { tenant } from "@/collections/tenant";
import { getProviderAccess } from "@/access/providerAccess";

const providerAccess = {
	...defaultAccess,
	...getProviderAccess(),
};

export const provider: CollectionConfig = {
	slug: "provider",
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
		},
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "description",
			type: "text",
		},
		{
			name: "type",
			type: "select",
			options: ["minio", "confluence"],
			required: true,
		},
		{
			name: "settings",
			type: "json",
		},
	],
	versions: false,
};

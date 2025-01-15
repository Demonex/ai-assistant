import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { tenant } from "@/collections/tenant";

export const provider: CollectionConfig = {
	slug: "provider",
	access: defaultAccess,
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

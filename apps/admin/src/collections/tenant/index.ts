import type { CollectionConfig } from "payload";

import { tenantMedia } from "@/collections/tenant/media";
import defaultAccess from "@/utilities/defaultAccess";

const tenantAccess = {
	...defaultAccess,
};

export const tenant: CollectionConfig = {
	slug: "tenant",
	labels: {
		singular: "Тенант",
		plural: "Тенанты",
	},
	access: tenantAccess,
	admin: {
		defaultColumns: ["title", "description"],
		useAsTitle: "title",
	},
	fields: [
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
			name: "preview",
			type: "upload",
			relationTo: tenantMedia.slug as "tenant-media",
			label: "Превью",
		},
	],
	versions: false,
	timestamps: true,
};

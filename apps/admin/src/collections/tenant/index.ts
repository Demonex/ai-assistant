import type { CollectionConfig } from "payload";

import { tenantMedia } from "@/collections/tenant/media";
import defaultAccess from "@/utilities/defaultAccess";
import { getTenantAccess } from "@/access/tenant";

const tenantAccess = {
	...defaultAccess,
	...getTenantAccess(),
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
		// {
		//   name: "id",
		//   type: "integer",
		//   required: true,
		//   unique: true,
		//   virtual: true,
		//   admin: {
		//     hidden: true
		//   }
		// },
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

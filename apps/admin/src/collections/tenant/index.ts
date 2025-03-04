import type { CollectionConfig } from "payload";

import { tenantMedia } from "@/collections/tenant/media";
import defaultAccess from "@/utilities/defaultAccess";
import { getTenantAccess } from "@/access/tenantAccess";

const tenantAccess = {
	...defaultAccess,
	...getTenantAccess(),
};

export const tenant: CollectionConfig = {
	slug: "tenant",
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
		},
		{
			name: "description",
			type: "text",
		},
		{
			name: "preview",
			type: "upload",
			relationTo: tenantMedia.slug as "tenant-media",
		},
	],
	versions: false,
	timestamps: true,
};

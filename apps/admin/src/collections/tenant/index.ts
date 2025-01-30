import type { CollectionConfig } from "payload";

import { tenantMedia } from "@/collections/tenant/media";
import defaultAccess from "@/utilities/defaultAccess";

const tenantAccess = {
	...defaultAccess,
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
	versions: {
		drafts: {
			autosave: {
				interval: 100, // We set this interval for optimal live preview
			},
		},
		maxPerDoc: 50,
	},
	timestamps: true,
};

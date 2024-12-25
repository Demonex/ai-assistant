import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { tenantMedia } from "@/collections/tenant/media";
import { user } from "@/collections/user";
import type { TFunction } from "@payloadcms/translations";

export const tenant: CollectionConfig = {
	slug: "tenant",
	access: defaultAccess,
	admin: {
		defaultColumns: ["title", "description", "preview"],
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "description",
			type: "text",
			localized: true,
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
};

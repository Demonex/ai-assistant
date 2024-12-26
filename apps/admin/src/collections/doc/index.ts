import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { collection } from "@/collections/collection";
import { provider } from "@/collections/provider";

export const doc: CollectionConfig = {
	slug: "doc",
	access: defaultAccess,
	admin: {
		defaultColumns: ["name", "description", "preview"],
		useAsTitle: "name",
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "collection",
			type: "relationship",
			relationTo: collection.slug as "collection",
			required: true,
		},
		{
			name: "provider",
			type: "relationship",
			relationTo: provider.slug as "provider",
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
	upload: {
		// from the imageSizes below, the admin UI will show this size for previewing
		// staticDir tell Payload where to store files to and allows them to be served
		// staticDir: path.resolve(__dirname, '../../../media'),
		// limit the types of files allowed and request validation
		mimeTypes: ["image/*"],
	},
};

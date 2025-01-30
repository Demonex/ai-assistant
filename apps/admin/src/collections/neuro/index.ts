import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { model } from "@/collections/model";

const neuroAccess = {
	...defaultAccess,
};

export const neuro: CollectionConfig = {
	slug: "neuro",
	access: neuroAccess,
	admin: {
		defaultColumns: ["title", "model", "modelSettings"],
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "model",
			type: "relationship",
			relationTo: model.slug as "model",
		},
		{
			name: "modelSettings",
			type: "json",
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

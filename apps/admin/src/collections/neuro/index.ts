import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { model } from "@/collections/model";

export const neuro: CollectionConfig = {
	slug: "neuro",
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
			name: "settings",
			type: "json",
			required: true,
		},
		{
			name: "model",
			type: "relationship",
			relationTo: model.slug as "model",
		},
		{
			name: "model-settings",
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

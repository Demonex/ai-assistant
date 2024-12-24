import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { collection } from "@/collections/collection";
import { provider } from "@/collections/provider";

export const doc: CollectionConfig = {
	slug: "doc",
	access: defaultAccess,
	admin: {
		defaultColumns: ["title", "description", "preview"],
		useAsTitle: "title",
	},
	fields: [
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
			name: "state",
			type: "select",
			options: ["created, loaded, indexed"],
			required: true,
		},
		{
			name: "file-name",
			type: "text",
			required: true,
		},
		{
			name: "mime-type",
			type: "select",
			options: ["pdf, pptx, docx"],
			required: true,
		},
		{
			name: "created",
			type: "date",
			required: true,
		},
		{
			name: "updated",
			type: "date",
			required: true,
		},
		{
			name: "meta",
			type: "json",
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

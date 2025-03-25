import type { CollectionConfig } from "payload";

import { model } from "@/collections/model";
import defaultAccess from "@/utilities/defaultAccess";
import { getNeuroAccess } from "@/access/neuro";

const neuroAccess = {
	...defaultAccess,
	...getNeuroAccess(),
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
	versions: false,
};

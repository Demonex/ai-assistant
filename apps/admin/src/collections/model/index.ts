import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { tenant } from "@/collections/tenant";
import { MODEL_TYPE } from "@/types/types";

const modelAccess = {
	...defaultAccess,
};

export const model: CollectionConfig = {
	slug: "model",
	access: modelAccess,
	admin: {
		defaultColumns: ["title", "type"],
		useAsTitle: "title",
	},
	fields: [
		{
			name: "tenant",
			type: "relationship",
			relationTo: tenant.slug as "tenant",
			required: true,
		},
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "type",
			type: "select",
			options: Object.values(MODEL_TYPE),
			required: true,
		},
	],
	versions: false,
};

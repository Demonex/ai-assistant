import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { model } from "@/collections/model";

const neuroAccess = {
	...defaultAccess,
};

export const neuro: CollectionConfig = {
	slug: "neuro",
	labels: {
		singular: "Нейросервис",
		plural: "Нейросервисы",
	},
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
			label: "Название",
		},
		{
			name: "model",
			type: "relationship",
			relationTo: model.slug as "model",
			label: "Модель",
		},
		{
			name: "modelSettings",
			type: "json",
			label: "Настройки модели",
		},
	],
	versions: false,
};

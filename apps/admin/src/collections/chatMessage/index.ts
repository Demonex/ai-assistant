import defaultAccess from "@/utilities/defaultAccess";
import type { CollectionConfig } from "payload";
import { collection } from "../collection";
import { user } from "../user";

const chatMessageAccess = {
	...defaultAccess,
};

export const chatMessage: CollectionConfig = {
	slug: "chatMessage",
	labels: {
		singular: "Сообщение",
		plural: "Сообщения",
	},
	access: chatMessageAccess,
	fields: [
		{
			name: "user",
			type: "relationship",
			relationTo: user.slug as "user",
			required: true,
			label: "Пользователь",
		},
		{
			name: "collection",
			type: "relationship",
			relationTo: collection.slug as "collection",
			required: true,
			label: "Коллекция",
		},
		{
			name: "request",
			type: "json",
			required: true,
			label: "Запрос",
		},
		{
			name: "response",
			type: "json",
			admin: {},
			label: "Ответ",
		},
	],
	versions: false,
};

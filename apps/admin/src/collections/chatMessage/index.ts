import defaultAccess from "@/utilities/defaultAccess";
import type { CollectionConfig } from "payload";
import { collection } from "../collection";
import { user } from "../user";

export const chatMessage: CollectionConfig = {
	slug: "chatMessage",
	access: defaultAccess,
	fields: [
		{
			name: "user",
			type: "relationship",
			relationTo: user.slug as "user",
			required: true,
		},
		{
			name: "collection",
			type: "relationship",
			relationTo: collection.slug as "collection",
			required: true,
		},
		{
			name: "message",
			type: "json",
			required: true,
		},
		{
			name: "response",
			type: "json",
			admin: {},
		},
		{
			name: "createdAt",
			type: "date",
			required: true,
		},
	],
	versions: false,
};

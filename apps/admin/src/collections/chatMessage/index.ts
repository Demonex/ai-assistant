import defaultAccess from "@/utilities/defaultAccess";
import type { CollectionConfig } from "payload";
import { collection } from "../collection";
import { user } from "../user";
import { getChatMessageAccess } from "@/access/chatMessage";

const chatMessageAccess = {
	...defaultAccess,
	...getChatMessageAccess(),
};

export const chatMessage: CollectionConfig = {
	slug: "chatMessage",
	access: chatMessageAccess,
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
			name: "request",
			type: "json",
			required: true,
		},
		{
			name: "response",
			type: "json",
			admin: {},
		},
	],
	versions: false,
};

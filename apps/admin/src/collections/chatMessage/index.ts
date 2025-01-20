import type { CollectionConfig } from "payload";
import defaultAccess from "@/utilities/defaultAccess";
import { neuro } from "@/collections/neuro";
import { MODEL_TYPE } from "../model";
import { provider } from "../provider";
import { user } from "../user";
import { collection } from "../collection";

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
			name: "fromBot",
			type: "checkbox",
			required: true,
			admin: {
				hidden: true,
			},
		},
		{
			name: "createdAt",
			type: "date",
			required: true,
		},
	],
	versions: false,
};

import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { tenant } from "@/collections/tenant";
import { user } from "@/collections/user";
import { collection } from "../collection";

export enum GROUP_PERMISSIONS {
	admin = "admin",
	collection = "collection",
	model = "model",
	group = "group",
}

export enum COLLECTION_PERMISSIONS {
	read = "r",
	read_write = "rw",
	read_write_delete = "rwd",
}

export const group: CollectionConfig = {
	slug: "group",
	access: defaultAccess,
	admin: {
		defaultColumns: ["title", "description", "preview"],
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
			name: "users",
			type: "relationship",
			hasMany: true,
			relationTo: user.slug as "user",
			required: true,
		},
		{
			name: "groupPermissions",
			type: "select",
			options: Object.values(GROUP_PERMISSIONS),
			hasMany: true,
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
			name: "collectionPermissions", // required
			type: "array", // required
			label: "Collection permissions",
			interfaceName: "title",
			labels: {
				singular: "collection-permission",
				plural: "Collection Permissions",
			},
			fields: [
				{
					name: "collection",
					type: "relationship",
					relationTo: collection.slug as "collection",
					required: true,
				},
				{
					name: "permissions",
					type: "select",
					options: Object.values(COLLECTION_PERMISSIONS).map((value) => ({
						label: (() => {
							switch (value) {
								case COLLECTION_PERMISSIONS.read: {
									return "use";
								}
								case COLLECTION_PERMISSIONS.read_write: {
									return "use & add";
								}
								case COLLECTION_PERMISSIONS.read_write_delete: {
									return "use & add & delete";
								}
							}
						})(),
						value,
					})),
					required: true,
				},
			],
			admin: {
				components: {
					RowLabel: "@/components/ArrayRowLabel/index#ArrayRowLabel",
				},
			},
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

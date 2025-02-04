import type { CollectionConfig } from "payload";

import defaultAccess from "@/utilities/defaultAccess";
import { tenant } from "@/collections/tenant";
import { user } from "@/collections/user";
import { collection } from "../collection";
import { COLLECTION_PERMISSIONS, GROUP_PERMISSIONS } from "@/types/types";

const groupAccess = {
	...defaultAccess,
	read: ({ req: { user } }) => {
		return {};
	},
};

export const group: CollectionConfig = {
	slug: "group",
	// access: groupAccess,
	admin: {
		defaultColumns: ["title", "users", "groupPermissions"],
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
			name: "admins",
			type: "relationship",
			relationTo: user.slug as "user",
			hasMany: true,
		},
		{
			name: "users",
			type: "relationship",
			relationTo: user.slug as "user",
			hasMany: true,
		},
		{
			name: "groupPermissions",
			type: "select",
			options: Object.values(GROUP_PERMISSIONS),
			hasMany: true,
			required: true,
		},
		{
			name: "collectionPermissions",
			type: "array",
			label: "Permissions for specific collections",
			labels: {
				singular: "permissions for collection",
				plural: "permissions for collections",
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

import type { CollectionConfig } from "payload";

import { getGroupAccess } from "@/access/group";
import { tenant } from "@/collections/tenant";
import { user } from "@/collections/user";
import { COLLECTION_PERMISSIONS, GROUP_PERMISSIONS } from "@/types/types";
import defaultAccess from "@/utilities/defaultAccess";

import { collection } from "../collection";

const groupAccess = {
	...defaultAccess,
	...getGroupAccess(),
};

export const group: CollectionConfig = {
	slug: "group",
	access: groupAccess,
	labels: {
		singular: "Группа",
		plural: "Группы",
	},
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
			label: "Тенант",
		},
		{
			name: "title",
			type: "text",
			required: true,
			label: "Название",
		},
		{
			name: "admins",
			type: "relationship",
			relationTo: user.slug as "user",
			hasMany: true,
			label: "Админы группы",
		},
		{
			name: "users",
			type: "relationship",
			relationTo: user.slug as "user",
			hasMany: true,
			label: "Пользователи группы",
		},
		{
			name: "groupPermissions",
			type: "select",
			options: Object.values(GROUP_PERMISSIONS),
			hasMany: true,
			required: true,
			label: "Разрешения группы",
		},
		{
			name: "collectionPermissions",
			type: "array",
			label: "Разрешения для конкретных коллекций",
			labels: {
				singular: "Разрешения для коллекции",
				plural: "Разрешения для коллекций",
			},
			fields: [
				{
					name: "collection",
					type: "relationship",
					relationTo: collection.slug as "collection",
					required: true,
					label: "Коллекция",
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
					label: "Разрешения",
				},
			],
			admin: {
				components: {
					RowLabel: "@/components/ArrayRowLabel/index#ArrayRowLabel",
				},
			},
		},
	],
	versions: false,
};

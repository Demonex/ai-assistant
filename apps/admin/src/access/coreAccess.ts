import config from "@payload-config";
import { parse } from "cookie";
import { getPayload } from "payload";

import type { User } from "@/payload-types";
import { GROUP_PERMISSIONS } from "@/types/types";

export const getUserContext = async ({ req }) => {
	const payload = await getPayload({
		config,
	});

	if (req.userContext) {
		return { user: req.userContext };
	}

	const user = await payload.findByID({
		collection: "user",
		id: req.user?.id,
		select: {
			superadmin: true,
		},
	});
	req.userContext = user;

	return { user };
};

export const getUserGroups = async ({ req }) => {
	const payload = await getPayload({
		config,
	});

	if (req.userGroups) {
		return { groups: req.userGroups };
	}

	const { user } = await getUserContext({ req });

	// const tenant = parse(req.headers.get("cookie") || "")?.tenant;
	// const defaultAccess = {
	// 	tenant: {
	// 		equals: tenant,
	// 	},
	// };

	const groups = await payload.find({
		collection: "group",
		where: {
			// tenant: {
			// 	equals: tenant,
			// },
			or: [
				{
					admins: {
						contains: user.id,
					},
				},
				{
					users: {
						contains: user.id,
					},
				},
			],
		},
		select: {
			groupPermissions: true,
			collectionPermissions: true,
			tenant: true,
		},
	});

	return { groups };
};

export const checkPermissions =
	(
		perm: GROUP_PERMISSIONS,
		{ groupAdminValidation }: { groupAdminValidation?: true } = {},
	) =>
	async ({ req }) => {
		const payload = await getPayload({
			config,
		});
		const user = await payload.findByID({
			collection: "user",
			id: req.user?.id,
			select: {
				superadmin: true,
				currentTenant: true,
			},
		});

		if (user.superadmin) {
			return true;
		}

		const tenant = parse(req.headers.get("cookie") || "")?.tenant;

		const groups = await payload.find({
			collection: "group",
			where: {
				tenant: {
					equals: tenant,
				},
				or: [
					{
						admins: {
							contains: user.id,
						},
					},
					{
						users: {
							contains: user.id,
						},
					},
				],
			},
			select: {
				groupPermissions: true,
				admins: groupAdminValidation,
			},
		});

		const access = groups.docs.some(
			(doc) =>
				doc.groupPermissions.includes(perm) ||
				doc.groupPermissions.includes(GROUP_PERMISSIONS.admin),
		);
		if (!access) {
			return false;
		}

		if (groupAdminValidation) {
			const res = groups.docs.some((doc) =>
				doc.admins?.some((admin: User) => admin.id === user.id),
			);
			return res;
		}

		return access;
	};

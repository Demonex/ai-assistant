import type { Tenant, User } from "@/payload-types";
import { GROUP_PERMISSIONS } from "@/types/types";
import config from "@payload-config";
import { getPayload } from "payload";

export const isSuperAdmin = async ({ req }) => {
	const payload = await getPayload({
		config,
	});

	const user = await payload.findByID({
		collection: "user",
		id: req.user.id,
		select: {
			superadmin: true,
		},
	});

	if (!user?.superadmin) {
		return { result: false };
	}

	return { result: true, user, payload };
	//   return true;
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
			id: req.user.id,
			select: {
				superadmin: true,
				currentTenant: true,
			},
		});

		if (user.superadmin) {
			return true;
		}

		const groups = await payload.find({
			collection: "group",
			where: {
				tenant: {
					equals: req.headers.get("x-tenant"),
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

export const isAuthorized = ({ req: { user } }) => {
	return !!user;
};

const defaultAccess = {
	admin: isAuthorized,
	create: isSuperAdmin,
	read: isSuperAdmin,
	update: isSuperAdmin,
	delete: isSuperAdmin,
};
export default defaultAccess;

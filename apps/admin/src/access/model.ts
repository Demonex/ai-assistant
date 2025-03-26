import { GROUP_PERMISSIONS } from "@/types/types";
import { parse } from "cookie";
import { getUserContext, getUserGroups } from "./coreAccess";

export const getModelAccess = () => {
	const create = async ({ req }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		const { groups } = await getUserGroups({ req });

		const hasAccess = groups.docs.some(
			(doc) =>
				doc.groupPermissions.includes(GROUP_PERMISSIONS.admin) ||
				doc.groupPermissions.includes(GROUP_PERMISSIONS.model),
		);

		return hasAccess;
	};

	const read = async ({ req }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		const { groups } = await getUserGroups({ req });

		const hasAccess = groups.docs.some(
			(doc) =>
				doc.groupPermissions.includes(GROUP_PERMISSIONS.admin) ||
				doc.groupPermissions.includes(GROUP_PERMISSIONS.model),
		);

		return hasAccess;
	};

	const update = async ({ req }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		const { groups } = await getUserGroups({ req });

		const hasAccess = groups.docs.some(
			(doc) =>
				doc.groupPermissions.includes(GROUP_PERMISSIONS.admin) ||
				doc.groupPermissions.includes(GROUP_PERMISSIONS.model),
		);

		return hasAccess;
	};

	const _delete = async ({ req }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		const { groups } = await getUserGroups({ req });

		const hasAccess = groups.docs.some(
			(doc) =>
				doc.groupPermissions.includes(GROUP_PERMISSIONS.admin) ||
				doc.groupPermissions.includes(GROUP_PERMISSIONS.model),
		);

		return hasAccess;
	};

	return {
		create,
		read,
		update,
		delete: _delete,
	};
};

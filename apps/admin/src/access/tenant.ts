import { parse } from "cookie";
import type { Access } from "payload";

import { GROUP_PERMISSIONS } from "@/types/types";

import { getUserContext, getUserGroups } from "./coreAccess";

export const getTenantAccess = () => {
	const create = async ({ req }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		return false;
	};

	const read: Access = async ({ req }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		const { groups } = await getUserGroups({ req });

		const tenants = groups.docs.map((doc) => doc.tenant.id);

		if (!tenants.length) {
			return false;
		}

		return {
			id: {
				in: tenants,
			},
		};
	};

	const update: Access = async ({ req }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		const { groups } = await getUserGroups({ req });

		const tenants = groups.docs.reduce((acc, doc) => {
			if (doc.groupPermissions.includes(GROUP_PERMISSIONS.admin)) {
				acc.push(doc.tenant.id);
			}
			return acc;
		}, []);

		if (!tenants.length) {
			return false;
		}

		return {
			id: {
				in: tenants,
			},
		};
	};

	const _delete = async ({ req }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		return false;
	};

	return {
		create,
		read,
		update,
		delete: _delete,
	};
};

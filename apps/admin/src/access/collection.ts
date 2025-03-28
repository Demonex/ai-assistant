import { parse } from "cookie";
import type { FieldAccess } from "payload";

import { GROUP_PERMISSIONS } from "@/types/types";

import { getUserContext, getUserGroups } from "./coreAccess";

export const getCollectionAccess = () => {
	const create = async ({ req }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		const { groups } = await getUserGroups({ req });

		const hasAccess = groups.docs.some(
			(doc) =>
				doc.groupPermissions.includes(GROUP_PERMISSIONS.admin) ||
				doc.groupPermissions.includes(GROUP_PERMISSIONS.collection),
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
				doc.groupPermissions.includes(GROUP_PERMISSIONS.collection),
		);

		if (hasAccess) {
			return true;
		}

		const collections = groups.docs.flatMap((doc) => {
			return doc.collectionPermissions?.map((perm) => {
				// console.log(perm, perm.collection);

				return perm.collection.id;
			});
		});

		if (!collections.length) {
			return false;
		}

		return {
			id: {
				in: collections,
			},
		};
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
				doc.groupPermissions.includes(GROUP_PERMISSIONS.collection),
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
				doc.groupPermissions.includes(GROUP_PERMISSIONS.collection),
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

export const getDropDownAccess = () => {
	const read: FieldAccess = async ({ req, id, doc, siblingData }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		const { groups } = await getUserGroups({ req });

		const hasAccess = groups.docs.some(
			(doc) =>
				doc.groupPermissions.includes(GROUP_PERMISSIONS.admin) ||
				doc.groupPermissions.includes(GROUP_PERMISSIONS.collection),
		);

		if (hasAccess) {
			return true;
		}

		const access = groups.docs.some((group) => {
			return group.collectionPermissions?.some((perm) => {
				// console.log(perm, perm.collection);

				return perm.collection.id === doc?.id && perm.permissions.includes("w");
			});
		});

		// console.log(collections, id, doc, collections.includes(Number(id)), "CHECK");

		return access;
	};

	const update: FieldAccess = async ({ req, id, data, doc, siblingData }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		const { groups } = await getUserGroups({ req });

		const hasAccess = groups.docs.some(
			(doc) =>
				doc.groupPermissions.includes(GROUP_PERMISSIONS.admin) ||
				doc.groupPermissions.includes(GROUP_PERMISSIONS.collection),
		);

		if (hasAccess) {
			return true;
		}

		const access = groups.docs.some((group) => {
			return group.collectionPermissions?.some((perm) => {
				// console.log(perm, perm.collection);

				return perm.collection.id === doc?.id && perm.permissions.includes("w");
			});
		});

		// console.log(collections, id, doc, collections.includes(Number(id)), "CHECK");

		return access;
	};

	return {
		read,
		update,
	};
};

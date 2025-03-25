import type { Access, FieldAccess } from "payload";
import { getUserContext } from "./coreAccess";

export const getUserAccess = () => {
	const create: Access = async ({ req }) => {
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

		return {
			id: {
				equals: user.id,
			},
		};
	};

	const update: Access = async ({ req }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		return {
			id: {
				equals: user.id,
			},
		};
	};

	const _delete: Access = async ({ req }) => {
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

export const getEmailAccess = () => {
	const read: FieldAccess = async ({ req, id, doc, siblingData }) => {
		return true;
	};

	const update: FieldAccess = async ({ req, id, data, doc, siblingData }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		return false;
	};

	return {
		read,
		update,
	};
};

export const getSuperadminAccess = () => {
	const read: FieldAccess = async ({ req, id, doc, siblingData }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		return false;
	};

	const update: FieldAccess = async ({ req, id, data, doc, siblingData }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		return false;
	};

	return {
		read,
		update,
	};
};

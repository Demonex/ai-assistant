import type { Access } from "payload";
import { getUserContext } from "./coreAccess";
import { isAuthorized } from "@/utilities/defaultAccess";

export const getChatMessageAccess = () => {
	const create: Access = async ({ req }) => {
		return false;
	};

	const read = async ({ req }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		return {
			user: {
				equals: user.id,
			},
		};
	};

	const update = async ({ req }) => {
		const { user } = await getUserContext({ req });

		if (user?.superadmin) {
			return true;
		}

		return false;
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

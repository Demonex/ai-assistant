import { isSuperAdmin } from "@/utilities/defaultAccess";

export const getCollectionAccess = async ({ req }) => {
	const { result, user, payload } = await isSuperAdmin({ req });

	const create = () => {};

	const read = () => {};

	const update = () => {};

	const _delete = () => {};

	return {
		create,
		read,
		update,
		delete: _delete,
	};
};

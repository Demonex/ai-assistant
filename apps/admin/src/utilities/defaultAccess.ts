import config from "@payload-config";
import { getPayload } from "payload";

export const isSuperAdmin = async ({ req: { user } }) => {
	// const payload = await getPayload({
	// 	config,
	// })
	// const result = await payload.findByID({
	// 	collection: 'user',
	// 	id: user.id,
	// 	depth: 1
	// })

	return user?.superadmin ?? false;
	// return result.superadmin ?? false
};

export const isAuthentificated = ({ req: { user } }) => {
	return !!user;
};
const defaultAccess = {
	admin: isAuthentificated,
	create: isSuperAdmin,
	read: isSuperAdmin,
	update: isSuperAdmin,
	delete: isSuperAdmin,
};
export default defaultAccess;

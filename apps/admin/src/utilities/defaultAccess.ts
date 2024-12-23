const isAdmin = ({ req: { user } }) => {
	return user?.roles?.includes?.("admin") ?? false;
};
const defaultAccess = {
	admin: isAdmin,
	create: isAdmin,
	read: () => true,
	update: isAdmin,
	delete: isAdmin,
};
export default defaultAccess;

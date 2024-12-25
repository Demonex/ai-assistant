const isAdmin = ({ req: { user } }) => {
	return user?.superadmin ?? false;
};
const defaultAccess = {
	admin: isAdmin,
	create: isAdmin,
	read: () => true,
	update: isAdmin,
	delete: isAdmin,
};
export default defaultAccess;

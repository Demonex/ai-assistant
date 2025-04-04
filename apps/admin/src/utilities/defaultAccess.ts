export const isAuthorized = ({ req }) => {
	return !!req.user;
};

const defaultAccess = {
	admin: isAuthorized,
};
export default defaultAccess;

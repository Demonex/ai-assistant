import { useCallback, useMemo, useState } from "react";
import { useBetween } from "use-between";

const _useProfile = () => {
	const [token, _setToken] = useState(localStorage.getItem("token"));
	const [profile, setProfile] = useState<{
		id: number;
		email: string;
	}>(JSON.parse(localStorage.getItem("user")));

	const isAuthorized = useMemo(() => {
		return Boolean(profile);
	}, [profile]);

	const handleSignOut = useCallback(() => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		_setToken(undefined);
		setProfile(undefined);
	}, []);

	return {
		isAuthorized,
		profile,
		handleSignOut,
	};
};

export const useProfile = () =>
	useBetween<ReturnType<typeof _useProfile>>(_useProfile);

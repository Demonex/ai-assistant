import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetch, createMonoHook, useLazyFetch } from "use-mono-hook";
import { BACKEND_URL } from "@repo/web/constants/index.js";

const _useProfile = () => {
	const {
		data,
		error: errorProfile,
		loading,
	} = useFetch({
		url: `${BACKEND_URL}/profile`,
		params: {
			formatForAdmin: false,
		},
	});

	const [
		{ data: dataSignIn, error: errorSignIn, loading: loadingSignIn },
		fetchSignIn,
	] = useLazyFetch({
		url: `${BACKEND_URL}/auth/email/sign-in`,
		method: "post",
		cache: false,
	});

	const [
		{ data: dataSignOut, error: errorSignOut, loading: loadingSignOut },
		fetchSignOut,
	] = useLazyFetch({
		url: `${BACKEND_URL}/auth/sign-out`,
		method: "post",
		cache: false,
	});

	const [profile, setProfile] = useState(() => {
		const savedProfile = sessionStorage.getItem("profile");
		return savedProfile ? JSON.parse(savedProfile) : null;
		// return { id: "ads", email: "bla@bla.ru" };
	});

	const isAuthorized = useMemo(() => !!profile, [profile]);

	useEffect(() => {
		if (!data) {
			return;
		}
		setProfile(data);
		// setProfile({ id: "ads", email: "bla@bla.ru" });
		sessionStorage.setItem("profile", JSON.stringify(data));
	}, [data]);

	useEffect(() => {
		if (!dataSignIn) {
			return;
		}
		setProfile(dataSignIn);
		// setProfile({ id: "ads", email: "bla@bla.ru" });
		sessionStorage.setItem("profile", JSON.stringify(dataSignIn));
	}, [dataSignIn]);

	const handleSignOut = useCallback(async () => {
		await fetchSignOut({
			url: `${BACKEND_URL}/auth/sign-out`,
			data: data || dataSignIn,
		});
		setProfile(null);
		sessionStorage.removeItem("profile");
	}, []);

	const handleSignIn = useCallback(
		async (data: { email: string; password: string }) => {
			await fetchSignIn({ data });
		},
		[],
	);

	useEffect(() => {
		if (!errorProfile && profile) {
			return;
		}

		setProfile(null);
		sessionStorage.removeItem("profile");
	}, [errorProfile, profile]);

	return {
		isAuthorized,
		profile,
		handleSignOut,
		handleSignIn,
		errorSignIn,
		errorSignOut,
		errorProfile,
		loading,
	};
};

export const useProfile =
	createMonoHook<typeof _useProfile>(_useProfile).useHook;

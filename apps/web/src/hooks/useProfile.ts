import { useEffect, useMemo, useState } from "react";

import { createMonoHook, useFetch, useLazyFetch } from "use-mono-hook";

const _useProfile = () => {
	const {
		data,
		error: errorProfile,
		loading,
	} = useFetch({
		url: `api/rest/profile`,
		params: {
			formatForAdmin: false,
		},
	});

	const [
		{ data: dataSignIn, error: errorSignIn, loading: _loadingSignIn },
		fetchSignIn,
	] = useLazyFetch({
		url: `api/rest/auth/email/sign-in`,
		method: "post",
		cache: false,
	});

	const [
		{ data: _dataSignOut, error: errorSignOut, loading: _loadingSignOut },
		fetchSignOut,
	] = useLazyFetch({
		url: `api/rest/auth/sign-out`,
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

	const handleSignOut = async () => {
		await fetchSignOut({
			url: `api/rest/auth/sign-out`,
			data: data || dataSignIn,
		});
		setProfile(null);
		sessionStorage.removeItem("profile");
	};

	const handleSignIn = async (data: { email: string; password: string }) => {
		await fetchSignIn({
			url: `api/rest/auth/email/sign-in`,
			data,
		});
	};

	// useEffect(() => {
	// 	if (!errorProfile && profile) {
	// 		return;
	// 	}

	// 	setProfile(null);
	// 	sessionStorage.removeItem("profile");
	// }, [errorProfile, profile]);

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

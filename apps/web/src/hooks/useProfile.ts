import { useEffect, useState } from "react";

import { createMonoHook, useFetch, useLazyFetch } from "use-mono-hook";

const _useProfile = () => {
	const {
		data,
		error: errorProfile,
		loading,
	} = useFetch({
		url: `api/v1/profile`,
		// params: {
		// 	formatForAdmin: false,
		// },
	});

	const [profile, setProfile] = useState(null);

	useEffect(() => {
		if (data) {
			setProfile(data);
		}
	}, [data]);

	// fetchSignIn

	const [
		{ data: dataSignIn, error: errorSignIn, loading: _loadingSignIn },
		fetchSignIn,
	] = useLazyFetch({
		url: `api/v1/auth/email/sign-in`,
		method: "post",
		cache: false,
	});

	const handleSignIn = async (data: { email: string; password: string }) => {
		await fetchSignIn({
			url: `api/v1/auth/email/sign-in`,
			data,
		});
	};

	useEffect(() => {
		if (dataSignIn) {
			setProfile(dataSignIn);
		}
	}, [dataSignIn]);

	// fetchSignOut

	const [
		{ data: _dataSignOut, error: errorSignOut, loading: _loadingSignOut },
		fetchSignOut,
	] = useLazyFetch({
		url: `api/v1/auth/user/sign-out`,
		method: "post",
		cache: false,
	});

	const handleSignOut = async () => {
		await fetchSignOut({
			url: `api/v1/auth/user/sign-out`,
			data: data || dataSignIn,
		});
		setProfile(null);
	};

	return {
		isAuthorized: !!profile,
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

import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetch, createMonoHook, useLazyFetch } from "use-mono-hook";

const _useProfile = () => {
	const { data, error, loading } = useFetch({
		url: `${import.meta.env.VITE_BACKEND_URL}/profile`,
		cache: false,
	});

	const requestSignIn = useLazyFetch({
		url: `${import.meta.env.VITE_BACKEND_URL}/auth/email/sign-in`,
		method: "post",
		cache: false,
	});

	const [
		{ data: dataSignIn, error: errorSignIn, loading: loadingSignIn },
		fetchSignIn,
	] = requestSignIn;

	const [
		{ data: dataSignOut, error: errorSignOut, loading: loadingSignOut },
		fetchSignOut,
	] = useLazyFetch({
		url: `${import.meta.env.VITE_BACKEND_URL}/auth/sign-out`,
		method: "post",
		cache: false,
	});

	// const [profile, setProfile] = useState(null);
	const [profile, setProfile] = useState(() => {
		const savedProfile = localStorage.getItem("profile");
		return savedProfile ? JSON.parse(savedProfile) : null;
	});

	const isAuthorized = useMemo(() => !!profile, [profile]);

	// useEffect(() => {
	// 	if (!data) {
	// 		return;
	// 	}
	// 	setProfile(data);
	// }, [data]);

	// useEffect(() => {
	// 	if (!dataSignIn) {
	// 		return;
	// 	}
	// 	setProfile(dataSignIn);
	// }, [dataSignIn]);
	useEffect(() => {
		if (data || dataSignIn) {
			setProfile(data || dataSignIn);
			localStorage.setItem("profile", JSON.stringify(data || dataSignIn));
		}
	}, [data, dataSignIn]);

	// const handleSignOut = useCallback(async () => {
	// 	await fetchSignOut({
	// 		url: `${import.meta.env.VITE_BACKEND_URL}/auth/sign-out`,
	// 		data: data,
	// 	});
	// 	setProfile(null);
	// }, []);
	const handleSignOut = useCallback(async () => {
		await fetchSignOut({
			url: `${import.meta.env.VITE_BACKEND_URL}/auth/sign-out`,
			data: data,
		});
		setProfile(null);
		localStorage.removeItem("profile");
	}, []);

	const handleSignIn = useCallback(
		async (data: { email: string; password: string }) => {
			await fetchSignIn({ data });
		},
		[],
	);

	console.log({
		isAuthorized,
		profile,
		handleSignOut,
		handleSignIn,
		loading,
	});
	return {
		isAuthorized,
		profile,
		handleSignOut,
		handleSignIn,
		loading,
	};
};

export const useProfile =
	createMonoHook<typeof _useProfile>(_useProfile).useHook;

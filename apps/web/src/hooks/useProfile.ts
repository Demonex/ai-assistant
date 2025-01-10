import { useCallback, useEffect, useMemo, useState } from "react";
import { useBetween, clear } from "use-between";
import useFetch, { useLazyFetch } from "./useFetch.js";

const _useProfile = () => {
	const { data, error, loading } = useFetch({
		url: `${import.meta.env.VITE_BACKEND_URL}/profile`,
		cache: false,
	});

	const [
		{ data: dataSignIn, error: errorSignIn, loading: loadingSignIn },
		fetchSignIn,
	] = useLazyFetch({
		url: `${import.meta.env.VITE_BACKEND_URL}/auth/email/sign-in`,
		method: "post",
		cache: false,
	});

	const [
		{ data: dataSignOut, error: errorSignOut, loading: loadingSignOut },
		fetchSignOut,
	] = useLazyFetch({
		url: `${import.meta.env.VITE_BACKEND_URL}/auth/sign-out`,
		method: "post",
		cache: false,
	});

	const [profile, setProfile] = useState(null);

	const isAuthorized = useMemo(() => {
		return Boolean(profile);
	}, [profile]);

	useEffect(() => {
		if (!data) {
			return;
		}
		setProfile(data);
	}, [data]);

	useEffect(() => {
		if (!dataSignIn) {
			return;
		}
		setProfile(dataSignIn);
	}, [dataSignIn]);

	const handleSignOut = useCallback(async () => {
		await fetchSignOut({
			url: `${import.meta.env.VITE_BACKEND_URL}/auth/sign-out`,
			data: data,
		});
		setProfile(null);
	}, []);

	const handleSignIn = useCallback(
		async (data: { email: string; password: string }) => {
			await fetchSignIn({
				data: data,
			});
		},
		[],
	);
	return {
		isAuthorized,
		profile,
		handleSignOut,
		handleSignIn,
		loading,
	};
};

export const useProfile = () =>
	useBetween<ReturnType<typeof _useProfile>>(_useProfile);

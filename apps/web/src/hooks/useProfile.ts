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

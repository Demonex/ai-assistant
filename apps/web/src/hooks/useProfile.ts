import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfile = () => {
	const queryClient = useQueryClient();

	const {
		data: dataProfile,
		isLoading: isLoadingProfile,
		error: errorProfile,
		isFetching: isFetchingProfile,
	} = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const data = await fetch("api/v1/profile");
			return await data.json();
		},
	});

	// const {
	// 	data: dataWiki,
	// 	error: errorWiki,
	// 	loading: loadingWiki,
	// } = useFetch({
	// 	url: `http://localhost:2050/wiki/tree`,
	// });

	// console.log({ dataWiki, errorWiki, loadingWiki });

	// fetchSignIn

	const { error: errorSignIn, mutate: handleSignIn } = useMutation({
		mutationFn: async (data: { email: string; password: string }) => {
			return await fetch("api/v1/auth/email/sign-in", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
	});

	// fetchSignOut

	const { error: errorSignOut, mutate: handleSignOut } = useMutation({
		mutationFn: async () => {
			const response = await fetch("api/v1/auth/user/sign-out", {
				method: "POST",
				body: JSON.stringify(dataProfile),
			});
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
	});

	return {
		isAuthorized: !!dataProfile?.email,
		dataProfile,
		handleSignOut,
		handleSignIn,
		errorSignIn,
		errorSignOut,
		errorProfile,
		isLoadingProfile,
		isFetchingProfile,
	};
};

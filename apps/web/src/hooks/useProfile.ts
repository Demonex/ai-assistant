import { ApiError, Profile, SignInData } from "@/types/types.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfile = () => {
	const queryClient = useQueryClient();

	const {
		data: dataProfile,
		isLoading: isLoadingProfile,
		error: errorProfile,
		isFetching: isFetchingProfile,
	} = useQuery<ResponseType, ApiError, Profile>({
		queryKey: ["profile"],
		queryFn: async () => {
			const response = await fetch("api/v1/profile");

			if (!response.ok) {
				const errorData = await response.json();
				throw errorData;
			}

			return await response.json();
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

	const {
		error: errorSignIn,
		mutate: handleSignIn,
		isPending: pendingSignIn,
	} = useMutation<ResponseType, ApiError, SignInData>({
		mutationFn: async (data: { email: string; password: string }) => {
			const response = await fetch("api/v1/auth/email/sign-in", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw errorData;
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
	});

	// fetchSignOut

	const { error: errorSignOut, mutate: handleSignOut } = useMutation<
		ResponseType,
		ApiError,
		Profile
	>({
		mutationFn: async () => {
			const response = await fetch("api/v1/auth/user/sign-out", {
				method: "POST",
				body: JSON.stringify(dataProfile),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw errorData;
			}

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
		pendingSignIn,
		errorSignIn,
		errorSignOut,
		errorProfile,
		isLoadingProfile,
		isFetchingProfile,
	};
};

import { ApiError, Profile, SignInData } from "@/types/types.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfile = () => {
	const queryClient = useQueryClient();

	// profile
	const {
		data: dataProfile,
		isLoading: isLoadingProfile,
		error: errorProfile,
		isFetching: isFetchingProfile,
		refetch: refetchProfile,
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
		staleTime: 5 * 60 * 1000,
	});

	// sign-in
	const {
		error: errorSignIn,
		mutate: handleSignIn,
		isPending: pendingSignIn,
	} = useMutation<ResponseType, ApiError, SignInData>({
		mutationFn: async ({ email, password }) => {
			const response = await fetch("api/v1/auth/email/sign-in", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
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

	// sign-out
	const { mutate: handleSignOut, error: errorSignOut } = useMutation<
		ResponseType,
		ApiError,
		void
	>({
		mutationFn: async () => {
			const response = await fetch("api/v1/auth/user/sign-out", {
				method: "POST",
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw errorData;
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: ["profile"] });
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
	});

	return {
		dataProfile,
		isLoadingProfile,
		isFetchingProfile,
		errorProfile,
		refetchProfile,
		handleSignIn,
		pendingSignIn,
		errorSignIn,
		handleSignOut,
		errorSignOut,
	};
};

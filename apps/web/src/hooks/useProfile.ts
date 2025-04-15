import { getProfile, signIn, signOut } from "@/api/profile.js";
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
		retry: false,
		queryKey: ["profile"],
		staleTime: 5 * 60 * 1000,
		queryFn: getProfile,
	});

	// sign-in
	const {
		error: errorSignIn,
		mutate: handleSignIn,
		isPending: pendingSignIn,
	} = useMutation<ResponseType, ApiError, SignInData>({
		mutationFn: signIn,
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
		mutationFn: signOut,
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

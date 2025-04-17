import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCollection = () => {
	const queryClient = useQueryClient();

	const { mutate: handleCreateCollection } = useMutation({
		mutationFn: async (data) => {
			const response = await fetch("/api/v1/collections", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw errorData;
			}

			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["collections"] });
		},
	});

	return { handleCreateCollection };
};

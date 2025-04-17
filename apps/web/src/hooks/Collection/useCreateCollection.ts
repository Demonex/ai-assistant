import { createCollection } from "@/api/collection.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCollection = () => {
	const queryClient = useQueryClient();

	const { mutate: handleCreateCollection } = useMutation({
		mutationFn: createCollection,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["collections"] });
		},
	});

	return { handleCreateCollection };
};

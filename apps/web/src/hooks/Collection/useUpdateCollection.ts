import { updateCollection } from "@/api/collection.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCollection = (id: number) => {
	const queryClient = useQueryClient();

	const { mutate: handleUpdateCollection } = useMutation({
		mutationFn: (data) => updateCollection(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["collections"] });
		},
	});

	return { handleUpdateCollection };
};

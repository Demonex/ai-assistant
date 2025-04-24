import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createModel } from "@/api/model.js";

export const useCreateModel = () => {
	const queryClient = useQueryClient();

	const { mutate: handleCreateModel } = useMutation({
		mutationFn: createModel,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["neuro"] });
		},
	});

	return { handleCreateModel };
};

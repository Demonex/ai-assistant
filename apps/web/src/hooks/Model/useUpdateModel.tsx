import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateModel } from "@/api/model.js";
import { ModelRequestType } from "@/types/types.js";

export const useUpdateModel = (id: number) => {
	const queryClient = useQueryClient();

	const { mutate: handleUpdateModel } = useMutation({
		mutationFn: (data: ModelRequestType) => updateModel(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["model"] });
		},
	});

	return { handleUpdateModel };
};

import { updateNeuro } from "@/api/neuro.js";
import { NeuroRequestType } from "@/types/types.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateNeuro = (id: number) => {
	const queryClient = useQueryClient();

	const { mutate: handleUpdateNeuro } = useMutation({
		mutationFn: (data: NeuroRequestType) => updateNeuro(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["neuro"] });
		},
	});

	return { handleUpdateNeuro };
};

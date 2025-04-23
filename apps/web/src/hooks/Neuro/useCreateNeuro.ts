import { createNeuro } from "@/api/neuro.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateNeuro = () => {
	const queryClient = useQueryClient();

	const { mutate: handleCreateNeuro } = useMutation({
		mutationFn: createNeuro,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["neuro"] });
		},
	});

	return { handleCreateNeuro };
};

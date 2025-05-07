import { uploadTranscriptionDocs } from "@/api/transcription.js";
import { ApiError } from "@/types/types.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTranscription = () => {
	const queryClient = useQueryClient();

	const {
		error: errorTranscription,
		mutate: handleTranscriptionDocs,
		isPending: pendingTranscription,
	} = useMutation<ResponseType, ApiError, FormData>({
		mutationFn: uploadTranscriptionDocs,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["transcription"] });
		},
	});

	const clearTranscriptionCache = () => {
		queryClient.removeQueries({
			queryKey: ["transcription"],
			exact: true,
		});
	};

	return {
		errorTranscription,
		handleTranscriptionDocs,
		pendingTranscription,
		clearTranscriptionCache,
	};
};

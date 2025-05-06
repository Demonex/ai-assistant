import { getWikiTree, uploadWikiDocs, removeWikiDocs } from "@/api/wiki.js";
import { ApiError, WikiTreeType } from "@/types/types.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useWiki = (collectionId: number) => {
	const queryClient = useQueryClient();

	const {
		data: dataWiki,
		error: errorWiki,
		isLoading: loadingWiki,
		refetch: refetchWikiTree,
	} = useQuery<ResponseType, ApiError, WikiTreeType[]>({
		queryKey: ["wikiTree"],
		queryFn: () => getWikiTree(collectionId),
		retry: false,
	});

	// upload wiki docs

	const {
		error: errorUploadWikiDocs,
		mutate: handleUploadWikiDocs,
		isPending: pendingUploadWikiDocs,
	} = useMutation<ResponseType, ApiError, number[]>({
		mutationFn: (ids) => uploadWikiDocs(collectionId, ids),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wikiUpload"] });
		},
	});

	const {
		error: errorRemoveWikiDocs,
		mutate: handleRemoveWikiDocs,
		isPending: pendingRemoveWikiDocs,
	} = useMutation<ResponseType, ApiError, number[]>({
		mutationFn: (ids) => removeWikiDocs(collectionId, ids),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wikiRemove"] });
		},
	});

	return {
		dataWiki,
		errorWiki,
		loadingWiki,
		errorUploadWikiDocs,
		handleUploadWikiDocs,
		pendingUploadWikiDocs,
		refetchWikiTree,
		errorRemoveWikiDocs,
		handleRemoveWikiDocs,
		pendingRemoveWikiDocs,
	};
};

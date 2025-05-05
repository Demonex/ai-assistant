import { getWikiTree, uploadWikiDocs } from "@/api/wiki.js";
import { ApiError, WikiDocsRequesttype, WikiTreeType } from "@/types/types.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useWiki = (collectionId: number) => {
	const queryClient = useQueryClient();

	const {
		data: dataWiki,
		error: errorWiki,
		isLoading: loadingWiki,
	} = useQuery<ResponseType, ApiError, WikiTreeType[]>({
		queryKey: ["wikiTree"],
		queryFn: () => getWikiTree(collectionId),
		retry: false,
	});

	console.log({ dataWiki, errorWiki, loadingWiki });

	// upload wiki docs

	const {
		error: errorUploadWikiDocs,
		mutate: handleUploadWikiDocs,
		isPending: pendingUploadWikiDocs,
	} = useMutation<ResponseType, ApiError, WikiDocsRequesttype>({
		mutationFn: uploadWikiDocs,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
	});

	console.log({ errorUploadWikiDocs, pendingUploadWikiDocs });

	return {
		dataWiki,
		errorWiki,
		loadingWiki,
		errorUploadWikiDocs,
		handleUploadWikiDocs,
		pendingUploadWikiDocs,
	};
};

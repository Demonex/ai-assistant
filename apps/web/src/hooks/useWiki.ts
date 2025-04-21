import { getWiki } from "@/api/wiki.js";
import { useQuery } from "@tanstack/react-query";

export const useWiki = ({ apiKey, baseUrl, collectionId }) => {
	const {
		data: dataWiki,
		error: errorWiki,
		isLoading: loadingWiki,
	} = useQuery({
		queryKey: ["wiki"],
		queryFn: () => getWiki({ apiKey, baseUrl, collectionId }),
		retry: false,
		enabled: !!apiKey,
	});

	console.log({ dataWiki, errorWiki, loadingWiki });

	return {
		dataWiki,
		errorWiki,
		loadingWiki,
	};
};

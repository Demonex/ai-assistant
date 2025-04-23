import { getWiki } from "@/api/wiki.js";
import { useQuery } from "@tanstack/react-query";

export const useWiki = ({ apiKey, baseUrl }) => {
	const {
		data: dataWiki,
		error: errorWiki,
		isLoading: loadingWiki,
	} = useQuery({
		queryKey: ["wiki"],
		queryFn: () => getWiki({ apiKey, baseUrl }),
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

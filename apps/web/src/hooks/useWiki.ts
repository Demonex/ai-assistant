import { getWiki } from "@/api/wiki.js";
import { useQuery } from "@tanstack/react-query";

export const useWiki = () => {
	const {
		data: dataWiki,
		error: errorWiki,
		isLoading: loadingWiki,
	} = useQuery({
		queryKey: ["wiki"],
		queryFn: getWiki,
		retry: false,
	});

	console.log({ dataWiki, errorWiki, loadingWiki });

	return {
		dataWiki,
		errorWiki,
		loadingWiki,
	};
};

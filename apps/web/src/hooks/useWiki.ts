import { getWiki } from "@/api/wiki.js";
import { useQuery } from "@tanstack/react-query";

export const useWiki = () => {
	const {
		data: dataWiki,
		error: errorWiki,
		isLoading: loadingWiki,
	} = useQuery({
		queryKey: ["wiki"],
		retry: false,
		queryFn: getWiki, //Нужно пробросить ApiKey
	});

	console.log({ dataWiki, errorWiki, loadingWiki });

	return {
		dataWiki,
		errorWiki,
		loadingWiki,
	};
};

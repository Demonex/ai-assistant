import { useQuery } from "@tanstack/react-query";

export const useWiki = () => {
	const {
		data: dataWiki,
		error: errorWiki,
		isLoading: loadingWiki,
	} = useQuery({
		queryKey: ["wiki"],
		queryFn: async () => {
			const response = await fetch("/wiki/tree");

			if (!response.ok) {
				const errorData = await response.json();
				throw errorData;
			}

			return await response.json();
		},
	});

	console.log({ dataWiki, errorWiki, loadingWiki });

	return {
		dataWiki,
		errorWiki,
		loadingWiki,
	};
};

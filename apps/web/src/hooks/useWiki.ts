import { useQuery } from "@tanstack/react-query";

export const useWiki = () => {
	const {
		data: dataWiki,
		error: errorWiki,
		isLoading: loadingWiki,
	} = useQuery({
		queryKey: ["wiki"],
		retry: false,
		queryFn: async (apiKey) => {
			const response = await fetch(
				`${import.meta.env.VITE_ADMIN_URL}/wiki/tree`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						apiKey: apiKey,
					}),
				},
			);

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

import { useQuery } from "@tanstack/react-query";

export const useModel = () => {
	const {
		data: models,
		// error: errorCollections,
		// isPending: isPendingCollections,
	} = useQuery({
		queryKey: ["models"],
		queryFn: async () => {
			const data = await fetch("/api/v1/models");
			return await data.json();
		},
	});

	return {
		models,
	};
};

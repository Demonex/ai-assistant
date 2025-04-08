import { useQuery } from "@tanstack/react-query";

export const useCollection = () => {
	const {
		data: collections,
		// error: errorCollections,
		// isPending: isPendingCollections,
	} = useQuery({
		queryKey: ["collection"],
		queryFn: async () => {
			const data = await fetch("/api/v1/collections");
			return await data.json();
		},
	});

	return {
		collections,
	};
};

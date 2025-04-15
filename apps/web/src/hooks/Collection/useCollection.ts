import { useQuery } from "@tanstack/react-query";

export const useCollection = (collectionId) => {
	const { data: collection } = useQuery({
		queryKey: ["collection", collectionId],
		queryFn: async () => {
			const collectionItem = await fetch(`/api/v1/collections/${collectionId}`);
			return await collectionItem.json();
		},
	});

	return {
		collection,
	};
};

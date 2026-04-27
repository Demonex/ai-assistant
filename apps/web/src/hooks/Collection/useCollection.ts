import { getCollection } from "@/api/collection.js";
import { useQuery } from "@tanstack/react-query";

export const useCollection = (collectionId: number) => {
	const { data: collection } = useQuery({
		queryKey: ["collections", collectionId],
		queryFn: () => getCollection(collectionId),
	});

	return {
		collection,
	};
};

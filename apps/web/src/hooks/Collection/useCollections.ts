import { getCollections } from "@/api/collection.js";
import { useQuery } from "@tanstack/react-query";

export const useCollections = () => {
	const { data: collections } = useQuery({
		queryKey: ["collections"],
		queryFn: getCollections,
	});

	return {
		collections,
	};
};

import { getCollections } from "@/api/collection.js";
import { useQuery } from "@tanstack/react-query";

export const useCollections = (tenantId: number | null) => {
	const { data: collections } = useQuery({
		queryKey: ["collections", tenantId],
		queryFn: () => getCollections(tenantId),
		enabled: Boolean(tenantId),
	});

	return {
		collections,
	};
};

import { useQuery } from "@tanstack/react-query";

export const useCollections = () => {
	const { data: collections } = useQuery({
		queryKey: ["collections"],
		queryFn: async () => {
			const data = await fetch("/api/v1/collections");
			return await data.json();
		},
	});

	return {
		collections,
	};
};

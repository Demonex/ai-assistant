import { useQuery } from "@tanstack/react-query";

export const useNeuro = () => {
	const {
		data: neuro,
		// error: errorCollections,
		// isPending: isPendingCollections,
	} = useQuery({
		queryKey: ["neuro"],
		queryFn: async () => {
			const data = await fetch("/api/v1/neuro");
			return await data.json();
		},
	});
	return { neuro };
};

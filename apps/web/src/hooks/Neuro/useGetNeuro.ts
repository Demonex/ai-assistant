import { getNeuro } from "@/api/neuro.js";
import { useQuery } from "@tanstack/react-query";

export const useGetNeuro = (id: number) => {
	const { data: neuro } = useQuery({
		queryKey: ["neuro", id],
		queryFn: () => getNeuro(id),
	});
	return { neuro };
};

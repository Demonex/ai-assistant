import { getNeuros } from "@/api/neuro.js";
import { useQuery } from "@tanstack/react-query";

export const useNeuro = () => {
	const { data: neuro } = useQuery({
		queryKey: ["neuro"],
		queryFn: getNeuros,
	});
	return { neuro };
};

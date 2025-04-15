import { getNeuros } from "@/api/neuro.js";
import { useQuery } from "@tanstack/react-query";

export const useNeuro = () => {
	const { data: neuros } = useQuery({
		queryKey: ["neuro"],
		queryFn: getNeuros,
	});
	return { neuros };
};

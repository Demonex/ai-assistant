import { getNeuros } from "@/api/neuro.js";
import { useQuery } from "@tanstack/react-query";

export const useGetNeuros = () => {
	const { data: neuros } = useQuery({
		queryKey: ["neuro"],
		queryFn: getNeuros,
	});
	return { neuros };
};

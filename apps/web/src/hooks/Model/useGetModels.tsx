import { useQuery } from "@tanstack/react-query";

import { getModels } from "@/api/model.js";

export const useGetModels = () => {
	const { data: models } = useQuery({
		queryKey: ["model"],
		queryFn: getModels,
	});

	return {
		models,
	};
};

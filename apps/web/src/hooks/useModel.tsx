import { useQuery } from "@tanstack/react-query";

import { getModels } from "@/api/model.js";

export const useModel = () => {
	const { data: models } = useQuery({
		queryKey: ["models"],
		queryFn: getModels,
	});

	return {
		models,
	};
};

import { useQuery } from "@tanstack/react-query";

import { getModel } from "@/api/model.js";

export const useGetModel = (id: number) => {
	const { data: model } = useQuery({
		queryKey: ["model", id],
		queryFn: () => getModel(id),
	});
	return { model };
};

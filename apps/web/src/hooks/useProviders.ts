import { getProviders } from "@/api/provider.js";
import { useQuery } from "@tanstack/react-query";

export const useProvider = () => {
	const { data: providers } = useQuery({
		queryKey: ["providers"],
		queryFn: getProviders,
	});
	return { providers };
};

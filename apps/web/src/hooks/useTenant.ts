import { useQuery } from "@tanstack/react-query";

export const useTenant = () => {
	const {
		data: tenants,
		// error: errorCollections,
		// isPending: isPendingCollections,
	} = useQuery({
		queryKey: ["tenants"],
		queryFn: async () => {
			const data = await fetch("/api/v1/tenants");
			return await data.json();
		},
	});

	return {
		tenants,
	};
};

import { getTenants } from "@/api/tenant.js";
import { useQuery } from "@tanstack/react-query";

export const useTenant = () => {
	const { data: tenants } = useQuery({
		queryKey: ["tenants"],
		queryFn: getTenants,
	});

	return {
		tenants,
	};
};

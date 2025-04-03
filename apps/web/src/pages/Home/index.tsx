import { memo, useEffect } from "react";

import { DashboardPage } from "@repo/web/components/Home/Dashboard.js";
import { toast } from "@repo/web/hooks/use-toast.js";
import { useProfile } from "@repo/web/hooks/useProfile.js";
import { useLocation } from "wouter";

export const HomePage = memo(() => {
	const { isAuthorized, loading, errorProfile } = useProfile();
	const [_location, navigate] = useLocation();

	useEffect(() => {
		if (isAuthorized || loading) return;

		navigate("/sign-in");
	}, [isAuthorized, loading, navigate]);

	useEffect(() => {
		if (errorProfile && errorProfile.status !== 401) {
			toast({
				variant: "destructive",
				title: errorProfile.status.toString(),
				description: errorProfile.message,
			});
		}
	}, [errorProfile]);

	if (!isAuthorized) {
		return null;
	}

	return <DashboardPage />;
});

export default HomePage;

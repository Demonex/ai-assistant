import { memo, useEffect } from "react";

import { toast } from "@repo/web/hooks/use-toast.js";
import { useProfile } from "@repo/web/hooks/useProfile.js";
import { useLocation } from "wouter";

import { DashboardPage } from "./components/dashboard/page.js";

export const HomePage = memo(() => {
	const { isAuthorized, loading, errorProfile } = useProfile();
	const [location, navigate] = useLocation();

	useEffect(() => {
		if (isAuthorized || loading) {
			return;
		}

		navigate("/sign-in");
	}, [isAuthorized]);

	useEffect(() => {
		if (errorProfile && errorProfile.status !== 401) {
			toast({
				variant: "destructive",
				title: errorProfile.status,
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

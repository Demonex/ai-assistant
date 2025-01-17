import { memo, useEffect } from "react";
import { DashboardPage } from "./components/dashboard/page.js";
import { useProfile } from "@/hooks/useProfile.js";
import { useLocation } from "wouter";

export const HomePage = memo(() => {
	const { isAuthorized, loading } = useProfile();
	const [location, navigate] = useLocation();

	useEffect(() => {
		if (isAuthorized || loading) {
			return;
		}
		// navigate("/sign-in");
	}, [isAuthorized, loading]);

	if (!isAuthorized) {
		return null;
	}

	return <DashboardPage />;
});

export default HomePage;

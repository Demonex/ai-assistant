import { memo, useEffect } from "react";

import { DashboardPage } from "@repo/web/components/Home/Dashboard.js";
import { Spinner } from "@repo/web/components/Spinner.js";
import { toast } from "@repo/web/hooks/use-toast.js";
import { useProfile } from "@repo/web/hooks/useProfile.js";
import { useLocation } from "wouter";

import { useChats } from "@/hooks/useChats.js";

export const HomePage = memo(() => {
	const { isAuthorized, errorProfile, loading } = useProfile();
	const { loadingChats } = useChats();
	const [_location, navigate] = useLocation();

	useEffect(() => {
		if (!isAuthorized) {
			navigate("/sign-in");
		}
	}, [isAuthorized, navigate]);

	useEffect(() => {
		if (errorProfile && errorProfile.status !== 401) {
			toast({
				variant: "destructive",
				title: errorProfile.status.toString(),
				description: errorProfile.message,
			});
		}
	}, [errorProfile]);

	if (loading || loadingChats) {
		return (
			<div className="fixed top-[50%] left-[50%]">
				<Spinner />
			</div>
		);
	}

	return <DashboardPage />;
});

export default HomePage;

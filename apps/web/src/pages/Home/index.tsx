import { memo } from "react";
import { DashboardPage } from "./components/dashboard/page.js";

export const HomePage = memo(() => {
	return <DashboardPage />;
});

export default HomePage;

import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";

import { Spinner } from "@/components/Spinner.js";

// import { CustomizeCollectionPage } from "@/pages/Collection/CustomizeCollectionPage.js";

const CustomizeCollectionPage = lazy(
	() => import("@/pages/CustomizeCollection/CustomizeCollectionPage.js"),
);
const DashboardPage = lazy(() => import("@/pages/Dashboard/Dashboard.js"));
const NotFoundPage = lazy(() => import("@/pages/NotFound/NotFoundPage.js"));
const ChatPage = lazy(() => import("@/pages/Chat/ChatPage.js"));
const CollectionsPage = lazy(
	() => import("@/pages/Collection/CollectionsPage.js"),
);
const SignInPage = lazy(() => import("@/pages/Auth/SignInPage.js"));
const AdminPage = lazy(() => import("@/pages/Admin/Admin.js"));

const LoadingFallback = () => (
	<div className="flex items-center justify-center h-screen w-full">
		<Spinner size="large" />
	</div>
);

export const AppRoutes = () => {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<Routes>
				<Route path="/" element={<DashboardPage />}>
					<Route path="admin" element={<AdminPage />} />
					<Route path="chat" element={<ChatPage />} />
					<Route path="collections" element={<CollectionsPage />} />
					<Route
						path="/collections/collection"
						element={<CustomizeCollectionPage />}
					/>
				</Route>
				<Route path="/sign-in" element={<SignInPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Suspense>
	);
};

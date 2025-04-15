import { Suspense, lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";

import { Spinner } from "@/components/Spinner.js";
import { useProfile } from "@/hooks/useProfile.js";
import DashboardPage from "@/pages/Dashboard/Dashboard.js";

const SuspenseFallback = () => {
	return (
		<div className="flex items-center justify-center max-h-screen h-full w-full">
			<Spinner size="large" />
		</div>
	);
};

export const withSuspense = (
	Component: React.LazyExoticComponent<() => JSX.Element>,
) => {
	return () => (
		<Suspense fallback={<SuspenseFallback />}>
			<Component />
		</Suspense>
	);
};

const CustomizeCollectionPage = withSuspense(
	lazy(() => import("@/pages/CustomizeCollection/CustomizeCollectionPage.js")),
);
const NotFoundPage = withSuspense(
	lazy(() => import("@/pages/NotFound/NotFoundPage.js")),
);
const ChatPage = withSuspense(lazy(() => import("@/pages/Chat/ChatPage.js")));
const CollectionsPage = withSuspense(
	lazy(() => import("@/pages/Collection/CollectionsPage.js")),
);
const SignInPage = withSuspense(
	lazy(() => import("@/pages/Auth/SignInPage.js")),
);
const AdminPage = withSuspense(lazy(() => import("@/pages/Admin/Admin.js")));
const ModelPage = withSuspense(
	lazy(() => import("@/pages/Model/ModelPage.js")),
);
const NeuroPage = withSuspense(
	lazy(() => import("@/pages/Neuro/NeuroPage.js")),
);

export const PrivateRoute = () => {
	const { dataProfile, isFetchingProfile } = useProfile();

	if (isFetchingProfile) {
		return <SuspenseFallback />;
	}

	if (!dataProfile) {
		return <Navigate to="/sign-in" replace />;
	}

	return <Outlet />;
};

export const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<PrivateRoute />}>
				<Route path="/" element={<DashboardPage />}>
					<Route path="admin" element={<AdminPage />} />
					<Route path="chat" element={<ChatPage />} />
					<Route path="neuro" element={<NeuroPage />} />
					<Route path="models" element={<ModelPage />} />
					<Route path="collections" element={<CollectionsPage />} />
					<Route path="collections/:id" element={<CustomizeCollectionPage />} />
				</Route>
			</Route>

			<Route path="/sign-in" element={<SignInPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

import { Navigate, Outlet, Route, Routes } from "react-router";

import { useProfile } from "@/hooks/useProfile.js";
import DashboardPage from "@/pages/Dashboard/Dashboard.js";

import {
	AdminPage,
	ChatPage,
	CollectionsPage,
	CreateModelPage,
	CreateNeuroPage,
	CreateNewCollectionPage,
	CustomizeCollectionPage,
	CustomizeModelPage,
	CustomizeNeuroPage,
	ModelPage,
	NeuroPage,
	NotFoundPage,
	SignInPage,
	SuspenseFallback,
	TranscriptionPage,
	UserPage,
} from "./pages.js";

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
					<Route path="transcription" element={<TranscriptionPage />} />
					<Route path="neuro" element={<NeuroPage />} />
					<Route path="neuro/new-neuro" element={<CreateNeuroPage />} />
					<Route path="neuro/:id" element={<CustomizeNeuroPage />} />
					<Route path="models" element={<ModelPage />} />
					<Route path="models/new-model" element={<CreateModelPage />} />
					<Route path="models/:id" element={<CustomizeModelPage />} />
					<Route path="users" element={<UserPage />} />
					<Route path="collections" element={<CollectionsPage />} />
					<Route path="collections/:id" element={<CustomizeCollectionPage />} />
					<Route
						path="collections/new-collection"
						element={<CreateNewCollectionPage />}
					/>
				</Route>
			</Route>

			<Route path="/sign-in" element={<SignInPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

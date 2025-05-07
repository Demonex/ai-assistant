import { Suspense, lazy } from "react";

import { Spinner } from "@/components/Spinner.js";

export const SuspenseFallback = () => {
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

export const NotFoundPage = withSuspense(
	lazy(() => import("@/pages/NotFound/NotFoundPage.js")),
);
export const ChatPage = withSuspense(
	lazy(() => import("@/pages/Chat/ChatPage.js")),
);
export const TranscriptionPage = withSuspense(
	lazy(() => import("@/pages/Transcription/TranscriptionPage.js")),
);
export const CollectionsPage = withSuspense(
	lazy(() => import("@/pages/Collection/CollectionsPage.js")),
);
export const CustomizeCollectionPage = withSuspense(
	lazy(() => import("@/pages/Collection/CustomizeCollectionPage.js")),
);
export const CreateNewCollectionPage = withSuspense(
	lazy(() => import("@/pages/Collection/CreateNewCollectionPage.js")),
);
export const SignInPage = withSuspense(
	lazy(() => import("@/pages/Auth/SignInPage.js")),
);
export const AdminPage = withSuspense(
	lazy(() => import("@/pages/Admin/Admin.js")),
);
export const ModelPage = withSuspense(
	lazy(() => import("@/pages/Model/ModelPage.js")),
);
export const CustomizeModelPage = withSuspense(
	lazy(() => import("@/pages/Model/CustomizeModelPage.js")),
);
export const CreateModelPage = withSuspense(
	lazy(() => import("@/pages/Model/CreateModelPage.js")),
);
export const NeuroPage = withSuspense(
	lazy(() => import("@/pages/Neuro/NeuroPage.js")),
);
export const CustomizeNeuroPage = withSuspense(
	lazy(() => import("@/pages/Neuro/CustomizeNeuroPage.js")),
);
export const CreateNeuroPage = withSuspense(
	lazy(() => import("@/pages/Neuro/CreateNeuroPage.js")),
);
export const UserPage = withSuspense(
	lazy(() => import("@/pages/User/UserPage.js")),
);

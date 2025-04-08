import { memo } from "react";

import { ThemeProvider } from "@repo/web/components/theme-provider.js";
// import { useRouterApp } from "@repo/web/hooks/useRouter.js";
import "@repo/web/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MonoHooksStore } from "use-mono-hook";

import { AppRoutes } from "@/router/router.js";

import { Toaster } from "./components/ui/toaster.js";

const queryClient = new QueryClient();

export const App = memo(() => {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<AppRoutes />
					<Toaster />
				</ThemeProvider>
				<MonoHooksStore />
			</QueryClientProvider>
		</>
	);
});

export { MonoHooksStore as WebMonoHooksStore };

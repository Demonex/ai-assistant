import { Suspense, memo } from "react";

import { ThemeProvider } from "@repo/web/components/theme-provider.js";
import { useRouterApp } from "@repo/web/hooks/useRouter.js";
import "@repo/web/index.css";
import { MonoHooksStore } from "use-mono-hook";

import { Toaster } from "./ui/toaster.js";

const RouterApp = memo(() => {
	const { route, router: { location } = {}, Component } = useRouterApp();

	if (!route || !location) {
		return Component && <Component />;
	}
	return <Suspense fallback={""}>{Component && <Component />}</Suspense>;
});

export const App = memo(() => {
	return (
		<>
			<ThemeProvider>
				<RouterApp />
				<Toaster />
			</ThemeProvider>
			<MonoHooksStore />
		</>
	);
});

export { MonoHooksStore as WebMonoHooksStore };

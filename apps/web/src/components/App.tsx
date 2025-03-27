import { memo, Suspense } from "react";
import { useRouterApp } from "@/hooks/useRouter.js";
import { ThemeProvider } from "./theme-provider.js";
import { MonoHooksProvider } from "use-mono-hook";
import "../index.css";
import { Toaster } from "./ui/toaster.js";

const RouterApp = memo(() => {
	const {
		route,
		router: { location } = {},
		Component,
	} = useRouterApp();

	if (!route || !location) {
		return Component && <Component />;
	}
	return <Suspense fallback={""}>{Component && <Component />}</Suspense>;
});

export const App = memo(() => {
	return (
		<MonoHooksProvider>
			<ThemeProvider>
				<RouterApp />
				<Toaster />
			</ThemeProvider>
		</MonoHooksProvider>
	);
});

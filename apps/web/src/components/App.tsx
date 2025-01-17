import React, { memo, Suspense } from "react";
import { useRouterApp } from "@/hooks/useRouter.js";
import { ThemeProvider } from "./theme-provider.js";
import { MonoHooksProvider } from "use-mono-hook";
import "../shared/config/i18n/i18n.js";
import "../index.css";

const RouterApp = memo(() => {
	const {
		route,
		router: { location } = {},
		Component,
	} = useRouterApp();
	if (!route || !location) {
		return null;
	}
	console.log("route", route);
	return <Suspense fallback={""}>{Component && <Component />}</Suspense>;
});
export const App = memo(() => {
	return (
		<MonoHooksProvider>
			<ThemeProvider>
				<RouterApp />
			</ThemeProvider>
		</MonoHooksProvider>
	);
});

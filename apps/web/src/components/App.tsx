import React, { memo, Suspense, useCallback, useEffect, useMemo } from "react";
import { Router, useLocation } from "wouter";
import { useRouterApp, useRouterBlock } from "@/hooks/useRouter.js";
import { useBrowserLocation } from "wouter/use-browser-location";

import "../shared/config/i18n/i18n.js";
import "../index.css";
import { ThemeProvider } from "./theme-provider.js";

export const App = memo(() => {
	const [location, setLocation] = useLocation();
	const { router, setRouter } = useRouterApp();

	const { routerAppListeners } = useRouterBlock();
	const route = useMemo(() => {
		return router.routes.reduce<(typeof router.routes)[number]>(
			(_route, route) => {
				return (route.path.length > 1
					? router.location?.startsWith(route.path)
					: router.location === route.path) && route.finished
					? route
					: route.path === router.prevLocation && !_route
						? route
						: _route;
			},
			undefined,
		);
	}, [router]);

	const hook: any = useCallback(
		(opts = {}) => {
			const [path, navigate] = useBrowserLocation(opts);
			return [
				path,
				async (...args: any[]) => {
					const params = args as [any];
					await Promise.all(routerAppListeners.map((fn) => fn()));
					return navigate(...params);
				},
			];
		},
		[routerAppListeners],
	);

	useEffect(() => {
		if (router.location === location) {
			return;
		}
		setRouter((prev) => ({ ...prev, location, setLocation }));
	}, [location]);

	const Component = useMemo(() => {
		return (
			route?.component ||
			router.routes.find(({ path }) => path === "*" /*404 page*/)?.component
		);
	}, [route]);

	if (!router.location) {
		return null;
	}

	return (
		<Router hook={hook}>
			<ThemeProvider>
				<Suspense fallback={""}>{Component && <Component />}</Suspense>
			</ThemeProvider>
		</Router>
	);
});

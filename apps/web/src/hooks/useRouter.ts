import {
	type ComponentType,
	type LazyExoticComponent,
	useCallback,
	useEffect,
	useState,
} from "react";
import { useBetween } from "use-between";
import { lazyWithPreload } from "utils/lazyWithPreload.js";
import { useProfile } from "hooks/useProfile.js";

type RouteApp = {
	path: string;
	component: LazyExoticComponent<ComponentType<any>> & { preload?: any };
	loading?: boolean;
	finished?: boolean;
};

const routesShared = [
	{
		path: "/",
		component: lazyWithPreload(() => import("pages/Home/index.js")),
	},
	{
		path: "*",
		component: lazyWithPreload(() => import("pages/NotFound/index.js")),
	},
] satisfies RouteApp[];

const routesAuthorized = [...routesShared] satisfies RouteApp[];

const routesUnAuthorized = [
	...routesShared,
	{
		path: "/sign-in",
		component: lazyWithPreload(() => import("pages/Auth/SignIn.js")),
	},
] satisfies RouteApp[];

type RouterAppListener = () => Function | Promise<any>;

const _useRouterBlock = () => {
	const [routerAppListeners, setRouterAppListeners] = useState<
		RouterAppListener[]
	>([]);
	return {
		routerAppListeners,
		setRouterAppListeners,
	};
};
export const useRouterBlock = () =>
	useBetween<ReturnType<typeof _useRouterBlock>>(_useRouterBlock);

export const useRouterBlocker = () => {
	const { setRouterAppListeners } = useRouterBlock();
	const [unblockPage, setUnblockPage] =
		useState<(value: any | PromiseLike<any>) => void>();

	const beforeUnload = useCallback((e: BeforeUnloadEvent) => {
		e.preventDefault();
	}, []);
	const fn = useCallback(
		() =>
			new Promise((resolve) => {
				setUnblockPage(() => resolve);
			}),
		[],
	);

	useEffect(() => {
		setRouterAppListeners((prev) => [...prev, fn]);
		addEventListener("beforeunload", beforeUnload, { capture: true });
		return () => {
			setRouterAppListeners((prev) => {
				return prev.filter((_) => _ !== fn);
			});
			removeEventListener("beforeunload", beforeUnload, { capture: true });
		};
	}, [fn, beforeUnload]);

	return {
		unblockPage,
	};
};

const _useRouterApp = () => {
	const [router, setRouter] = useState<{
		location: string;
		setLocation?: <S = any>(
			to: string | URL,
			options?: { replace?: boolean; state?: S },
		) => void;
		prevLocation: string;
		routes: RouteApp[];
	}>({
		location: undefined,
		prevLocation: undefined,
		routes: routesShared,
	});
	const { isAuthorized } = useProfile();

	useEffect(() => {
		if (!router.location || router.location === router.prevLocation) {
			return;
		}
		setRouter((prev) => {
			return {
				...prev,
				prevLocation: prev.location,
				routes: prev.routes.reduce((_prev, route) => {
					return (route.path.length > 1
						? router.location?.startsWith(route.path)
						: router.location === route.path) && !("finished" in route)
						? [
								..._prev,
								{
									...route,
									loading: true,
								},
							]
						: [..._prev, route];
				}, []),
			};
		});
	}, [router.location]);

	useEffect(() => {
		if (!router.location) {
			return;
		}
		router.routes
			.filter(({ loading, finished }) => loading && !finished)
			.map(async ({ path, component }) => {
				await component.preload();
				setRouter((prev) => {
					return {
						...prev,
						routes: prev.routes.reduce((routes, route) => {
							return path === route.path
								? [
										...routes,
										{
											...route,
											loading: false,
											finished: true,
										},
									]
								: [...routes, route];
						}, []),
					};
				});
			});
	}, [router.routes]);

	const preloadPage = useCallback(async (path: string) => {
		const page = router.routes.find((router) => router.path === path);

		if (!page || page.finished || page.loading) {
			return;
		}

		await page.component.preload();

		setRouter((prev) => {
			return {
				...prev,
				routes: prev.routes.reduce((routes, route) => {
					return path === route.path
						? [
								...routes,
								{
									...route,
									loading: false,
									finished: true,
								},
							]
						: [...routes, route];
				}, []),
			};
		});
	}, []);

	useEffect(() => {
		switch (router.location) {
			case "/": {
				if (isAuthorized) {
					// void preloadPage('/dashboard');
					void preloadPage("/wallet");
					void preloadPage("/stores");
				} else {
					void preloadPage("/auth");
				}
				break;
			}
			case "/auth": {
				if (isAuthorized) {
					router?.setLocation("/wallet");
				} else {
					void preloadPage("/");
					// void preloadPage('/dashboard');
					void preloadPage("/wallet");
					void preloadPage("/stores");
				}
				break;
			}
			case "/html/dashboard": {
				if (!isAuthorized) {
					router?.setLocation("/auth");
				} else {
					void preloadPage("/");
					void preloadPage("/wallet");
					void preloadPage("/stores");
				}
				break;
			}
			case "/wallet": {
				if (!isAuthorized) {
					router?.setLocation("/auth");
				} else {
					void preloadPage("/");
					// void preloadPage('/html/dashboard');
					void preloadPage("/stores");
				}
				break;
			}
			case "/stores": {
				if (!isAuthorized) {
					router?.setLocation("/auth");
				} else {
					void preloadPage("/");
					// void preloadPage('/dashboard');
					void preloadPage("/wallet");
				}
				break;
			}
		}
	}, [router.location, isAuthorized]);

	useEffect(() => {
		setRouter((router) => ({
			...router,
			routes: isAuthorized ? routesAuthorized : routesUnAuthorized,
		}));
	}, [isAuthorized]);

	return {
		router: router,
		setRouter,
		preloadPage,
	};
};

export const useRouterApp = () =>
	useBetween<ReturnType<typeof _useRouterApp>>(_useRouterApp);

import { memo, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import get from "lodash.get";
import { ErrorPage } from "../pages/404/Error.js";
import { MemoComponent } from "./MemoComponent.js";
import "../index.css";
import { SearchBar } from "./Header/components/SearchField/index.js";
import { useSizes } from "../hooks/useSizes.js";
import "../shared/config/i18n/i18n.js";
import { ThemeProvider } from "./theme-provider.js";

const PagePathsWithComponents: {
	[k: string]: {
		default: any;
	};
} = import.meta.glob("../routes/**/*.ts", { eager: true });

const routes: {
	path?: string;
	component: any;
}[] = [
	...Object.keys(PagePathsWithComponents).map((_path: string) => {
		const name = get(_path.match(/\.\.\/routes\/(.*)\.ts$/), 1, "");
		const path = name === "index" ? "/" : `/${name}`;
		const pathAbsoluteArr = path
			.replace(/\|/g, "/")
			.split("/")
			.filter((_, index) => index > 0);
		const isSubRoot =
			pathAbsoluteArr.length > 1 && pathAbsoluteArr.at(-1) === "index";
		const pathAbsolute = (
			isSubRoot
				? pathAbsoluteArr
						.filter((_, index) => {
							return index < pathAbsoluteArr.length - 1;
						})
						.join("/")
				: pathAbsoluteArr.join("/")
		)
			.replace(/}/g, "")
			.replace(/\{/g, ":");
		return {
			path: pathAbsolute || "/",
			component: MemoComponent(PagePathsWithComponents[_path].default),
		};
	}),
	{
		component: {
			path: undefined,
			component: MemoComponent(ErrorPage),
		},
	},
];
export const App = memo(() => {
	const { width, height } = useSizes();

	const [location] = useLocation();

	useEffect(() => {
		document.getElementById("app").scrollTo({
			top: 0,
			behavior: "instant",
		});
	}, [location]);

	if (width === 0 || height === 0) {
		return null;
	}

	return (
		<>
			{/*<TurnOffDefaultPropsWarning/>*/}
			<ThemeProvider>
				<Switch>
					{routes.map(({ path, component: RouteComp }, index) => {
						return (
							<Route path={path} component={RouteComp as any} key={index} />
						);
					})}
				</Switch>
				<SearchBar />
			</ThemeProvider>
		</>
	);
});

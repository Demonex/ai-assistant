import React from "react";
import ReactDOMServer from "react-dom/server";

import { Router } from "wouter";

import { App } from "./components/App.js";

export const SSRRender = (url: string) => {
	return ReactDOMServer.renderToString(
		<React.StrictMode>
			<Router ssrPath={url}>
				<App />
			</Router>
		</React.StrictMode>,
	);
};

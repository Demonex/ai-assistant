import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";

import { App } from "./App.js";

ReactDOM.createRoot(document.getElementById("app") || null).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
);

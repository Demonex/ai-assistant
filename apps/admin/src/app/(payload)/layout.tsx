/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type React from "react";

import config from "@payload-config";
import "@payloadcms/next/css";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import type { ServerFunctionClient } from "payload";

import Toaster from "@/components/ui/sonner";

import { importMap } from "./admin/importMap.js";
import "./custom.scss";

type Args = {
	children: React.ReactNode;
};
// biome-ignore lint: next.js need this!
const serverFunction: ServerFunctionClient = async function (args) {
	"use server";
	return handleServerFunctions({
		...args,
		config,
		importMap,
	});
};

const originalFetch = global.fetch;

global.fetch = async (url: string | Request | URL, options = {}) => {
	const defaultOptions = {
		credentials: "include", // Always include credentials (cookies, etc.)
	};

	const combinedOptions = {
		...defaultOptions,
		...options, // Allow overriding other options if needed
	};

	return originalFetch(url, combinedOptions as any);
};

const Layout = ({ children }: Args) => {
	return (
		<RootLayout
			config={config}
			importMap={importMap}
			serverFunction={serverFunction}
		>
			{children}
			<Toaster />
		</RootLayout>
	);
};

export default Layout;

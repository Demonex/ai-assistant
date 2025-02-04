"use client";

import { useEffect } from "react";

export const RootChange = async () => {
	useEffect(() => {
		const _self: any = window.fetch;
		(window as any).fetch = (...args) => {
			const [_, arg] = args;
			if ("headers" in arg) {
				arg.headers["x-tenant"] = localStorage.getItem("tenant");
			}
			return _self(...args);
		};
	});
	return <p>123</p>;
};

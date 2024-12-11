"use client";

import { memo } from "react";

export const TurnOffDefaultPropsWarning = memo(() => {
	// Override console.error
	// This is a hack to suppress the warning about missing defaultProps in the recharts library
	// @link https://github.com/recharts/recharts/issues/3615
	const error = console.error;

	console.error = (...args: any) => {
		if (/defaultProps/.test(args[0])) {
			return;
		}
		error(...args);
	};

	return null;
});

"use client";

import { ReactNode, useEffect } from "react";

type ForceLightModeProviderProps = {
	children: ReactNode;
};

const ForceLightModeProvider = ({ children }: ForceLightModeProviderProps) => {
	useEffect(() => {
		document.documentElement.setAttribute("data-theme", "light");
	}, []);

	return children;
};

export default ForceLightModeProvider;

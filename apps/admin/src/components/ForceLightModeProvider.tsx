"use client";

import React, { useEffect } from "react";

const ForceLightModeProvider = ({ children }: any) => {
	useEffect(() => {
		document.documentElement.setAttribute("data-theme", "light");
	}, []);

	return children;
};

export default ForceLightModeProvider;

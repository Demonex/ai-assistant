import React, { type LazyExoticComponent } from "react";

export const lazyWithPreload = (
	factory: () => Promise<{
		default: React.ComponentType<any>;
	}>,
): LazyExoticComponent<React.ComponentType<any>> => {
	const Component = React.lazy(factory);
	(Component as typeof Component & { preload: unknown }).preload = factory;
	return Component;
};

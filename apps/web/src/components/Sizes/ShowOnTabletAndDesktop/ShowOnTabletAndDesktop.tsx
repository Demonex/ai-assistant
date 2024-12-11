import type React from "react";
import { memo } from "react";
import { useSizes } from "../../../hooks/useSizes.js";

type MobileOnlyProps = {
	children: React.ReactNode;
};
export const ShowOnTabletAndDesktop = memo<MobileOnlyProps>(({ children }) => {
	const { isDesktop, isTablet, isLaptop } = useSizes();

	if (!isTablet && !isDesktop && !isLaptop) {
		return null;
	}

	return <>{children}</>;
});

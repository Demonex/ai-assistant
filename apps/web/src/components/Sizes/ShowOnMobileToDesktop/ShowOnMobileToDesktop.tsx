import type React from "react";
import { memo } from "react";
import { useSizes } from "../../../hooks/useSizes.js";

type MobileOnlyProps = {
	children: React.ReactNode;
};
export const ShowOnMobileToDesktop = memo<MobileOnlyProps>(({ children }) => {
	const { isMobile, isTablet, isLaptop } = useSizes();

	if (!isMobile && !isTablet && !isLaptop) {
		return null;
	}

	return <>{children}</>;
});

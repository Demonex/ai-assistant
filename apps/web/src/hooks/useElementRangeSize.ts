import { useSizes } from "./useSizes.js";
import { useState } from "react";

export const useElementRangeSize = () => {
	const { elementRange } = useSizes();
	const { elementRange: elementRangeMobile } = useSizes(320, 768);
	const { elementRange: elementRangeLaptop } = useSizes(1024, 1920);
	const paddingHorizontal = elementRange(16, 118);
	const h1Size = elementRangeLaptop(40, 56);
	const marginVertical = elementRange(30, 60);
	const h1SizeMobile = elementRangeMobile(24, 40);
	const buttonFontSize = elementRange(24, 56);
	const buttonFontSizeMobile = elementRangeMobile(20, 40);
	const borderRadiusMobile = elementRangeMobile(10, 20);

	return {
		paddingHorizontal,
		h1Size,
		h1SizeMobile,
		buttonFontSizeMobile,
		buttonFontSize,
		borderRadiusMobile,
		marginVertical,
	};
};

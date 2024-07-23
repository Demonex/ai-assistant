import {useSizes} from "./useSizes.js";

export const useElementRangeSize = () => {
  const {elementRange} = useSizes();
  const {elementRange:elementRangeMobile} = useSizes(320, 768);
  const paddingHorizontal = elementRange(10, 160);
  const h1Size = elementRange(24, 84);
  const h1SizeMobile = elementRangeMobile(28, 64);
  const buttonFontSize = elementRange(24, 56);
  const buttonFontSizeMobile = elementRangeMobile(20, 40);
  const borderRadiusMobile = elementRangeMobile(10, 20);


  return {
    paddingHorizontal,
    h1Size,
    h1SizeMobile,
    buttonFontSizeMobile,
    buttonFontSize,
    borderRadiusMobile
  }
}

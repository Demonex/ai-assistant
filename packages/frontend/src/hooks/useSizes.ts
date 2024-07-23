import {useWindowSize} from "@uidotdev/usehooks";
import {useCallback, useMemo} from "react";
import {convertRange} from "../utils.js";

export const useSizes = (widthRangeMin = 320, widthRangeMax = 2560) => {
  const {width, height} = useWindowSize();
  const widthRange = Math.min(Math.max(widthRangeMin, width), widthRangeMax);

  const elementRange = useCallback((min: number, max: number) => {
    return convertRange(widthRange, [widthRangeMin, widthRangeMax], [min, max])
  }, [widthRange, widthRangeMin, widthRangeMax]);

  const isMobile = useMemo(() => Boolean(width && width < 768), [width])
  const isTablet = useMemo(() => Boolean(width && width >= 768 && width < 1024), [width])
  const isLaptop = useMemo(() => Boolean(width && width >= 1024 && width < 1280), [width])
  const isDesktop = useMemo(() => Boolean(width && width >= 1280), [width])
  const is1600 = useMemo(() => Boolean(width && width >= 1600), [width])

  return {
    height: height || 0,
    width: width || 0,
    isMobile,
    isLaptop,
    isDesktop,
    isTablet,
    is1600,
    widthRange,
    widthRangeMin,
    widthRangeMax,
    elementRange
  }
}

import {useWindowSize} from '@uidotdev/usehooks';
import {useMemo} from 'react';

export const useSizes = ({
                           range
                         }: {
  range?: [number, number]
} = {}) => {
  const {width, height} = useWindowSize();
  const isMobile = useMemo(() => Boolean(width && width < 768), [width]);
  const isTablet = useMemo(() => Boolean(width && width >= 768 && width < 1024), [width]);
  const isLaptop = useMemo(() => Boolean(width && width >= 1024 && width < 1280), [width]);
  const isDesktop = useMemo(() => Boolean(width && width >= 1280), [width]);
  const is1600 = useMemo(() => Boolean(width && width >= 1600), [width]);
  const widthRange = useMemo(() => {
    const [minWidth, maxWidth] = range || [];
    if (!minWidth || !maxWidth) {
      return width;
    }
    return Math.max(Math.min(width, maxWidth), minWidth);
  }, [width, range]);

  return {
    height: height || 0,
    width: width || 0,
    isMobile,
    isLaptop,
    isDesktop,
    isTablet,
    is1600,
    widthRange
  };
};

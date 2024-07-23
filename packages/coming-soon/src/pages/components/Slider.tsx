import {sliders} from '../FirstStub.js';
import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useSizes} from '../../hooks/useSizes.js';
import {convertRange} from '../../utils.js';

type SliderProps = {
  leftElementHeight: number
}
const Slider = memo(({leftElementHeight}: SliderProps) => {
  const {isDesktop, isLaptop, widthRange} = useSizes({
    range: [320, 1920]
  });
  const [refsSlider, setRefsSlider] = useState<HTMLDivElement[]>([]);
  const initAnimation = useCallback((scrolls: HTMLDivElement[] = []) => {
    scrolls.forEach((scroller) => {
      scroller.setAttribute('data-animated', 'true');
    });
  }, []);
  const pictureWidthHorizontal = useMemo(() => {
    return widthRange / 5 - 20;
  }, [widthRange]);
  const pictureHeightHorizontal = useMemo(() => {
    return pictureWidthHorizontal / 4 + pictureWidthHorizontal;
  }, [pictureWidthHorizontal]);
  const pictureHeightVertical = useMemo(() => {
    const range = convertRange(widthRange, [1920, 1600], [2.5, 3.5]);
    return leftElementHeight / range;
  }, [leftElementHeight, widthRange]);
  const pictureWidthVertical = useMemo(() => {
    return pictureHeightVertical / 9 * 7 - (sliders.length > 1 ? (16 / sliders.length) : 0);
  }, [pictureHeightVertical]);
  const sliderContainerHeight = useMemo(() => {
    return pictureHeightHorizontal + 40;
  }, [pictureHeightHorizontal]);

  useEffect(() => {
    if (refsSlider.length !== sliders.length
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    initAnimation(refsSlider);
  }, [refsSlider.length, sliders.length]);
  return (
    <div
      className="flex lg:gap-4 lg:justify-center relative lg:w-[35%] w-full flex-col lg:flex-row mb-11 lg:mb-0"
      style={{
        maxHeight: `${leftElementHeight}px`,
        minWidth: `${Math.min(pictureWidthVertical * sliders.length + 16, 580)}px`,
        height: `100%`
      }}
    >
      {
        sliders.map((slides, index) => (
          <div
            key={index}
            className={`${isLaptop || isDesktop ? 'scroller-y' : 'scroller'} py-2 3xl:py-0`}
            ref={ref => {
              if (!ref || refsSlider.includes(ref)) {
                return;
              }
              setRefsSlider((prev) => [...prev, ref]);
            }}
            data-direction={index % 2 ? 'right' : 'left'}
            data-speed="slow"
            style={isLaptop || isDesktop ? {} : {
              top: `${sliderContainerHeight * index}px`
            }}
          >
            <div className="scroller__inner gap-2 md:gap-4">
              {
                slides.map((slide, index) => (
                  <div key={index}>
                    <img src={slide} alt="" style={isLaptop || isDesktop ? {
                      height: `${pictureHeightVertical}px`,
                      width: `${pictureWidthVertical}px`
                    } : {
                      height: `${pictureHeightHorizontal}px`,
                      width: `${pictureWidthHorizontal}px`
                    }}/>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
});
export default Slider;

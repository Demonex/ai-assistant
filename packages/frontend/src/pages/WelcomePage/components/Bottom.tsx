import spray from '../../../assets/png/lilac-spray@3x.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {memo} from "react";


const Bottom = memo(() => {
  const {h1Size,} = useElementRangeSize();
  const {elementRange, isTablet, isMobile} = useSizes();
  const {elementRange: elementRangeLaptop} = useSizes(1024, 2560);
  const {elementRange: elementRangeMobile} = useSizes(320, 1023);
  const imgSize = elementRange(90, 350);
  const imgSizeMobile = elementRangeMobile(130, 350);
  const maxWidthText = elementRangeLaptop(37, 57);
  const hiddenDiv = elementRangeLaptop(250, 850);
  const hiddenDivMobile = elementRangeMobile(270, 1000);
  const h1SizeMobile = elementRangeMobile(60 / 2, 64);

  return (
    <>
      <div className='w-full flex flex-col ' style={{
        maxWidth: isTablet || isMobile ? `unset` : `${maxWidthText}rem`,
      }}>
        <div className='flex justify-center gap-2 flex-wrap'>
          <h1
            className='text-center font-bold relative'
            style={{
              fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
              lineHeight: '120%'
            }}
          >Начни
          </h1>
          <h1
            className='text-center font-bold relative'
            style={{
              fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
              lineHeight: '120%'
            }}
          > звучать
          </h1>
          <h1
            className='text-center font-bold relative -rotate-2'
            style={{
              fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
              lineHeight: '120%'
            }}>
            громче
            <img
              style={{
                width: isMobile || isTablet ? `${imgSizeMobile}px` : `${imgSize}px`,
              }}
              src={spray}
              className='absolute -z-10 left-0 top-[10%]'/>
          </h1>
          <h1
            className='text-center font-bold relative'
            style={{
              fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
              lineHeight: '120%'
            }}
          > прямо
          </h1>
          <h1
            className='text-center font-bold relative'
            style={{
              fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
              lineHeight: '120%'
            }}
          > сейчас
          </h1>
        </div>
      </div>
      <div style={{
        height: isTablet || isMobile ? `${hiddenDivMobile}px` : `${hiddenDiv}px`,
      }}/>
    </>

  )
})
export default Bottom

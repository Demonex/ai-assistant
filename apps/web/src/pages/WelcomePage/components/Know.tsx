import imgKnow from '/assets/png/knowNew.png'
import redMarker from '/assets/png/redMarker.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {memo} from "react";

const Know = memo(() => {
  const {h1Size, h1SizeMobile, marginVertical, paddingHorizontal} = useElementRangeSize();
  const {elementRange, isTablet, isMobile} = useSizes();
  const {elementRange: elementRangeMobile} = useSizes(320, 768);
  const imgKnowSize = elementRange(420, 916);
  const markerWidth = elementRange(120, 260);
  const imgKnowSizeMobile = elementRangeMobile(300, 708);

  return (
    <div
        style={{
            marginTop: `${marginVertical}px`,
            marginBottom: `${marginVertical}px`,
            paddingLeft:`${paddingHorizontal}px`,
            paddingRight:`${paddingHorizontal}px`,
        }}
        className=' flex flex-col gap-8 md:gap-11 lg:flex-row  justify-center items-center'>
      <div className='w-full '>
          <h1
              style={{
                  fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
              }}
              className='relative font-bold lg:font-black text-h2Desctop w-fit'>Знай своих фанатов<br/> до&nbsp;мелочей
              <img src={redMarker} className='absolute left-[18%] ' style={{width: `${markerWidth}px` }}/>
          </h1>

      </div>
        <div className='  h-full '>

            <img src={imgKnow} style={{
                minWidth: isTablet || isMobile ?  `${imgKnowSizeMobile}px` :  `${imgKnowSize}px`
            }}/>
        </div>
    </div>
  )
})
export default Know

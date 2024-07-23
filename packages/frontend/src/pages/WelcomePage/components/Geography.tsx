import map from '../../../assets/png/geography-desk@3x.png'
import map_mob from '../../../assets/png/geography@3x.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {useSizes} from "../../../hooks/useSizes.js";
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {memo} from "react";

const Geography = memo(() => {
  const {h1Size, h1SizeMobile} = useElementRangeSize();
  const {isMobile, isTablet} = useSizes()
  const {elementRange} = useSizes(1024, 2560);
  const {elementRange:elementRangeMobile} = useSizes(320, 768);
  const pSize = elementRange(18, 36);
  const pSizeMobile = elementRangeMobile(16, 32);

  return (
    <div className='w-full relative'>
      <div className='absolute top-[5%] left-[5%]'>
        <h1
          className='font-bold'
          style={{
            fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
            lineHeight: '120%'

          }}
        >Где тебя слушают</h1>
        <p
          className='text-white/70 mt-3 xl:mt-5 4xl:mt-6'
          style={{
            fontSize: isTablet || isMobile ? `${pSizeMobile}px` : `${pSize}px`,
            lineHeight: '120%'

          }}>Смотри, где есть твоя фан-база,<br/> и планируй там концерты</p>
      </div>
      {
        isTablet || isMobile
          ? <img src={map_mob} className=''/>
          : <img src={map} className=''/>
      }

    </div>
  )
})
export default Geography

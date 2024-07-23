import imgKnow from '../../../assets/png/knowImg.png'
import imgKnowMob from '../../../assets/png/know-mob@3x.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {memo} from "react";

const Know = memo(() => {
  const {h1Size, h1SizeMobile} = useElementRangeSize();
  const {elementRange, isTablet, isMobile} = useSizes();
  const {elementRange: elementRangeMobile} = useSizes(320, 768);
  const imgKnowSize = elementRange(180, 1650);
  const imgKnowSizeMobile = elementRangeMobile(1200, 1650);

  return (
    <div className='w-full flex flex-col lg:flex-row gap-8 lg:gap-[unset] justify-between items-center'>
      <div className='w-full  lg:w-1/3'>
        <h1
          style={{
            fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
            lineHeight: '120%'

          }}
          className='font-bold'>Знай своих{isTablet || isMobile ? null : <br/>} фанатов<br/> до&nbsp;мелочей</h1>
      </div>
      <div className=' w-full h-full '>

        {
          isMobile || isTablet
            ? <img src={imgKnowMob} style={{
              width: `${imgKnowSizeMobile}px`,
            maxWidth:'107%'
            }}
            />

            : <img src={imgKnow} style={{
              width: `${imgKnowSize}px`
            }}/>

        }
      </div>
    </div>
  )
})
export default Know

import {useSizes} from "../../../hooks/useSizes.js";
import marker from '../../../assets/png/violetMarker.png'
import cassette from '../../../assets/png/cassette@3x.png'
import cassetteMobile from '../../../assets/png/cassettte-mob@3x.png'
// import cassette from '../../../assets/png/sound-power.png'
import {memo,} from "react";
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";

const Start = memo(() => {
  const {h1Size, paddingHorizontal, h1SizeMobile} = useElementRangeSize();
  const {elementRange, isMobile, isTablet} = useSizes();
  const cassetteSize = elementRange(180, 1520);
  const marginTop = elementRange(82, 500);


  return (
    <>
      <div
        className='w-full flex flex-col lg:flex-row gap-[77px] lg:gap-[unset] justify-between relative'
        style={{marginTop: isMobile || isTablet ? `${marginTop}px` : null}}>
        <div className='mt-[1.5rem]'>
          <h1 className='font-black' style={{
            fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
            lineHeight: '120%'

          }}>
            Следи за взлетом<br/> прослушиваний<br/> и оценивай, насколько<br/> бомбическим будет<br/>
          </h1>
          <h1 className='relative font-black w-fit' style={{
            fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
            lineHeight: '120%'

          }}>
            твой успех
            <img src={marker} className='absolute w-1/2 left-1/2 -bottom-[10px]'/>
          </h1>
        </div>
        <div>
          {
            isTablet || isMobile
              ? <img
                className='relative'
                src={cassetteMobile}
                style={{
                  // width: `${cassetteSizeMobile}px`,
                  right: `-${paddingHorizontal}px`
                }}/>
              : <img
                className='relative'
                src={cassette}
                style={{
                  width:  `${cassetteSize}px`,
                  right: `-${paddingHorizontal}px`
                }}/>
          }

        </div>
      </div>
    </>
  )
})
export default Start

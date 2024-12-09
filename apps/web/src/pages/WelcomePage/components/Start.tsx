import {useSizes} from "../../../hooks/useSizes.js";
import marker from '/assets/png/violetMarker.png'
import cassette from '/assets/png/cassette@3x.png'
import cassetteMobile from '/assets/png/cassettte-mob@3x.png'
// import cassette from '../../../assets/png/sound-power.png'
import {memo,} from "react";
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";

const Start = memo(() => {
  const {h1Size, paddingHorizontal, h1SizeMobile, marginVertical} = useElementRangeSize();
  const {elementRange, isMobile, isTablet} = useSizes();
  const cassetteSize = elementRange(180, 980);


  return (
    <>
      <div
        className='w-full flex flex-col lg:flex-row gap-[77px] lg:gap-[unset] justify-between relative items-center'
        style={{
          marginTop: `${marginVertical}px`,
          marginBottom: `${marginVertical}px`,
          paddingLeft:`${paddingHorizontal}px`,
          paddingRight:`${paddingHorizontal}px`,
        }}>
        <div className='w-full lg:w-1/2'>
          <h1 className='text-h2Desctop font-bold lg:font-black' style={{
            fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
          }}>
            Следи за взлетом<br/> прослушиванийи оценивай,<br/> насколько бомбическим <br/>
          </h1>
          <h1 className='relative text-h2Desctop w-fit font-bold lg:font-black' style={{
            fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
          }}>
            будет твой успех
            <img src={marker} className='absolute w-[40%] right-0 -bottom-[10px] md:-bottom-[20px]'/>
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

import map from '/assets/png/mapNew.png'
import {useSizes} from "../../../hooks/useSizes.js";
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {memo} from "react";

const Geography = memo(() => {
  const {h1Size, h1SizeMobile, marginVertical, paddingHorizontal} = useElementRangeSize();
  const {isMobile, isTablet} = useSizes()
  const {elementRange} = useSizes();
  const titleMarginTop = elementRange(50,100)

  return (
      <div
          style={{
              marginBottom: `${marginVertical}px`,
              marginTop: `${marginVertical}px`
          }}
          className='w-full relative flex flex-col gap-[2.5rem] md:gap-[3.125rem]'>
          <div
              style={{
                  paddingLeft:`${paddingHorizontal}px`,
                  paddingRight:`${paddingHorizontal}px`,
                  marginTop: isTablet || isMobile ?'' : `${titleMarginTop}px`,
              }}
              className='flex flex-col gap-6 lg:absolute '>
              <h1
                  className='font-bold lg:font-black text-h2Desctop'
                  style={{
                      fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
                  }}
              >Где тебя слушают</h1>
              <p
                  className='text-white text-t2Regular md:text-t1Regular '
                 >Смотри, где есть твоя фан-база,{isTablet || isMobile ? null : <br/>} и планируй там концерты</p>
          </div>
          <img src={map} className=''/>
      </div>
  )
})
export default Geography

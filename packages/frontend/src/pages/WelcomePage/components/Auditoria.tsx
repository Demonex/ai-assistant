import {useSizes} from "../../../hooks/useSizes.js";
import marker from '../../../assets/png/yellowMarker.png'
import picture from '../../../assets/png/auditoriaPic.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {memo} from "react";

const Auditoria = memo(() => {
  const {h1Size,h1SizeMobile} = useElementRangeSize();
  const {elementRange,isTablet, isMobile} = useSizes();
  const pictureSize = elementRange(160, 1494);
  const leftSideMargin = elementRange(60, 265);

  return (
    <>
      <div
        style={{
          // marginTop:`${parentMarginTop}px`,
        }}
        className='flex flex-col gap-[3.75rem] lg:flex-row lg:gap-[unset] w-full items-start justify-between'>
        <div className='leftSide' style={{
          marginTop: isTablet || isMobile ? '0' : `${leftSideMargin}px`,
          lineHeight: '120%'

        }}>
          <h1 className='font-black' style={{
            fontSize: isTablet || isMobile ? `${h1SizeMobile}px` :`${h1Size}px`,
            lineHeight: '120%'

          }}>
            Разбирайся в своей<br/>
            <span className='relative w-fit'>
            аудитории
            <img src={marker} className='absolute w-[80%] -bottom-[30%] right-0'/>
          </span> <span>перед</span>
            <br/> каждым релизом<br/> и готовься к гастролям,<br/> как бог сцены
          </h1>
        </div>
        <div className='rightSide'>
          <img src={picture} style={{
            width: isTablet || isMobile ? '100%' : `${pictureSize}px`
          }}/>
        </div>
      </div>
    </>
  )
})
export default Auditoria

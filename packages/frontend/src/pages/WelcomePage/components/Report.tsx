import imgReport from '/assets/png/reportNew.png'
import blueMarker from '/assets/png/blueMarker.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {memo} from "react";

const Report = memo(() => {
  const {h1Size, h1SizeMobile, marginVertical, paddingHorizontal} = useElementRangeSize();
  const {elementRange, isMobile, isTablet} = useSizes();
  const {elementRange:elementRangeLaptop} = useSizes(1024, 1920);
  const imgKnowSize = elementRangeLaptop(430, 860);
  const markerSize = elementRange(280, 400);

  return (
    <div
        style={{
            marginBottom: `${marginVertical}px`,
            marginTop: `${marginVertical}px`,
            paddingLeft:`${paddingHorizontal}px`,
            paddingRight:`${paddingHorizontal}px`,
        }}
        className='w-full flex flex-col lg:flex-row  justify-between items-center gap-[3.125rem] lg:gap-[unset]'>
      <div className=''>
        <h1
          style={{
            fontSize: isMobile || isTablet? `${h1SizeMobile}px` :`${h1Size}px`,
          }}
          className='font-bold lg:font-black text-h2Desctop'>Создавай{isTablet || isMobile ? null :<br/>} молниеносно{isTablet || isMobile ? null :<br/>} отчеты и&nbsp;поражай&nbsp;
            {isTablet  ? null :<br/>}промоутеров{isTablet || isMobile ? null : <br/>} своими<br/>
            <span className='relative'>
               достижениями
                <img
                    style={{
                        width: `${markerSize}px`
                    }}
                    src={blueMarker}
                className='absolute right-0'/>
            </span></h1>
      </div>
      <div className=''>
        <img src={imgReport} style={{maxWidth: isMobile || isTablet? '100%' : `${imgKnowSize}px`}}/>
      </div>
    </div>
  )
})
export default Report

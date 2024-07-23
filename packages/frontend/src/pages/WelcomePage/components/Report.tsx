import imgReport from '../../../assets/png/reportImg.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {memo} from "react";

const Report = memo(() => {
  const {h1Size, h1SizeMobile} = useElementRangeSize();
  const {elementRange, isMobile, isTablet} = useSizes();
  const imgKnowSize = elementRange(280, 1490);

  return (
    <div className='flex flex-col lg:flex-row justify-between items-center'>
      <div className='w-fit'>
        <h1
          style={{
            fontSize: isMobile || isTablet? `${h1SizeMobile}px` :`${h1Size}px`,
            lineHeight: '120%'
          }}
          className='font-bold'>Создавай молниеносно{isTablet || isMobile ? null :<br/>} отчеты и&nbsp;поражай<br/> промоутеров своими достижениями</h1>
      </div>
      <div className='w-fit mt-8'>
        <img src={imgReport} style={{width: isMobile || isTablet? '100%' : `${imgKnowSize}px`}}/>
      </div>
    </div>
  )
})
export default Report

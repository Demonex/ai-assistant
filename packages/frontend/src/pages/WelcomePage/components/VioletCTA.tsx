import {useSizes} from "../../../hooks/useSizes.js";
import PrimaryButton from "../../../components/PrimaryButton.js";
import spray from '../../../assets/png/sprayBlack.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {memo} from "react";

const VioletCTA = memo(() => {
  // const parentMarginTop = convertRange(widthRange, [768, 2560], [50, 105]);
  const {h1Size, h1SizeMobile, buttonFontSize, borderRadiusMobile} = useElementRangeSize();
  const {elementRange, isTablet, isMobile} = useSizes();
  const {elementRange: elementRangeMobile} = useSizes(320, 768);
  const parentPaddingVertical = elementRange(81, 162);
  const gap = elementRange(30, 185);
  const spraySize = elementRange(100, 300);
  const spraySizeMobile = elementRangeMobile(105, 220);
  const buttonPaddingVertical = elementRange(16, 34);
  const buttonPaddingVerticalMobile = elementRangeMobile(22, 43);
  const buttonFontSizeMobile = elementRangeMobile(16, 43);


  return (
    <>
      <div
        className='w-full bg-gradient-to-r from-[#6123d2] to-[#7f4ed3] px-[2rem] lg:px-[6rem] rounded-[20px] flex flex-col lg:flex-row items-center justify-center '
        style={{
          gap: `${gap}px`,
          paddingBottom: isTablet || isMobile ? '23px' : `${parentPaddingVertical}px`,
          paddingTop: `${parentPaddingVertical}px`,
        }}>
        <div className='flex  gap-[20px]'>
          <h1
            className='capitalize font-bold'
            style={{
              fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`
            }}>найди</h1>
          <h1
            className='font-bold z-20 relative -rotate-2'
            style={{
              fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`
            }}
          >
            себя
            <img src={spray}
                 className='absolute -z-10 -top-[30%] -left-[10%] xl:-top-[25%] xl:-left-[8%] '
                 style={{minWidth: isTablet || isMobile ? `${spraySizeMobile}px` : `${spraySize}px`}}/>
          </h1>
        </div>
        <PrimaryButton
          title='Попробовать бесплатно'
          titleClassName='text-[white] whitespace-nowrap'
          titleStyle={{
            fontSize: isTablet || isMobile ? `${buttonFontSizeMobile}px` : `${buttonFontSize}px`
          }}
          isIcon={false}
          className=' bg-[#0c0d0f] w-full lg:w-fit max-w-[750px]  px-[42px] '
          style={{
            paddingTop: isTablet || isMobile ? `${buttonPaddingVerticalMobile}px` : `${buttonPaddingVertical}px`,
            paddingBottom: isTablet || isMobile ? `${buttonPaddingVerticalMobile}px` : `${buttonPaddingVertical}px`,
            borderRadius: `${borderRadiusMobile}px`,
          }}
        />
      </div>
    </>
  )
})
export default VioletCTA;

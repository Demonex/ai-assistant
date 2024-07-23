import {useSizes} from "../../../hooks/useSizes.js";
import PrimaryButton from "../../../components/PrimaryButton.js";
import spray from '../../../assets/png/sprayBlack.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {memo} from "react";

const PinkCTA = memo(() => {
  const {elementRange, isMobile, isTablet} = useSizes();
  const {elementRange:elementRangeLaptop} = useSizes(1024, 2560);
  const {elementRange:elementRangeMobile} = useSizes(320, 768);
  const { h1SizeMobile, borderRadiusMobile, } = useElementRangeSize()
  const parentPaddingVertical = elementRange(81, 162);
  const h1Size = elementRangeLaptop(36, 84);
  const spraySize = elementRange(70, 380);
  const buttonPaddingVertical = elementRange(16, 34);
  const buttonPaddingHorizontal = elementRange(42/2, 42);
  const gap = elementRange(30, 185);
  const spraySizeMobile = elementRangeMobile(130, 300);
  const buttonPaddingVerticalMobile = elementRangeMobile(22, 43);
  const buttonFontSizeMobile = elementRangeMobile(16, 43);
  const buttonFontSize = elementRangeLaptop(56/2, 56);


  return (
    <>
      <div
        className='w-full animated-gradient px-[2rem] lg:px-[6rem] rounded-[20px] flex flex-col lg:flex-row items-center justify-center '
        style={{
          gap: `${gap}px`,
          paddingBottom: isTablet || isMobile ? '23px' : `${parentPaddingVertical}px`,
          paddingTop: `${parentPaddingVertical}px`,
        }}>
        <div className='flex gap-3.5 xl:gap-[20px] flex-wrap lg:flex-nowrap justify-center'>
          <h1
            className='capitalize font-bold w-full lg:w-fit text-center -mb-5'
            style={{
              fontSize: isTablet || isMobile ?  `${h1SizeMobile}px` :`${h1Size}px`,
              lineHeight: '120%'
            }}>открой</h1>
          <h1
            className='font-bold z-20 relative -rotate-2'
            style={{
              fontSize: isTablet || isMobile ?  `${h1SizeMobile}px` :`${h1Size}px`,
          }}
          >
            секрет
            <img src={spray}
                 className='absolute -z-10 -top-[50%] -left-[10%] lg:-top-[50%] lg:-left-[6%]'
                 style={{minWidth: isTablet || isMobile ? `${spraySizeMobile}px` : `${spraySize}px`}}/>
          </h1>
          <h1
            className=' font-bold '
            style={{
              fontSize: isTablet || isMobile ?  `${h1SizeMobile}px` :`${h1Size}px`
          }}>успеха</h1>
        </div>
        <PrimaryButton
          title='Попробовать бесплатно'
          titleStyle={{
            fontSize: isTablet || isMobile ? `${buttonFontSizeMobile}px` : `${buttonFontSize}px`
          }}
          isIcon={false}
          titleClassName='font-bold text-[#000000] whitespace-nowrap'
          className=' bg-[#e4fd44] hover:scale-105 transition-all duration-300 w-full lg:w-fit lg:max-w-[750px] '
          style={{
            paddingTop: isTablet || isMobile ? `${buttonPaddingVerticalMobile}px` : `${buttonPaddingVertical}px`,
            paddingBottom: isTablet || isMobile ? `${buttonPaddingVerticalMobile}px` : `${buttonPaddingVertical}px`,
            paddingRight: isTablet || isMobile ? `${buttonPaddingVerticalMobile}px` : `${buttonPaddingHorizontal}px`,
            paddingLeft: isTablet || isMobile ? `${buttonPaddingVerticalMobile}px` : `${buttonPaddingHorizontal}px`,
            borderRadius: `${borderRadiusMobile}px`,
          }}
        />
      </div>
    </>
  )
})
export default PinkCTA;

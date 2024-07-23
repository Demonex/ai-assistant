import {useSizes} from "../../../hooks/useSizes.js";
import PrimaryButton from "../../../components/PrimaryButton.js";
import spray from '/assets/png/sprayBlack.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {memo} from "react";

const PinkCTA = memo(() => {
  const {elementRange, isMobile, isTablet} = useSizes();
  const {elementRange:elementRangeLaptop} = useSizes(1024, 2560);
  const {elementRange:elementRangeMobile} = useSizes(320, 768);
  const { h1SizeMobile, marginVertical,paddingHorizontal } = useElementRangeSize()
  const h1Size = elementRangeLaptop(36, 84);
  const spraySize = elementRange(70, 310);
  const gap = elementRangeLaptop(30, 185);
  const gapVertical = elementRangeMobile(30, 60);
  const spraySizeMobile = elementRangeMobile(110, 190);
  const buttonFontSize = elementRangeLaptop(20, 32);


  return (
    <div
        style={{
            marginBottom: `${marginVertical}px`,
            marginTop: `${marginVertical}px`,
            paddingLeft:`${paddingHorizontal}px`,
            paddingRight:`${paddingHorizontal}px`,
        }}
        className='w-full'>
      <div
        className='w-full animated-gradient-blue px-5 md:px-[3.375rem] lg:px-[6rem] rounded-[20px] flex flex-col lg:flex-row items-center justify-center py-5 pb-4  md:py-[4.375rem] lg:py-[8.125rem]'
        style={{
          gap: isMobile || isTablet ? `${gapVertical}px` : `${gap}px`,
        }}>
          <div className='flex gap-[1.25rem] xl:gap-[20px] flex-wrap lg:flex-nowrap justify-center'>
              <h1
                  className=' font-bold md:font-black text-h2Desctop  text-center flex gap-5'
                  style={{
                      fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
                  }}>Открой
              </h1>
              <h1

                  className=' z-20 relative  font-bold md:font-black text-h2Desctop flex'
                  style={{
                      fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
                  }}
              >
            секрет
            <img src={spray}
                 className='absolute -z-10 -top-[85%] -left-[3%] lg:-top-[90%]'
                 style={{width: isTablet || isMobile ? `${spraySizeMobile}px` : `${spraySize}px`}}/>
                  &nbsp;успеха
          </h1>
          </div>
          <PrimaryButton
              title='Попробовать бесплатно'
              titleStyle={{
                  fontSize: `${buttonFontSize}px`
              }}
              isIcon={false}
              titleClassName='font-medium md:font-bold text-[#000000] whitespace-nowrap font-regular text-[1.375rem] lg:text-h3Desctop'
              className=' bg-secondary_green hover:scale-105 transition-all duration-300 w-full lg:w-fit lg:max-w-[523px] rounded-[12px] md:rounded-[20px] py-5 md:py-8 px-[3.75rem]'

          />
      </div>
    </div>
  )
})
export default PinkCTA;

import bg from '/assets/png/TELEGRAM.png'
import bg_mob from '/assets/png/telega-mob@3x.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import PrimaryButton from "../../../components/PrimaryButton.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {memo} from "react";

const Telegram = memo(() => {
  const {isTablet, isMobile} = useSizes();
  const {h1SizeMobile, borderRadiusMobile, buttonFontSizeMobile, buttonFontSize} = useElementRangeSize();
  const {elementRange: elementRangeTablet} = useSizes(1024, 2560);
  const {elementRange: elementRangeMobile} = useSizes(320, 1023);
  const imageHeight = elementRangeTablet(386, 930);
  const imageHeightMobile = elementRangeMobile(420, 1200);
  const buttonPaddingVertical = elementRangeTablet(16, 34);
  const buttonPaddingVerticalMobile = elementRangeMobile(16, 40);
  const h1Size = elementRangeTablet(38, 84);
  const paddingTop = elementRangeMobile(58/2, 58);
  const paddingBottom = elementRangeTablet(82, 163);
  const paddingBottomMobile = elementRangeMobile(11, 22);
  const buttonPaddingHorizontal = elementRangeTablet(60, 120);
  const paddingHorizontal= elementRangeMobile(22, 54);

  return (
    <div className='w-full  box-border'>
      <div
        className='w-full h-full bg-cover bg-no-repeat bg-center flex flex-col lg:justify-center '
        style={{
          backgroundImage: isTablet|| isMobile ? `url(${bg_mob})` : `url(${bg})`,
          height: isTablet || isMobile ? `${imageHeightMobile}px` : `${imageHeight}px`,
          borderRadius: `${borderRadiusMobile}px`
        }}>
        <div
          style={{
            // marginLeft: isMobile || isTablet ? '0px':`${marginText}px`,
            paddingTop: `${paddingTop}px`,
            paddingBottom: isTablet || isMobile ?`${paddingBottomMobile}px` :`${paddingBottom}px` ,
            paddingRight: `${paddingHorizontal}px`,
            paddingLeft: `${paddingHorizontal}px`,
            justifyContent: 'space-between',
        }}
          className='flex h-full flex-col items-center lg:items-start'>
          <h1
            style={{
              fontSize: isTablet|| isMobile ?  `${h1SizeMobile}px`: `${h1Size}px`,
              lineHeight:'120%'
            }}
            className='font-bold'>Новые релизы сервиса<br/> и&nbsp;интересные новости{ isMobile ? null :<br/>} в&nbsp;нашем
            телеграм{ isMobile ? null :<br/>}  канале</h1>
          <PrimaryButton
            title='подписаться'
            titleStyle={{
              fontSize: isTablet || isMobile ? `${buttonFontSizeMobile}px` : `${buttonFontSize}px`,
            }}
            isIcon={false}
            className='bg-[#E4FF29] w-full lg:w-fit'
            style={{
              // width:`${buttonWidth}px`,
              paddingTop: isTablet || isMobile ? `${buttonPaddingVerticalMobile}px` :  `${buttonPaddingVertical}px`,
              paddingBottom: isTablet || isMobile ? `${buttonPaddingVerticalMobile}px` :  `${buttonPaddingVertical}px`,
              paddingLeft: `${buttonPaddingHorizontal}px`,
              paddingRight: `${buttonPaddingHorizontal}px`,
              borderRadius: `${borderRadiusMobile}px`,
            }}
            titleClassName='text-[black] capitalize'/>
        </div>
      </div>
    </div>
  )
})
export default Telegram

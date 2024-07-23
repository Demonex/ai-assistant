import {useSizes} from "../../../hooks/useSizes.js";
import {SvgLogo} from "../../../assets/svg/Logo.js";
import PrimaryButton from "../../../components/PrimaryButton.js";
import spray from '../../../assets/png/Rectangle 2@2x.png'
import iphone from '../../../assets/png/iphoneWelcomeScreen.png'
import RRR from '../../../assets/png/RRRRR@3x.png'
import phoneMobile from '../../../assets/png/welcomScreenMobImg@3x.png'
import {ShowOnLaptopToDesktop} from "../../../components/SowOnLaptopToDeckTop/index.js";
import {ShowOnMobileToTablet} from "../../../components/showFromMobileToTablet/index.js";
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {memo} from "react";

const WelcomeScreen = memo(() => {

  const {elementRange, isMobile, isTablet} = useSizes();
  const {elementRange: elementRangeLaptop} = useSizes(768, 2560);
  const {elementRange: elementRangeMobile} = useSizes(320, 768);
  const {borderRadiusMobile} = useElementRangeSize();
  const RSize = elementRange(300, 1910);
  const phoneMobileSize = elementRangeMobile(270, 540);
  const h1Size = elementRange(32, 101);
  const pSize = elementRange(12, 36);
  const pSizeMobile = elementRange(16, 36);
  const buttonPaddingVertical = elementRange(12, 30);
  const buttonPaddingVerticalMobile = elementRangeMobile(16, 47);
  const buttonFontSizeMobile = elementRangeMobile(20, 40);
  const buttonPaddingHorizontal = elementRange(10, 43);
  const logoSize = elementRange(68, 111);
  const spraySize = elementRange(200, 600);
  const iphoneSize = elementRange(180, 1140);
  const leftSectionMarginTop = elementRangeLaptop(0, 180);
  const inputMarginTop = elementRangeLaptop(10, 63);
  const inputMarginTopMobile = elementRangeMobile(12, 36);
  const paragraphMarginTop = elementRangeLaptop(10, 45);
  return (
    <>
      <div
        className='w-full flex items-start justify-between mt-[2.12rem] md:mt-[4.25rem] lg:mt-[5.5rem] 4xl:mt-[6.25rem] gap-[16px] xl:gap-[50px] 4xl:gap-[75px]'>
        <div className='leftSection w-full ' style={{marginTop: `${leftSectionMarginTop}px`}}>
          <div className='  '>
            <div className='flex gap-[6%] xl:gap-[3%]'>
              <h1
                style={{
                  fontSize: `${h1Size}px`,
                  lineHeight: '120%'
                }}
                className='font-black z-10 relative text-[#111111] max-w-[31rem] -rotate-2'>
                <img src={spray} style={{width: `${spraySize}px`, minWidth: `${spraySize}px`}}
                     className='absolute -z-10 -top-[35%] -left-[2%] '/>

                Управляй</h1>
              <h1
                style={{
                  fontSize: `${h1Size}px`,
                  lineHeight: '120%'
                }}
                className='font-black'> своей</h1>
            </div>
            <h1
              style={{
                fontSize: `${h1Size}px`,
                lineHeight: '120%'
              }}
              className='font-black'> музыкальной <br/>карьерой </h1>
          </div>
          <ShowOnMobileToTablet>
            <div className='w-full flex justify-center mt-8'>
              <img src={phoneMobile} style={{width: `${phoneMobileSize}px`}}/>
            </div>
          </ShowOnMobileToTablet>
          <div className='flex items-start flex-col ' style={{marginTop: `${paragraphMarginTop}px`}}>
            <div className='flex'>
              <SvgLogo fill='#cccccd' style={{width: `${logoSize}px`}}/>
              <p className='text-[#cccccd]'
                 style={{fontSize: isMobile || isTablet ? `${pSizeMobile}px` :`${pSize}px`}}>&nbsp;— сервис аналитики данных</p>
            </div>
            <p className='text-[#cccccd] p_line_unset' style={{fontSize:  isMobile || isTablet ? `${pSizeMobile}px` :`${pSize}px`}}><br/>для
              представителей
              музыкальной{isMobile || isTablet ? null : <br/>} индустрии</p>
          </div>
          <ShowOnMobileToTablet>
            <div className='flex flex-col gap-3 md:gap-6'>
              <div
                className='inputParent flex border border-[#333333] '
                style={{marginTop: `${inputMarginTopMobile}px`, borderRadius: `${borderRadiusMobile}px`,}}>
                <input
                  className='w-full min-w-[170px] ml-5 md:ml-11 placeholder:text-darkGray/40 text-[16px] md:text-[32px]'
                  placeholder='Введи свой e-mail'
                  type='email'
                  style={{
                    paddingTop: `${buttonPaddingVerticalMobile}px`,
                    paddingBottom: `${buttonPaddingVerticalMobile}px`,
                  }}
                />
              </div>
            <PrimaryButton
              title='Попробовать бесплатно'
              titleClassName='whitespace-nowrap font-black leading-none'
              titleStyle={{fontSize:`${buttonFontSizeMobile}px`}}
              className='hover:scale-105 transition-all duration-300 bg-blue w-full'
              isIcon={false}
              style={{
                paddingTop: `${buttonPaddingVerticalMobile}px`,
                paddingBottom: `${buttonPaddingVerticalMobile}px`,
                borderRadius: `${borderRadiusMobile}px`,
              }}
            />
            </div>
          </ShowOnMobileToTablet>
          <ShowOnLaptopToDesktop>
            <div
              className='inputParent flex py-2 4xl:py-4 px-2 4xl:px-4 border border-[#333333] rounded-[20px]'
              style={{marginTop: `${inputMarginTop}px`}}>
              <input
                className='w-full min-w-[170px] ml-2 lg:ml-4 4xl:ml-8 placeholder:text-darkGray/40 text-sm lg:text-base xl:text-2xl placeholder:text-sm lg:placeholder:text-base xl:placeholder:text-2xl'
                placeholder='Введи свой e-mail' type='email'/>
              <PrimaryButton
                title='Попробовать бесплатно'
                titleClassName='text-xs lg:text-base xl:text-xl whitespace-nowrap font-black'
                className='rounded-[20px] hover:scale-105 transition-all duration-300 bg-blue'
                isIcon={false}
                style={{
                  paddingTop: `${buttonPaddingVertical}px`,
                  paddingBottom: `${buttonPaddingVertical}px`,
                  paddingLeft: `${buttonPaddingHorizontal}px`,
                  paddingRight: `${buttonPaddingHorizontal}px`,

                }}
              />
            </div>
          </ShowOnLaptopToDesktop>
        </div>
        <ShowOnLaptopToDesktop>
          <div className='rightSection w-full relative'>
            <img src={iphone} style={{width: `${iphoneSize}px`}}/>
          </div>
        </ShowOnLaptopToDesktop>
        <img src={RRR} className='absolute top-0 right-0 max-h-[1910px] -z-10' style={{height: `${RSize}px`}}/>
      </div>
    </>
  )
})
export default WelcomeScreen

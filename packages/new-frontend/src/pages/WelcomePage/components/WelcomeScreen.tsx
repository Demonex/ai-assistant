import {useSizes} from "../../../hooks/useSizes.js";
import PrimaryButton from "../../../components/PrimaryButton.js";
import iphone from '/assets/png/iphoneWelcomeScreen 1.png'
import RRR from '/assets/png/RRRRR@3x.png'
import {ShowOnLaptopToDesktop} from "../../../components/SowOnLaptopToDeckTop/index.js";
import {ShowOnMobileToTablet} from "../../../components/showFromMobileToTablet/index.js";
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import React, {memo} from "react";
import LogoNew from "../../../../public/assets/svg/LogoNew.js";

const WelcomeScreen = memo(() => {
  const {elementRange, isMobile, isTablet} = useSizes();
  const {elementRange: elementRangeLaptop} = useSizes(1024, 1920);
  const {elementRange: elementRangeMobile} = useSizes(320, 768);
  const {borderRadiusMobile, marginVertical, paddingHorizontal } = useElementRangeSize();
  const RSize = elementRange(300, 1910);
  const h1Size = elementRangeLaptop(56, 75);
  const h1SizeMobile = elementRangeMobile(32, 56);
  const pSize = elementRange(16, 24);
  const buttonPaddingVerticalMobile = elementRangeMobile(16, 47);
  const logoSize = elementRange(68, 111);

  const iphoneSize = elementRangeLaptop(370, 800);

  const leftSectionMarginTop = elementRangeLaptop(0, 140);
  const inputMarginTop = elementRangeLaptop(10, 63);
  const inputMarginTopMobile = elementRangeMobile(12, 36);
  const gapBetweenSections = elementRangeLaptop(5, 10.3);


  return (
    <>
      <div
        className='w-full flex items-start justify-between'
        style={{
          marginTop:`${marginVertical}px`,
          marginBottom:`${marginVertical}px`,
          paddingLeft:`${paddingHorizontal}px`,
          paddingRight:`${paddingHorizontal}px`,
          gap: `${gapBetweenSections}rem`,
        }}
      >
        <div className='leftSection w-full flex flex-col gap-8  justify-start'
             style={{
               marginTop: `${leftSectionMarginTop}px`
        }}>
          <div className=''>
            <div className='flex gap-[3%]'>
              <h1
                style={{
                  fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
                }}
                className='text-h1Desctop relative z-10 text-[#111111] -rotate-2'>
                <div className="">
                  <div className='w-full h-full bg-yellow absolute -z-10 p-1 -left-1 -top-1 box-content rounded-[18px]'/>
                  <div className="absolute w-5 h-5 bg-yellow-50 -right-2.5 -bottom-2.5 -z-20"/>
                </div>
                {/*<img src={spray} style={{width: `${spraySize}px`, minWidth: `${spraySize}px`}}
                     className='absolute -z-10 -top-[35%] -left-[2%] '/>*/}

                Управляй
              </h1>
              <h1
                style={{
                  fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
                }}
                className='text-h1Desctop'>своей</h1>
            </div>
            <h1
              style={{
                fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
              }}
              className='text-h1Desctop'> музыкальной {isMobile || isTablet ? null : <br/>}карьерой </h1>
          </div>
          <div className='flex items-start flex-col ' >
            <div className='flex'>
              <LogoNew width={`${logoSize}px`}/>
              <p className=' text-t1Regular'
                 style={{fontSize: `${pSize}px`}}>&nbsp;— сервис аналитики
                данных</p>
            </div>
            <p className=' p_line_unset text-t1Regular'
               style={{fontSize:`${pSize}px`}}><br/>для
              представителей
              музыкальной индустрии</p>
          </div>
          <ShowOnMobileToTablet>
            <div className='flex flex-col gap-3 md:gap-6'>
              <div
                className='inputParent flex border border-dark_grey bg-[transparent] rounded-[12px]'
                style={{marginTop: `${inputMarginTopMobile}px`, }}>
                <input
                  className='w-full min-w-[170px] placeholder:text-medium_grey text-t2Regular bg-[transparent] !focus:outline-none border-none focus:ring-0 py-4 px-6 '
                  placeholder='Введи e-mail'
                  type='email'
                />
              </div>
              <PrimaryButton
                title='Попробовать бесплатно'
                titleClassName='text-btnText whitespace-nowrap'
                className='rounded-[12px] hover:scale-105 transition-all duration-300 bg-primary_blue py-4 px-8'
                isIcon={false}
              />
            </div>
          </ShowOnMobileToTablet>
          <ShowOnLaptopToDesktop>
            <div
              className='inputParent flex py-2 px-2 border border-dark_grey rounded-[16px] max-w-[42.5rem] '
            >
              <input
                className='w-full placeholder:text-medium_grey text-ht2Regular placeholder:text-ht2Regular bg-[transparent] border-none !focus:outline-none  focus:ring-0 '
                placeholder='Введи e-mail' type='email'/>
              <PrimaryButton
                title='Попробовать бесплатно'
                titleClassName='text-btnText whitespace-nowrap'
                className='rounded-[12px] hover:scale-105 transition-all duration-300 bg-primary_blue py-4 px-8'
                isIcon={false}
              />
            </div>
          </ShowOnLaptopToDesktop>
        </div>
        <ShowOnLaptopToDesktop>
          <div className='rightSection w-full relative'>
            <img src={iphone} style={{width: `${iphoneSize}px`}}/>
          </div>
        </ShowOnLaptopToDesktop>
        <img src={RRR} className='absolute top-0 right-0 max-h-[1910px] '
             style={{
               height: `${RSize}px`,
               zIndex: '-1'
             }}/>
      </div>
    </>
  )
})
export default WelcomeScreen

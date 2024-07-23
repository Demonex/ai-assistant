import logo from '../../assets/svg/Logo.svg';
import cases from '../../assets/svg/cases.svg';
import platforms from '../../assets/svg/platforms.svg';
import prices from '../../assets/svg/tarifs.svg';
import labels from '../../assets/svg/labels.svg';
import burger from '../../assets/png/burger@3x.png';
import media from '../../assets/png/media@3x.png';
import {useSizes} from "../../hooks/useSizes.js";
import PrimaryButton from "../PrimaryButton.js";
import {ShowOnLaptopToDesktop} from "../SowOnLaptopToDeckTop/index.js";
import {useElementRangeSize} from "../../hooks/useElementRangeSize.js";
import {memo} from "react";

const tabs = [
  {
    icon: platforms,
    title: 'платформы',

  },
  {
    icon: cases,
    title: 'кейсы',

  },

  {
    icon: prices,
    title: 'тарифы',

  },
  {
    icon: labels,
    title: 'лейблам',

  },
  {
    icon: media,
    title: 'медиа',
  },

]

const Header = memo(() => {
  const {isTablet, isMobile, elementRange} = useSizes();
  const {elementRange: elementRangeLaptop} = useSizes(1024, 2560);
  const {elementRange: elementRangeMobile} = useSizes(320, 1023);
  const logoWidth = elementRange(65, 131);
  const iconsWidth = elementRangeLaptop(16, 30);
  const paddingHorizontal = elementRange(12, 65);
  const gapTabs = elementRangeLaptop(1.5, 5.25);
  const gapHeader = elementRange(1.5, 3.1);
  const secundaryText = elementRange(12, 18);
  const buttonPaddingHorizontal = elementRangeLaptop(12, 49);
  const buttonPaddingVertical = elementRangeLaptop(12, 23);
  const inputPaddingHorizontal = elementRangeLaptop(10, 35);
  const burgerSize = elementRangeMobile(18, 30);
  const {borderRadiusMobile} = useElementRangeSize()

  return (
    <div className='w-full py-[1.56rem] flex lg:border-b-2 lg:border-[#1b1e23]' style={{
      paddingLeft: `${paddingHorizontal}px`,
      paddingRight: `${paddingHorizontal}px`
    }}>
      <div className='flex w-full items-center' style={{gap: `${gapHeader}rem`}}>
        <img src={logo} alt='logo' style={{
          width: `${logoWidth}px`,
        }}/>
        <ShowOnLaptopToDesktop>
          <ol className='Tabs w-full flex items-center' style={{gap: `${gapTabs}rem`}}>
            {
              tabs.map((tab, index) => (
                <li
                  className='tab flex items-center justify-center gap-2'
                  key={index}>
                  <img
                    className='max-w-[unset]'
                    src={tab.icon} style={{
                    height: `${iconsWidth}px`
                  }}/>
                  <div className='flex flex-col w-full'>
                    <p className={`font-medium capitalize  whitespace-nowrap`} style={{fontSize: `${secundaryText}px`}}
                    >
                      {tab.title}
                    </p>
                  </div>
                </li>
              ))
            }
          </ol>
        </ShowOnLaptopToDesktop>
        <div
          className='account flex-grow flex w-full items-center justify-end gap-[1.5rem] xl:gap-[2.5rem] 4xl:gap-[3.44rem]'>
          {
            isTablet || isMobile
              ? <img src={burger} style={{height: `${burgerSize}px`}}/>
              : <div className='w-full flex items-center gap-[1.125rem] xl:gap-[2.125rem] 3xl:gap-[3.125rem]'>
                <div className='flex-grow'>
                  <input
                    style={{
                      fontSize: `${secundaryText}px`,
                      paddingLeft: `${inputPaddingHorizontal}px`,
                      paddingRight: `${inputPaddingHorizontal}px`,
                      paddingBottom: `${buttonPaddingVertical}px`,
                      paddingTop: `${buttonPaddingVertical}px`,
                      borderRadius: `${borderRadiusMobile}px`,

                    }}
                    placeholder='Найти исполнителя'
                    className='w-full border border-solid border-[#333333] rounded-[8px]  3xl:rounded-[12px]  placeholder:text-[#6c6c6c] '
                    type='text'/>
                </div>
                <div className='flex gap-4'>
                  <PrimaryButton
                    style={{
                      paddingRight: `${buttonPaddingHorizontal}px`,
                      paddingLeft: `${buttonPaddingHorizontal}px`,
                      paddingBottom: `${buttonPaddingVertical}px`,
                      paddingTop: `${buttonPaddingVertical}px`,
                      borderRadius: `${borderRadiusMobile}px`,
                    }}
                    className='  3xl:rounded-[12px] bg-[#0a5dfc]'
                    titleClassName='font-medium capitalize'
                    title='зарегистрироваться'
                    titleStyle={{
                      fontSize: `${secundaryText}px`,
                    }}
                    isIcon={false}/>
                  <PrimaryButton
                    style={{
                      paddingRight: `${buttonPaddingHorizontal}px`,
                      paddingLeft: `${buttonPaddingHorizontal}px`,
                      paddingBottom: `${buttonPaddingVertical}px`,
                      paddingTop: `${buttonPaddingVertical}px`,
                      borderRadius: `${borderRadiusMobile}px`,

                    }}
                    className=' rounded-[8px]  3xl:rounded-[12px] bg-[transparent] border border-solid border-[#333333]'
                    titleClassName='font-medium capitalize'
                    titleStyle={{
                      fontSize: `${secundaryText}px`,
                    }}
                    title='войти'
                    isIcon={false}/>
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  )
})
export default Header

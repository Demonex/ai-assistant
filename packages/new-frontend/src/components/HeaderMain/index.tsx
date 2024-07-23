import burger from '/assets/png/burger@3x.png';
import {useSizes} from "../../hooks/useSizes.js";
import PrimaryButton from "../PrimaryButton.js";
import {ShowOnLaptopToDesktop} from "../SowOnLaptopToDeckTop/index.js";
import React, {memo, useCallback, useState} from "react";
import {Link} from "wouter";
import {useAccount} from "../Header/hooks/useAccount.js";
import {SearchBar} from "../Header/components/SearchField/index.js";
import {useMobileMenu} from "../Header/components/MobileMenu/hooks/useMobileMenu.js";
import {MobileMenu} from "../Header/components/MobileMenu/index.js";
import {useHeaderAccountMenu} from "../Header/hooks/useAccountMenu.js";
import {DropdownAccountMenu} from "../Header/components/DropdownAccountMenu.js";
import LogoNew from "../../../public/assets/svg/LogoNew.js";
import PlatformsNew from "../../../public/assets/svg/PlatformsNew.js";
import CasesNew from "../../../public/assets/svg/CasesNew.js";
import TariffesNew from "../../../public/assets/svg/TariffesNew.js";
import LabelsNew from "../../../public/assets/svg/LabelsNew.js";
import MediaNew from "../../../public/assets/svg/MediaNew.js";
import SearchIcon from "../../../public/assets/svg/SearchIcon.js";
import Burger from "../../../public/assets/svg/BurgerNew.js";

const tabs = [
  {
    icon: <PlatformsNew width='100%' height='100%'/>,
    title: 'платформы',

  },
  {
    icon: <CasesNew width='100%' height='100%'/>,
    title: 'кейсы',

  },

  {
    icon: <TariffesNew width='100%' height='100%'/>,
    title: 'тарифы',

  },
  {
    icon: <LabelsNew width='100%' height='100%'/>,
    title: 'лейблам',

  },
  {
    icon: <MediaNew width='100%' height='100%'/>,
    title: 'медиа',
  },

]
export const Unauthorised = memo(() => {
    return (
      <div className='flex gap-4'>
        <Link to='/sign-in'>
          <PrimaryButton
            className='rounded-[12px] bg-primary_blue px-8 py-4'
            titleClassName='font-medium capitalize btnText'
            title='войти'
            isIcon={false}/>
        </Link>

      </div>
    );
  }
);
export const Authorised = memo(() => {
  const {toggleMenu} = useHeaderAccountMenu();
  return (
    <div className="relative">
      <div className="flex items-center lg:border-l sm:pl-0 lg:ml-6 lg:pl-6 sm:border-0 border-slate-800/50">
        <a href="#" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="w-6 h-6">
            <path className="stroke-slate-500" strokeLinecap="round" strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
          </svg>
        </a>
        <div className="relative z-10">
          <div className="ml-6 text-slate-400 hover:text-slate-300" onClick={toggleMenu}>
            <img
              className="inline-block h-6 w-6 rounded-full cursor-pointer"
              src="https://images.unsplash.com/photo-1526137847469-9ffd50fa0fa0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=ian-e-3GuaLSVJFmo-unsplash.jpg&w=640"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
});

const Header = memo(() => {
  const {
    profile
  } = useAccount();
  const {isTablet, isMobile, elementRange} = useSizes();
  const {elementRange: elementRangeLaptop} = useSizes(1024, 1920);
  const {elementRange: elementRangeMobile} = useSizes(320, 1023);
  const logoWidth = elementRange(97, 106);
  const logoWidthMobile = elementRangeMobile(71, 106);
  const iconsWidth = elementRangeLaptop(20, 20);
  const gapTabs = elementRangeLaptop(1.5, 3.75);
  const gapHeader = elementRangeLaptop(1.87, 3.125);
  const secundaryText = elementRange(16, 18);
  const burgerSize = elementRangeMobile(27, 44);
  const searchTextWidth = elementRangeLaptop(100, 250);
  const [isOpen, setIsOpen] = useState(false);
  const {setIsOpen: setIsOpenMobileMenu} = useMobileMenu();

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  return (
    <div className='w-full py-4 px-4 pb-3 md:py-5 md:px-8 lg:py-6 lg:px-11 flex border-b border-[#333333]/50 z-30 sticky'>
      <DropdownAccountMenu/>
      <div className='flex w-full items-center'
           style={{gap: `${gapHeader}rem`}}
      >
        <Link to='/' style={{
          minWidth: isMobile || isTablet ? `${logoWidthMobile}px` : ``,
        }}>
          <LogoNew width={`${logoWidth}px`}/>
        </Link>
        <ShowOnLaptopToDesktop>
          <ol className=' w-full flex items-center '
              style={{gap: `${gapTabs}rem`}}
          >
            {
              tabs.map((tab, index) => (
                <li
                  className='tab flex items-center justify-center gap-2'
                  key={index}>
                  <div style={{
                    height: `${iconsWidth}px`,
                    width: `${iconsWidth}px`,
                  }}>{tab.icon}</div>
                  <div className='flex flex-col w-full'>
                    <p className={`font-medium capitalize  whitespace-nowrap`}
                       style={{fontSize: `${secundaryText}px`, lineHeight: '27px'}}
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
              ? <div onClick={() => setIsOpenMobileMenu(true)}><Burger height={`${burgerSize}px`}/></div>
              : <div className='w-full flex items-center justify-end gap-5'>
                  <div
                    className='w-fit xl:w-full border border-solid border-dark_grey flex justify-end xl:justify-between rounded-[12px] px-6 py-4 max-w-[25rem]  gap-3'
                    onClick={openModal}
                  >
                    <span
                      style={{
                        maxWidth: `${searchTextWidth}px`,
                        fontSize: `${secundaryText}px`
                      }}
                      className='w-full text-medium_grey hidden xl:block ellipsis whitespace-nowrap '>Найти исполнителя</span>
                    <SearchIcon width='1.375rem'/>
                  </div>
                <SearchBar isOpen={isOpen} closeModal={closeModal}/>
                {
                  profile !== undefined
                    ? <Authorised/>
                    : <Unauthorised/>
                }
              </div>
          }
        </div>
      </div>
      <MobileMenu/>
    </div>
  )
})
export default Header

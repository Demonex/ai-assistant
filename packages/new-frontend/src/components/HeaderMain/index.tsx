import {useSizes} from '../../hooks/useSizes.js';
import PrimaryButton from '../PrimaryButton.js';
import {ShowOnLaptopToDesktop} from '../SowOnLaptopToDeckTop/index.js';
import React, {memo, useEffect} from 'react';
import {Link} from 'wouter';
import {useAccount} from '../Header/hooks/useAccount.js';
import {useMobileMenu} from '../Header/components/MobileMenu/hooks/useMobileMenu.js';
import {MobileMenu} from '../Header/components/MobileMenu/index.js';
import {useHeaderAccountMenu} from '../Header/hooks/useAccountMenu.js';
import {DropdownAccountMenu} from '../Header/components/DropdownAccountMenu.js';
import LogoNew from '../../assets/LogoNew.js';
import SearchIcon from '../../assets/SearchIcon.js';
import Burger from '../../assets/BurgerNew.js';
import {useOpenModalSearch} from '../../hooks/useOpenModalSearch.js';
import IconUserAccount from '../../assets/IconUserAccount.js';
import {navbar} from '../../data/consts/navbar.js';
import {Menu} from '../Header/components/Menu.js';
import NotificationIcon from '../../assets/NotificationIcon.js';
import {useLazyFetch} from '../../hooks/useFetch.js';
import {BACKEND_URL} from '../../constants/index.js';


export const Unauthorised = memo(() => {

    const {isOpenSearchModal, setIsOpenSearchModal} = useOpenModalSearch();
    const {setIsOpen: setIsOpenMobileMenu} = useMobileMenu();
    const {profile} = useAccount();
    const {elementRange: elementRangeMobile} = useSizes(320, 1023);
    const burgerSize = elementRangeMobile(27, 44);
    const {isTablet, isMobile} = useSizes();
    return (
      <>
        {
          isTablet || isMobile
            ? <div className="flex gap-5 ">
              <button onClick={() => setIsOpenSearchModal(true)}>
                <SearchIcon color="white" width={40}/>
              </button>
              <Link to={profile ? '/account' : '/form/sign-in'}>
                <IconUserAccount className="fill-white h-10 w-10"/>
              </Link>
              <button onClick={() => setIsOpenMobileMenu(true)}>
                <Burger height={`${burgerSize}px`}/>
              </button>
            </div>
            : <div className="flex gap-6">
              <div
                className="flex items-center justify-center cursor-pointer"
                onClick={() => setIsOpenSearchModal(!isOpenSearchModal)}>
                <SearchIcon width="1.375rem" className="fill-amber-50 hover:fill-medium_grey"/>
              </div>
              <Link to={profile ? '/account' : '/form/sign-in'}>
                <IconUserAccount className="fill-amber-50 hover:fill-medium_grey cursor-pointer"/>
              </Link>
            </div>
        }
      </>

    );
  }
);
export const Authorised = memo(() => {
  const {toggleMenu} = useHeaderAccountMenu();
  const {isOpenSearchModal, setIsOpenSearchModal} = useOpenModalSearch();
  const {setIsOpen: setIsOpenMobileMenu} = useMobileMenu();
  const {profile} = useAccount();
  const {elementRange: elementRangeMobile} = useSizes(320, 1023);
  const burgerSize = elementRangeMobile(27, 44);
  const {isTablet, isMobile} = useSizes();
  console.log('profile', profile);
  return (
    <>
      {
        isTablet || isMobile
          ? <div className="flex gap-4 ">
            <button onClick={() => setIsOpenSearchModal(true)}>
              <SearchIcon color="white" width={30}/>
            </button>
            <NotificationIcon className="stroke-white hover:stroke-medium_grey"/>
            <Link to={'/account'}>
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex justify-center items-center bg-medium_grey">
                {
                  profile.photo && (
                    <img src={profile.photo}/>
                  )
                }
              </div>
            </Link>
            <button onClick={() => setIsOpenMobileMenu(true)}>
              <Burger height={`${burgerSize}px`}/>
            </button>
          </div>
          : <div className="flex gap-6">
            <div
              className="flex items-center justify-center cursor-pointer"
              onClick={() => setIsOpenSearchModal(!isOpenSearchModal)}>
              <SearchIcon width="30" className="fill-amber-50 hover:fill-medium_grey"/>
            </div>
            <NotificationIcon className="stroke-white hover:stroke-medium_grey cursor-pointer"/>
            <Link to={'/account'}>
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex justify-center items-center bg-medium_grey">
                {
                  profile.photo && (
                    <img src={profile.photo}/>
                  )
                }
              </div>
            </Link>
          </div>
      }
    </>
  );
});

const Header = memo(() => {
  const {profile} = useAccount();
  const {isTablet, isMobile, elementRange} = useSizes();
  const {elementRange: elementRangeLaptop} = useSizes(1024, 1920);
  const {elementRange: elementRangeMobile} = useSizes(320, 1023);
  const logoWidth = elementRange(97, 106);
  const logoWidthMobile = elementRangeMobile(71, 106);
  const gapTabs = elementRangeLaptop(1.5, 3.75);
  const gapHeader = elementRangeLaptop(1.5, 3.125);

  const [{data, error}, fetchPayUrl] = useLazyFetch<{
    url: string
  }>({
    url: `${BACKEND_URL}/pay`,
    method: 'get',
    cache: false
  });
  useEffect(() => {
    if(!profile) {
      return;
    }
    fetchPayUrl().catch(console.error);
  }, [profile]);

  console.log('data1', data);

  return (
    <div
      className="w-full py-4 px-4 pb-3 md:py-5 md:px-8 lg:py-6 lg:px-11 flex border-b border-[#333333]/50 z-40 fixed bg-[#0C0C0C] max-h-[68px] md:max-h-[84px] lg:max-h-[96px]">
      <DropdownAccountMenu/>
      <div className="flex w-full items-center"
           style={{gap: `${gapHeader}rem`}}
      >
        <Link to="/" style={{
          minWidth: isMobile || isTablet ? `${logoWidthMobile}px` : ``
        }}>
          <LogoNew width={`${logoWidth}px`}/>
        </Link>
        <ShowOnLaptopToDesktop>
          <ol className=" w-full flex items-center "
              style={{gap: `${gapTabs}rem`}}
          >
            {navbar.map((item, index) => (
              <Menu key={index} title={item.title} items={item.content} icon={item.icon} link={item.link}/>
            ))}
            {
              profile ? (
                <a
                  className={`hidden xl:block ml-2 rounded-[12px] hover:scale-105 transition-all duration-300 bg-primary_blue py-4 px-8 `}
                  href={(data as any)?.url}
                  target="_blank"
                >
                  <p className={'text-btnText whitespace-nowrap'}>Попробовать бесплатно</p>
                </a>
              ) : (
                <PrimaryButton
                  title="Попробовать бесплатно"
                  to="/form/sign-up"
                  titleClassName="text-btnText whitespace-nowrap"
                  className="hidden xl:block ml-2 rounded-[12px] hover:scale-105 transition-all duration-300 bg-primary_blue py-4 px-8"
                  isIcon={false}
                />
              )
            }
          </ol>

        </ShowOnLaptopToDesktop>
        <div
          className="account flex-grow flex w-fit items-center justify-end gap-[1.5rem] xl:gap-[2.5rem] 4xl:gap-[3.44rem] ">
          {
            profile
              ? <Authorised/>
              : <Unauthorised/>
          }
        </div>
      </div>
      <MobileMenu/>
    </div>
  );
});
export default Header;

import {useSizes} from '../../hooks/useSizes.js';
import PrimaryButton from '../PrimaryButton.js';
import {ShowOnLaptopToDesktop} from '../SowOnLaptopToDeckTop/index.js';
import {memo} from 'react';
import {Link} from 'wouter';
import {useAccount} from '../Header/hooks/useAccount.js';
import {MobileMenu} from '../Header/components/MobileMenu/index.js';
import {DropdownAccountMenu} from '../Header/components/DropdownAccountMenu.js';
import LogoNew from '../../assets/LogoNew.js';
import {navbar} from '../../data/consts/navbar.js';
import {Menu} from '../Header/components/Menu.js';
import NotificationsModal from './components/NotificationsModal.js';
import { Authorised } from './components/Authorised.js';
import { Unauthorised } from './components/Unauthorised.js';

const Header = memo(() => {
  const {profile} = useAccount();
  const {isTablet, isMobile, elementRange} = useSizes();
  const {elementRange: elementRangeLaptop} = useSizes(1024, 1920);
  const {elementRange: elementRangeMobile} = useSizes(320, 1023);
  const logoWidth = elementRange(97, 106);
  const logoWidthMobile = elementRangeMobile(71, 106);
  const gapTabs = elementRangeLaptop(1.5, 3.75);
  const gapHeader = elementRangeLaptop(1.5, 3.125);

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
              !profile && (
                <PrimaryButton
                  title="Попробовать бесплатно"
                  to="/auth/sign-up"
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
      <NotificationsModal/>
    </div>
  );
});

export default Header;

import {Dialog} from '@headlessui/react';
import {Accordion} from '../Accordion.js';
import {navbar} from '../../../../data/consts/navbar.js';
import React, {memo, useCallback} from 'react';
import {ShowOnMobileToTablet} from '../../../Sizes/ShowOnMobileToTablet/ShowOnMobileToTablet.js';
import {NavigationItems} from '../../../../pages/ArtistPage/components/Sidebar/Sidebar.js';
import {useMobileMenu} from './hooks/useMobileMenu.js';
import {useArtist} from '../../../../pages/ArtistPage/hooks/useArtist.js';
import {useAccount} from '../../hooks/useAccount.js';
import LogoNew from '../../../../assets/LogoNew.js';
import SearchIcon from '../../../../assets/SearchIcon.js';
import IconUserAccount from '../../../../assets/IconUserAccount.js';
import CloseIcon from '../../../../assets/CloseIcon.js';
import {useOpenModalSearch} from '../../../../hooks/useOpenModalSearch.js';
import PrimaryButton from '../../../PrimaryButton.js';
import {Link} from "wouter";


export const MobileMenu = memo(() => {
  const {isOpen, setIsOpen} = useMobileMenu();
  const {id} = useArtist();
  const {setSubscription,setIsOpenSearchModal,setButtonText,setSubscriptionOnClick,setIsShowAll} = useOpenModalSearch();
  const handleSearchClick = useCallback(() => {
    setSubscription(undefined);
    setButtonText('Перейти');
    setSubscriptionOnClick(false);
    setIsShowAll(true);
    setIsOpenSearchModal(true);
  }, []);
  return (
    <ShowOnMobileToTablet>
      <Dialog as="div" open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 z-50"/>
        <Dialog.Panel
          className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-popup_gray backdrop-blur ">
          <div
            className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 border-b border-medium_grey">
            <div className="w-full">
              <Link to='/'>
                <LogoNew className="max-w-[5.625rem] md:max-w-[6.563rem]"/>
              </Link>
            </div>
            <div className="w-full flex flex-row justify-end gap-4 md:gap-5">
              <button onClick={handleSearchClick}>
                <SearchIcon color="white" width={40}/>
              </button>
              <IconUserAccount className="fill-white h-10 w-10"/>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 noSelect"
                onClick={() => setIsOpen(false)}
              >
                <CloseIcon className="h-10 w-10"/>
              </button>
            </div>
          </div>
          <div className="w-full px-4 md:px-8 py-5 md:py-2">
            {/*{
              profile !== undefined
                  ? <Authorised/>
                  : <Unauthorised/>
            }*/}
            {
              id
                ? <NavigationItems/>
                : null
            }
            <Accordion items={navbar}/>
            <PrimaryButton
              className="py-4 px-8 rounded-xl bg-primary_blue mt-5 w-full md:w-fit"
              titleClassName="text-btnText "
              title="Попробовать бесплатно"
              to="/auth/sign-up"
              isIcon={false}/>
          </div>

        </Dialog.Panel>
      </Dialog>
    </ShowOnMobileToTablet>
  );
});

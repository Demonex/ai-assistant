import {Dialog} from '@headlessui/react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {Search} from '../Search.js';
import {Accordion} from '../Accordion.js';
import {navbar} from '../../../../data/consts/navbar.js';
import React, {memo} from 'react';
import {Authorised, Unauthorised} from '../../Header.js';
import {ShowOnMobileToTablet} from '../../../Sizes/ShowOnMobileToTablet/ShowOnMobileToTablet.js';
import {NavigationItems} from '../../../../pages/ArtistPage/components/Sidebar/Sidebar.js';
import {useMobileMenu} from './hooks/useMobileMenu.js';
import {useArtist} from '../../../../pages/ArtistPage/hooks/useArtist.js';
import {useAccount} from '../../hooks/useAccount.js';


export const MobileMenu = memo(() => {
  const {profile} = useAccount();
  const {isOpen, setIsOpen} = useMobileMenu();
  const {id} = useArtist();

  return (
    <ShowOnMobileToTablet>
      <Dialog as="div" open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 z-50"/>
        <Dialog.Panel
          className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-[#111827]/60 backdrop-blur px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-1">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 noSelect"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" color="white"/>
              </button>
            </div>
          </div>
          <div className="mt-10 space-y-5">
            {
              profile !== undefined
                ? <Authorised/>
                : <Unauthorised/>
            }
            <Search/>
            {
              id
                ? <NavigationItems/>
                : null
            }
            <Accordion items={navbar}/>
          </div>
        </Dialog.Panel>
      </Dialog>
    </ShowOnMobileToTablet>
  );
});

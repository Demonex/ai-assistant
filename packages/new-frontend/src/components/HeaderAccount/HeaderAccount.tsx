import {Link} from 'wouter';
import {Search} from '../Header/components/Search.js';
import {Bars3Icon} from '@heroicons/react/24/outline';
import {ShowOnMobileToTablet} from '../Sizes/ShowOnMobileToTablet/ShowOnMobileToTablet.js';
import {memo} from 'react';
import {Authorised, Unauthorised} from '../Header/Header.js';
import {DropdownAccountMenu} from '../Header/components/DropdownAccountMenu.js';
import {MobileMenu} from '../Header/components/MobileMenu/index.js';
import {useMobileMenu} from '../Header/components/MobileMenu/hooks/useMobileMenu.js';
import {useAccount} from '../Header/hooks/useAccount.js';


export const HeaderAccount = memo(() => {
  const {setIsOpen} = useMobileMenu();
  const {profile,loading,error} = useAccount();
  return (
    <>
      <DropdownAccountMenu/>
      <div
        className="fixed top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b border-slate-50/[0.06] supports-backdrop-blur:bg-white/60 bg-transparent">
        <div className="max-w-8xl mx-auto relative ">
          <div
            className="py-3 border-b lg:px-8 lg:border-0 border-slate-300/10 mx-4 lg:mx-0 ">
            <div className="relative flex items-center justify-between">
              <div
                className="mr-3 flex-none md:w-auto">
                <Link to="/" className="flex flex-row items-center cursor-pointer gap-x-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" x="0px" y="0px"
                       className="w-[30px] h-[30px]">
                    <g>
                      <path fill="#fff"
                            d="M15.80762,3.106a.49281.49281,0,0,0-.42871-.09082l-8,2A.4998.4998,0,0,0,7,5.5v8.01257A2.4757,2.4757,0,0,0,5.5,13,2.5,2.5,0,1,0,8,15.5V8.89014l7-1.75v4.37243A2.4757,2.4757,0,0,0,13.5,11,2.5,2.5,0,1,0,16,13.5V3.5A.50094.50094,0,0,0,15.80762,3.106Z"/>
                    </g>
                  </svg>
                  <h2 className="text-white font-bold text-[20px]">Rifify</h2>
                </Link>
              </div>
              <div className="relative hidden lg:flex items-center">
                <Search placeholder="Search" type="small"/>
                {
                  profile !== undefined
                    ? <Authorised/>
                    : <Unauthorised/>
                }
              </div>
              <ShowOnMobileToTablet>
                <div className="flex">
                  <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-3 text-white noSelect"
                    onClick={() => setIsOpen(true)}
                  >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6 " aria-hidden="true"/>
                  </button>
                </div>
              </ShowOnMobileToTablet>
              <MobileMenu/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

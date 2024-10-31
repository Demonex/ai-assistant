import {Tab, Dialog, Transition} from '@headlessui/react';
import {Fragment, useEffect, useState} from 'react';
import {useLazyFetch} from '../../hooks/useFetch.js';
import {AccountSettings} from './components/Account/AccountSettings.js';
import {Subscriptions} from './components/Account/Subscriptions.js';
import {BACKEND_URL} from '../../constants/index.js';
import {useAccount} from '../../components/Header/hooks/useAccount.js';
import SecondaryButton from '../../components/SecondaryButton.js';
import {SignOutIcon} from '../../assets/SignOutIcon.js';
import SecondaryCloseIcon from "../../assets/SecondaryCloseIcon.js";
import {useLocation} from "wouter";
import {clear} from "use-between";
import PaymentInfo from "./components/Account/PaymentInfo.js";
import Team from "./components/Account/Team.js";
import ManageNotifications from "./components/Account/ManageNotifications.js";
import {accountTabs} from "./consts.js";
import PopupDeleteAccount from "./components/Account/PopupDeleteAccount.js";

export const AccountPage = () => {
  const [location, navigate] = useLocation()
  const {profile} = useAccount();
  const isAuthorized = profile;

  const [{data: signOut}, fetchSignOut] = useLazyFetch({
    url: `${BACKEND_URL}/auth/sign-out`,
    method: 'post',
  });
  const onSubmitSignOut = () => {
    fetchSignOut();
    clear();
    navigate('/auth/sign-in');
  }

  const [selectedIndex, setSelectedIndex] = useState(0);

  return !isAuthorized ? null : (
    <>
      <div className="w-full h-full px-6 overflow-auto">
        <PopupDeleteAccount/>
        <div className="w-full py-4  flex justify-between ">
          <h1 className="text-t1Semi_deck font-extrabold tracking-tight text-slate-200">Аккаунт</h1>
          <SecondaryButton title="Выйти" className="flex flex-row-reverse gap-2" onClick={onSubmitSignOut}>
            <SignOutIcon className="fill-light_grey"/>
          </SecondaryButton>
        </div>
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex} vertical>
          <Tab.List
            className="flex gap-10 border-b border-secondary_dark_gray/50 overflow-x-auto overflow-y-hidden mt-1">
            {
              accountTabs.filter((_, index) => index < 5).map((tab, index) => (
                <div
                  className={`capitalize flex text-t2Regular px-4 py-2 border-solid border-b whitespace-nowrap ${selectedIndex === index ? 'text-medium_grey border-medium_grey' : 'border-transparent '}`}
                  key={index}>
                  <Tab
                  >{tab.title}
                  </Tab>
                </div>
              ))
            }
          </Tab.List>
          <Tab.Panels className="w-full flex justify-center">
            <Tab.Panel className="w-full">
              <AccountSettings />
            </Tab.Panel>
            <Tab.Panel className="w-full">
              <PaymentInfo/>
            </Tab.Panel>
            <Tab.Panel className="w-full">
              <Subscriptions/>
            </Tab.Panel>
            <Tab.Panel className="w-full">
              <Team/>
            </Tab.Panel>
            <Tab.Panel className="w-full">
              <ManageNotifications/>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

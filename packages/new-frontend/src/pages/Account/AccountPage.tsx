import {HeaderAccount} from '../../components/HeaderAccount/HeaderAccount.js';
import {Tab, Dialog, Transition} from '@headlessui/react';
import {Fragment, useState} from 'react';
import {useLazyFetch} from '../../hooks/useFetch.js';
import {navigate} from 'wouter/use-browser-location';
import {AccountSettings} from './components/AccountSettings.js';
import {ProfessionalPlan} from './components/ProfessionalPlan.js';
import {FavoriteSources} from './components/FavoriteSources.js';
import {Subscriptions} from './components/Subscriptions.js';
import {BACKEND_URL} from '../../constants/index.js';
import {useAccount} from '../../components/Header/hooks/useAccount.js';
import Header from "../../components/HeaderMain/index.js";

const accountTabs = [
  {
    title: 'Account'
  },
  {
    title: 'Professional Plan'
  },
  {
    title: 'Favorite Sources'
  },
  {
    title: 'Subscriptions'
  },
  {
    title: 'Notifications'
  },
  {
    title: 'Teams'
  },
  {
    title: 'Integrations'
  },
  {
    title: 'Activities'
  }
];

const Popup = ({setIsPopupOpen, isPopupOpen, onSubmitDelete}) => {

  return (
    <Transition
      show={isPopupOpen}

      as={Fragment}
    >
      <Dialog onClose={() => setIsPopupOpen(false)}
              className="relative z-50"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true"/>
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 flex w-[80%] md:max-w-md  items-center justify-center bg-gradient-to-b from-indigo-500/40 via-indigo-500/30 rounded-xl p-[0.060rem] text-center bg-gray-900 max-h-[15rem]">
            <Dialog.Panel
              className="w-full bg-gray-900 px-6 h-full rounded-xl flex flex-col items-start justify-center">
              <Dialog.Title className="font-bold text-white mb-4 text-xl">Do you really want to delete your
                account?&nbsp; 🥺</Dialog.Title>
              <div className="w-full flex py-3 justify-end gap-4 mt-8">
                <button onClick={() => setIsPopupOpen(false)}
                        className="px-4 py-2 text-white rounded-[8px] border border-indigo-500 text-xs">No, it's mistake
                </button>
                <button
                  type="button"
                  onClick={onSubmitDelete}
                  className="px-4 py-2 text-white rounded-[8px] bg-indigo-400 text-xs">Yes, I do
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>

  );
};
export const AccountPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {profile, setProfile} = useAccount();
  const isAuthorized = profile;

  const [{data: deleteProfile}, fetchDelete] = useLazyFetch({
    url: `${BACKEND_URL}/api/rest/profile/delete`,
    method: 'delete',
    cache: false
  });

  const onSubmitDelete = () => {
    fetchDelete();
    setProfile(deleteProfile);
    navigate('/sign-up');
  };
  const [selectedIndex, setSelectedIndex] = useState(0);

  return !isAuthorized ? null : (
    <>
      <Header/>
      <div className="w-full h-full mt-[35px] py-[3rem] px-[1.25rem] md:px-[2rem] relative">
        <Popup isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} onSubmitDelete={onSubmitDelete}/>
        <div className="w-full mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-200">Settings</h1>
        </div>
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex} vertical>
          <Tab.List className="flex gap-10 border-b border-slate-200/10 overflow-x-auto overflow-y-hidden">
            {
              accountTabs.map((tab, index) => (
                <Tab
                  key={index}
                  className={`capitalize flex text-[16px] leading-6 font-semibold pt-3 pb-2.5 border-b-2 -mb-px  hover:border-slate-700 whitespace-nowrap ${selectedIndex === index ? 'text-indigo-400 border-indigo-500' : 'border-transparent text-slate-200 '}`}
                >{tab.title}</Tab>
              ))
            }
          </Tab.List>
          <Tab.Panels className="w-full py-5 flex justify-center">
            <Tab.Panel className="w-full">
              <AccountSettings setIsPopupOpen={setIsPopupOpen}/>
            </Tab.Panel>
            <Tab.Panel>
              <ProfessionalPlan/>
            </Tab.Panel>
            <Tab.Panel className="w-full">
              <FavoriteSources/>
            </Tab.Panel>
            <Tab.Panel className="w-full">
              <Subscriptions/>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

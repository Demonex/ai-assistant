import {Tab, Dialog, Transition} from '@headlessui/react';
import {Fragment, useState} from 'react';
import {useLazyFetch} from '../../hooks/useFetch.js';
import {navigate} from 'wouter/use-browser-location';
import {AccountSettings} from './components/AccountSettings.js';
import {Subscriptions} from './components/Subscriptions.js';
import {BACKEND_URL} from '../../constants/index.js';
import {useAccount} from '../../components/Header/hooks/useAccount.js';
import Header from '../../components/HeaderMain/index.js';
import SecondaryButton from '../../components/SecondaryButton.js';
import {SignOutIcon} from '../../assets/SignOutIcon.js';

const accountTabs = [
  {
    title: 'Данные аккаунта'
  },
  {
    title: 'Платежная информация'
  },
  {
    title: 'Подписки'
  },
  {
    title: 'Команда'
  },
  {
    title: 'Управление рассылками'
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
              <Dialog.Title className="font-bold text-white mb-4 text-xl">Вы действительно хотите удалить свой
                аккаунт?&nbsp;🥺</Dialog.Title>
              <div className="w-full flex py-3 justify-end gap-4 mt-8">
                <button onClick={() => setIsPopupOpen(false)}
                        className="px-4 py-2 text-white rounded-[8px] border border-indigo-500 text-xs">Нет, это ошибка
                </button>
                <button
                  type="button"
                  onClick={onSubmitDelete}
                  className="px-4 py-2 text-white rounded-[8px] bg-indigo-400 text-xs">Да, это так
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
    url: `${BACKEND_URL}/profile/delete`,
    method: 'delete',
    cache: false
  });
  const [{data: signOut}, fetchSignOut] = useLazyFetch({
    url: `${BACKEND_URL}/auth/sign-out`,
    method: 'post',
  });
  const onSubmitSignOut = () => {
    fetchSignOut();
    setProfile(signOut);
    navigate('/auth/sign-in');
  }
  const onSubmitDelete = () => {
    fetchDelete();
    setProfile(deleteProfile);
    navigate('/auth/sign-up');
  };

  const [selectedIndex, setSelectedIndex] = useState(0);

  return !isAuthorized ? null : (
    <>

      <div className="w-full h-full px-6">
        <Popup isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} onSubmitDelete={onSubmitDelete}/>
        <div className="w-full py-4  flex justify-between ">
          <h1 className="text-t1Semi_deck font-extrabold tracking-tight text-slate-200">Аккаунт</h1>
          <SecondaryButton title="Выйти" className="flex flex-row-reverse gap-2"onClick={onSubmitSignOut}>
            <SignOutIcon className="fill-light_grey"/>
          </SecondaryButton>
        </div>
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex} vertical>
          <Tab.List
            className="flex gap-10 border-b border-secondary_dark_gray/50 overflow-x-auto overflow-y-hidden mt-1">
            {
              accountTabs.map((tab, index) => (
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
              <AccountSettings setIsPopupOpen={setIsPopupOpen}/>
            </Tab.Panel>
            <Tab.Panel className="w-full">
              {null}
            </Tab.Panel>
            <Tab.Panel className="w-full">
              <Subscriptions/>
            </Tab.Panel>
            <Tab.Panel className="w-full">
              {null}
            </Tab.Panel>
            <Tab.Panel className="w-full">
              {null}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

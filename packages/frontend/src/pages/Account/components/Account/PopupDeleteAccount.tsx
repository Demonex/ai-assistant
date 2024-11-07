import {useLocation} from "wouter";
import {useAccountSettings} from "../hooks/useAccountSettings.js";
import {useAccount} from "../../../../components/Header/hooks/useAccount.js";
import {Fragment, useEffect, useState} from "react";
import {useLazyFetch} from "../../../../hooks/useFetch.js";
import {BACKEND_URL} from "../../../../constants/index.js";
import {clear} from "use-between";
import {Dialog, Transition} from "@headlessui/react";
import SecondaryCloseIcon from "../../../../assets/SecondaryCloseIcon.js";
import SecondaryButton from "../../../../components/SecondaryButton.js";

const PopupDeleteAccount = () => {
  const [location, navigate] = useLocation();
  const {openPopupDeleteAccount, setOpenPopupDeleteAccount} = useAccountSettings();
  const {profile} = useAccount();
  console.log('openPopupDeleteAccount,', openPopupDeleteAccount);
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [{data: deleteProfile}, fetchDelete] = useLazyFetch({
    url: `${BACKEND_URL}/profile/delete`,
    method: 'delete',
    cache: false
  });
  const onSubmitDelete = () => {
    fetchDelete();
    clear();
    navigate('/auth/sign-up');
  };
  useEffect(() => {
  }, [profile]);

  const confirmDeleting = () => {
    setAccountDeleted(true);
  }

  return (
    <Transition
      show={openPopupDeleteAccount}
      as={Fragment}
    >
      <Dialog onClose={() => setOpenPopupDeleteAccount(false)}
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
            className="fixed md:top-[8.75rem] left-1/2 -translate-x-1/2  inset-0 flex  items-center justify-center w-full h-full md:max-w-[35rem] md:h-fit ">
            {
              accountDeleted
                ? <Dialog.Panel
                  className="w-full h-full bg-popup_gray md:h-fit md:rounded-xl flex flex-col items-start justify-start md:justify-center p-4 md:p-10">
                  <button className='w-full flex justify-end pb-4' onClick={onSubmitDelete}>
                    <SecondaryCloseIcon className="stroke-white w-7 h-7"/>
                  </button>
                  <Dialog.Title className="text-t1Semi_deck text-left">Аккаунт отправлен на удаление.</Dialog.Title>
                  <div className='my-5'>
                    <p className='text-caption_r_desk text-medium_grey pb-4'>Если передумаешь, напиши в техподдержку в
                      течение 30 дней.</p>
                  </div>
                  <div className="w-full flex justify-end gap-4">
                    <SecondaryButton title='Закрыть' onClick={onSubmitDelete}
                                     className='w-full bg-primary_blue border-none text-white'/>
                  </div>
                </Dialog.Panel>
                : <Dialog.Panel
                  className="w-full md:max-w-[35rem] bg-popup_gray h-full md:h-fit md:rounded-xl flex flex-col items-start justify-start md:justify-center p-4 md:p-10">
                  <button className='w-full flex justify-end pb-4'>
                    <SecondaryCloseIcon className="stroke-white w-7 h-7"/>
                  </button>
                  <Dialog.Title className="text-t1Semi_deck text-left">Ты действительно хочешь удалить
                    аккаунт?</Dialog.Title>
                  <div className='my-5'>
                    <p className='text-caption_r_desk text-medium_grey pb-4'>Все подписки, привязанные к аккаунту, будут
                      аннулированы.</p>
                  </div>
                  <div className="w-full flex justify-end flex-col md:flex-row gap-4">
                    <SecondaryButton title='Отмена' onClick={() => setOpenPopupDeleteAccount(false)} className='w-full'/>
                    <SecondaryButton title='Удалить' type="button" onClick={confirmDeleting}
                                     className='w-full bg-secondary_red text-white border-none'/>
                  </div>
                </Dialog.Panel>
            }
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>

  );
};
export default PopupDeleteAccount
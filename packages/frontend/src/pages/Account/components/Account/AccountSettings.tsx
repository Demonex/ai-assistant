import {useAccount} from '../../../../components/Header/hooks/useAccount.js';
import {useAccountSettings} from "../hooks/useAccountSettings.js";
import shownPassword from "/assets/svg/shown_password.svg";
import hiddenPassword from "/assets/svg/hidden_password.svg";
import {useState} from "react";
import BasketIcon from "../../../../assets/BasketIcon.js";
// import {ArrowBack} from "../../../../assets/ArrowBack.js";
import { PopupUpdateAccount } from './PopupUpdateAccount.js';

export const AccountSettings = () => {
  const {profile} = useAccount();

  const {
    onSubmitUpdate,
    handleSubmit,
    register, setOpenPopupDeleteAccount
  } = useAccountSettings();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const handleOnConfirm = () => {
    handleSubmit(onSubmitUpdate)();
    handleCloseUpdateModal();
  };

  return (
    <>
      <h1 className='text-t1Semi_ipad lg:hidden'>Данные аккаунта</h1>
      <div className=" py-6">
        <form className="flex flex-col gap-6 w-full md:max-w-[27.8rem]"
              autoComplete="off">
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="text-caption_m_desk text-medium_grey">
                Логин
              </label>
              <div className="mt-1.5">
                <input
                  type="text"
                  className="w-full rounded-xl border border-solid border-medium_grey py-2.5 px-3.5 bg-[transparent] text-white  text-caption_r_desk"
                  defaultValue={profile?.name}
                  {...register('name', {maxLength: 256})}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="text-caption_m_desk text-medium_grey">
                Email
              </label>
              <div className="mt-1.5">
                <input
                  type="email"
                  autoComplete="off"
                  className="w-full rounded-xl border border-solid border-medium_grey py-2.5 px-3.5 bg-[transparent] text-white text-caption_r_desk"
                  defaultValue={profile?.email}
                  {...register('email', {maxLength: 256})}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="new-password" className="text-caption_m_desk text-medium_grey">
                Новый пароль
              </label>
              <div className="mt-1.5">
                <div
                  className="w-full rounded-xl border border-solid border-medium_grey py-2.5 px-3.5  text-white text-caption_r_desk flex justify-between">
                  <input
                    type="password"
                    autoComplete="new-password"
                    className='w-full bg-[transparent] p-0'
                  />
                  {
                    showPassword
                      ? <button onClick={() => setShowPassword(!showPassword)} type='button'>
                        <img src={shownPassword}/>
                      </button>
                      : <button onClick={() => setShowPassword(!showPassword)} type='button'>
                        <img src={hiddenPassword}/>
                      </button>
                  }
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password" className="text-caption_m_desk text-medium_grey">
                Новый пароль еще раз
              </label>
              <div className="mt-1.5">
                <div
                  className="w-full rounded-xl border border-solid border-medium_grey py-2.5 px-3.5  text-white  text-caption_r_desk flex justify-between">
                  <input
                    type="password"
                    autoComplete="new-password"
                    className="w-full bg-[transparent] p-0"
                  />
                  {
                    showPasswordRepeat
                      ? <button onClick={() => setShowPasswordRepeat(!showPasswordRepeat)} type='button'>
                        <img src={shownPassword}/>
                      </button>
                      : <button onClick={() => setShowPasswordRepeat(!showPasswordRepeat)} type='button'>
                        <img src={hiddenPassword}/>
                      </button>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="button"
              className="w-full bg-medium_grey rounded-xl px-5 py-3.5 text-caption_m_desk"
              onClick={() => setUpdateModalOpen(true)}
            >
              Сохранить изменения
            </button>
            <button
              type="button"
              className="w-full border border-solid border-secondary_red rounded-xl px-5 py-3.5 text-caption_m_desk text-secondary_red"
              onClick={() => setOpenPopupDeleteAccount(true)}
            >
              <BasketIcon className='fill-secondary_red'/>
              Удалить аккаунт
            </button>
          </div>
          <PopupUpdateAccount open={updateModalOpen} onClose={handleCloseUpdateModal} onConfirm={handleOnConfirm}/>
        </form>
      </div>
    </>
  );
};

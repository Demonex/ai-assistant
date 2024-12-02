import {useAccount} from '../../../../../../components/Header/hooks/useAccount.js';
import {useAccountSettings} from "../../../hooks/useAccountSettings.js";
import {useEffect, useRef, useState} from "react";
import BasketIcon from "../../../../../../assets/BasketIcon.js";
// import {ArrowBack} from "../../../../assets/ArrowBack.js";
import { PopupUpdateAccount } from '../../PopupUpdateAccount.js';
import { LoginInput } from './LoginIput.js';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { IUpdateProfileFormInputs } from '../types/types.js';
import { EmailInput } from './EmailInput.js';
import { PasswordInput } from './PasswordInput.js';
import { RepeatPasswordInput } from './RepeatPasswordInput.js';

export const AccountSettings = () => {
  const {profile} = useAccount();
  const passwordRef = useRef('');
  
  const {
    onSubmitUpdate,
    handleSubmit,
    register, 
    setOpenPopupDeleteAccount,
    setError,
    errors,
    updateRequestError
  } = useAccountSettings();
  
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const handleOnConfirm = () => {
    handleSubmit(onSubmitUpdate)()
    handleCloseUpdateModal();
  };

  useEffect(() => {
    if (updateRequestError?.response?.status !== 400) {
        return;
    }

    updateRequestError?.response.data.messages.forEach((item, index) => {
        let message = '';

        switch (item.property) {
          case 'name':
            message = 'Не удалось обновить логин'
            break;
          case "email":
            message = 'Не удалось обновить email'
            break;
          case "password":
            message = 'Не удалось обновить пароль'
            break;
          default:
            break;
        }

        setError(`${item.property}` as "name" | "email" | "password", {
            message
        }, {
            shouldFocus: index === 0
        });
    });

  }, [setError, updateRequestError]);

  return (
    <>
      <h1 className='text-t1Semi_ipad lg:hidden'>Данные аккаунта</h1>
      <div className=" py-6">
        <form className="flex flex-col gap-6 w-full md:max-w-[27.8rem]"
              autoComplete="off">
          <div className="flex flex-col gap-4">
            <LoginInput 
              register={register as unknown as UseFormRegister<IUpdateProfileFormInputs>}
              error={errors.name as FieldError}
              defaultValue={profile?.name}
            />
            <EmailInput 
              register={register as unknown as UseFormRegister<IUpdateProfileFormInputs>}
              error={errors.email as FieldError}
              defaultValue={profile?.email}
            />
          </div>
          <div className="flex flex-col gap-4">
            <PasswordInput 
              register={register as unknown as UseFormRegister<IUpdateProfileFormInputs>}
              error={errors.password as FieldError}
              passwordRef={passwordRef}
            />
            <RepeatPasswordInput
              register={register as unknown as UseFormRegister<IUpdateProfileFormInputs>}
              error={errors.repeatPassword as FieldError}
              passwordRef={passwordRef}
            />
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

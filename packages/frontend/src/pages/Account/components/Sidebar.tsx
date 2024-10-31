import {memo, useState} from "react";
import {SharedFileInput} from "../../../components/SharedFileInput.js";
import letterIcon from "/assets/svg/letterIcon2.svg";
import AccountIcon from "../../../assets/AccountIcon.js";
import {SettingsIcon} from "../../../assets/Settings.js";
import {useAccountSettings} from "./hooks/useAccountSettings.js";
import {useAccount} from "../../../components/Header/hooks/useAccount.js";

const Sidebar = memo(() => {
  const {profile, setProfile} = useAccount();
  const {
    accountSettingsType,
    setAccountSettingsType,
    handleSubmit,
    onSubmitUpdate,
    register, avatarImage, setAvatarImage
  } = useAccountSettings();


  return (
    <section className='p-6 w-full h-full max-w-[15.25rem] border-r border-[#33333380]'>
      <div className='flex flex-col gap-16'>
        <div className='flex flex-col gap-6 items-center'>
          <form onSubmit={handleSubmit(onSubmitUpdate)}>
            <SharedFileInput
              currentImage={avatarImage ?? profile?.avatar?.url}
              onImageChange={(image: string | null) => setAvatarImage(image)}
              {...register('avatar')}
            />
          </form>
          <div className='flex flex-col gap-4 items-center'>
            <h3 className='text-t2Regular'>{profile?.username ? profile?.username : 'User'}</h3>
            <p
              className='text-caption_m_desk text-medium_grey flex items-center gap-1 whitespace-nowrap  max-w-[12rem]'>
              <img src={letterIcon} alt=''/>
              <span className='truncate'>{profile?.email}</span>
            </p>
          </div>
        </div>
        <div>
          <div className='py-4 flex gap-4 border-b border-[#33333380] items-center'
               onClick={() => setAccountSettingsType('account')}>
            <AccountIcon className={`${accountSettingsType === 'account' ? 'fill-medium_grey' : 'fill-white'}`}/>
            <p
              className={`text-btnText ${accountSettingsType === 'account' ? 'text-medium_grey' : 'text-white'} `}>Аккаунт</p>
          </div>
          <div className='py-4 flex gap-4 items-center' onClick={() => setAccountSettingsType('settings')}>
            <SettingsIcon className={`${accountSettingsType === 'settings' ? 'stroke-medium_grey' : 'stroke-white'}`}/>
            <p
              className={`text-btnText ${accountSettingsType === 'settings' ? 'text-medium_grey' : 'text-white'} `}>Настройки</p>
          </div>
        </div>
      </div>
    </section>
  )
})
export default Sidebar
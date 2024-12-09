import React, {memo, useState} from "react";
import {SharedFileInput} from "../../../components/SharedFileInput.js";
import letterIcon from "/assets/svg/letterIcon2.svg";
import {useAccountSettings} from "./hooks/useAccountSettings.js";
import {useAccount} from "../../../components/Header/hooks/useAccount.js";
import SecondaryButton from "../../../components/SecondaryButton.js";
import {SignOutIcon} from "../../../assets/SignOutIcon.js";
import {useLazyFetch} from "../../../hooks/useFetch.js";
import {BACKEND_URL} from "../../../constants/index.js";
import {clear} from "use-between";
import {useLocation} from "wouter";
import {accountTabs} from "../consts.js";
import ChevronRight from "../../../assets/ChevronRight.js";
import {AccountSettings} from "./Account/AccountSettings/ui/AccountSettings.js";
import PopupDeleteAccount from "./Account/PopupDeleteAccount.js";
import PaymentInfo from "./Account/PaymentInfo.js";
import {ArrowBack} from "../../../assets/ArrowBack.js";
import {Subscriptions} from "./Account/Subscriptions.js";
import { EmailConfirmRequired } from './Account/EmailConfirmRequired.js';
import { CenteredLoader } from '@/shared/ui/Loader/CenteredLoader.js';
import Team from "./Account/Team.js";
import ManageNotifications from "./Account/ManageNotifications.js";
import ActivityFeed from "./Settings/ActivityFeed.js";
import Integrations from "./Settings/Integrations.js";
import {FavoriteSources} from "./Settings/FavoriteSources.js";
import Notifications from "./Settings/Notifications.js";

const tabs = []

const Menu = () => {
  const [location, navigate] = useLocation();
  const [{data: signOut}, fetchSignOut] = useLazyFetch({
    url: `${BACKEND_URL}/auth/sign-out`,
    method: 'post',
  });
  const onSubmitSignOut = () => {
    fetchSignOut();
    clear();
    navigate('/auth/sign-in');
  };

  const {profile} = useAccount()
  const {
    handleSubmit,
    onSubmitUpdate, avatarImage,
    setAvatarImage,
    register, setMobileRender
  } = useAccountSettings();
  return (
    <div>
      <div className='flex-col md:flex-row w-full flex gap-6 justify-between pb-6'>
        <div className='flex gap-6 items-center'>
          <form onSubmit={handleSubmit(onSubmitUpdate)}>
            <SharedFileInput
              currentImage={avatarImage ?? profile?.avatar?.url}
              onImageChange={(image: string | null) => setAvatarImage(image)}
              {...register('avatar')}
            />
          </form>
          <div className='flex flex-col gap-4 '>
            <h3 className='text-t2Regular'>{profile?.username ? profile?.username : 'User'}</h3>
            <p
              className='text-caption_m_desk text-medium_grey flex items-center gap-1 whitespace-nowrap  max-w-[12rem]'>
              <img src={letterIcon} alt=''/>
              <span className='truncate'>{profile?.email}</span>
            </p>
          </div>
        </div>
        <div>
          <SecondaryButton title="Выйти" className="flex flex-row-reverse gap-2" onClick={onSubmitSignOut}>
            <SignOutIcon className="fill-light_grey"/>
          </SecondaryButton>
        </div>
      </div>
      <ul className=''>
        {
          accountTabs.map((tab, index) => (
            <li className='p-6 border-b border-secondary_dark_gray/50 flex justify-between items-center' onClick={() => setMobileRender(tab.type)} key={index}>
              <p className='text-t2Regular'>{tab.title}</p>
              <ChevronRight width={20} height={20} color='white'/>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
const AccountMobileMenu = memo(() => {
  const {mobileRender, setMobileRender} = useAccountSettings();
  const { profile, loading } = useAccount();

  if (!profile || loading) return <CenteredLoader />;

  return (
    <section className='py-6 px-4 md:px-8 w-full '>
      <PopupDeleteAccount/>

      {profile?.emailVerified ? (
        <>
           {
        mobileRender !== '' && (
          <div className='lg:hidden'>
            <div className='flex gap-2.5 items-center pb-6' onClick={() => setMobileRender('')}>
              <ArrowBack className='stroke-white w-5'/>
              <p className='text-t2Regular'>Назад</p>
            </div>
          </div>
        )
      }
      {(() => {
        switch (mobileRender) {
          case '':
            return <Menu/>
          case 'accountData':
            return <AccountSettings/>
          case 'paymentInfo':
            return <PaymentInfo/>
          case 'subscriptions':
            return <Subscriptions/>
          case 'team':
            return <Team/>
          case 'subscriptionsManagement':
            return  <ManageNotifications/>
          case 'feed':
            return  <ActivityFeed/>
          case 'integrations':
            return  <Integrations/>
          case 'favoriteSources':
            return  <FavoriteSources/>
          case 'notifications':
            return  <Notifications/>
        }
      })()}
        </>
      ) : (
        <EmailConfirmRequired />
      )}
    </section>
  )
})
export default AccountMobileMenu
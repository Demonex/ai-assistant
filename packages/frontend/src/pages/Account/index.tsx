import React, {memo, useState} from "react";
import Header from "../../components/HeaderMain/index.js";
import {useAccount} from "../../components/Header/hooks/useAccount.js";
import Sidebar from "./components/Sidebar.js";
import {useAccountSettings} from "./components/hooks/useAccountSettings.js";
import {AccountPage} from "./AccountPage.js";


export const UserAccount = memo(() => {
  const {profile, setProfile} = useAccount();
  const {accountSettingsType} = useAccountSettings();
  const isAuthorized = profile;
  return !isAuthorized ? null : (
    <>
      <Header/>
      <div className="w-full h-full mt-[68px] md:mt-[84px] lg:mt-[96px] relative flex">
        <Sidebar/>
        {(() => {
          switch (accountSettingsType) {
            case 'account':
              return <AccountPage/>
            /*case 'recommendedTracks':
              return <RecommendedPlaylists/>*/

          }
        })()}
      </div>
    </>
  )
})

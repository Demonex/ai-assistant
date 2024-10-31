import React, {memo} from "react";
import Header from "../../components/HeaderMain/index.js";
import {useAccount} from "../../components/Header/hooks/useAccount.js";
import Sidebar from "./components/Sidebar.js";
import {useAccountSettings} from "./components/hooks/useAccountSettings.js";
import {AccountPage} from "./AccountPage.js";
import {useSizes} from "../../hooks/useSizes.js";
import AccountMobileMenu from "./components/AccountMobileMenu.js";


export const UserAccount = memo(() => {
  const {profile} = useAccount();
  const {accountSettingsType} = useAccountSettings();
  const {isTablet, isMobile} = useSizes();
  const isAuthorized = profile;
  return !isAuthorized ? null : (
    <>
      <Header/>
      <div className="w-full h-full mt-[68px] md:mt-[84px] lg:mt-[96px] relative flex mb-[5rem]">
        {
          isTablet || isMobile
            ? <AccountMobileMenu/>
            : <>
              <Sidebar/>
              {(() => {
                switch (accountSettingsType) {
                  case 'account':
                    return <AccountPage/>
                  /*case 'recommendedTracks':
                    return <RecommendedPlaylists/>*/
                }
              })()}
            </>
        }
      </div>
    </>
  )
})

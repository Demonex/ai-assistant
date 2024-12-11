import React, { memo } from "react";
import Header from "../../components/HeaderMain/index.js";
import Sidebar from "./components/Sidebar.js";
import { useAccountSettings } from "./components/hooks/useAccountSettings.js";
import { AccountPage } from "./AccountPage.js";
import { useSizes } from "../../hooks/useSizes.js";
import AccountMobileMenu from "./components/AccountMobileMenu.js";
import SettingsPage from "./components/SettingsPage.js";
import { useRedirectIfNoProfile } from "@/shared/hooks/useRedirectIfNoProfile.js";
import { useAccount } from "@/components/Header/hooks/useAccount.js";
import { CenteredLoader } from "@/shared/ui/Loader/CenteredLoader.js";

export const UserAccount = memo(() => {
	const { accountSettingsType } = useAccountSettings();
	const { isTablet, isMobile } = useSizes();
	const { profile, loading, initializing } = useAccount();

	useRedirectIfNoProfile();

	if (!profile || loading || initializing) return <CenteredLoader />;

	return (
		<>
			<Header />
			<div className="w-full h-full mt-[68px] md:mt-[84px] lg:mt-[96px] relative flex ">
				{isTablet || isMobile ? (
					<AccountMobileMenu />
				) : (
					<>
						<Sidebar />
						{(() => {
							switch (accountSettingsType) {
								case "account":
									return <AccountPage />;
								case "settings":
									return <SettingsPage />;
							}
						})()}
					</>
				)}
			</div>
		</>
	);
});

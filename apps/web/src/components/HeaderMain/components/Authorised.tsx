import { useSizes } from "../../../hooks/useSizes.js";
import { memo, useCallback, useState } from "react";
import { Link } from "wouter";
import { useAccount } from "../../Header/hooks/useAccount.js";
import { useMobileMenu } from "../../Header/components/MobileMenu/hooks/useMobileMenu.js";
import SearchIcon from "../../../assets/SearchIcon.js";
import Burger from "../../../assets/BurgerNew.js";
import { useOpenModalSearch } from "../../../hooks/useOpenModalSearch.js";
import NotificationIcon from "../../../assets/NotificationIcon.js";
import { useOpenNotifications } from "../../../hooks/useOpenNotifications.js";
import unauthorizedAvatar from "/assets/svg/avatar_unauthorized.svg";

export const Authorised = memo(() => {
	const { setOpenNotifications } = useOpenNotifications();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [notification, setNotification] = useState(true);
	const {
		setSubscription,
		setIsOpenSearchModal,
		setButtonText,
		setSubscriptionOnClick,
		setIsShowAll,
	} = useOpenModalSearch();
	const { setIsOpen: setIsOpenMobileMenu } = useMobileMenu();
	const { profile } = useAccount();
	const { elementRange: elementRangeMobile } = useSizes(320, 1023);
	const burgerSize = elementRangeMobile(27, 44);
	const { isTablet, isMobile } = useSizes();

	const handleSearchClick = useCallback(() => {
		setSubscription(undefined);
		setButtonText("Перейти");
		setSubscriptionOnClick(false);
		setIsShowAll(true);
		setIsOpenSearchModal(true);
	}, []);

	return (
		<>
			{isTablet || isMobile ? (
				<div className="flex gap-4 ">
					<button onClick={handleSearchClick}>
						<SearchIcon color="white" width={30} />
					</button>
					<button
						className="relative"
						onClick={() => setOpenNotifications(true)}
					>
						<NotificationIcon className="stroke-white hover:stroke-medium_grey" />
						{notification && (
							<div className="w-4 h-4 rounded-full bg-secondary_red flex justify-center items-center absolute top-2 left-1">
								<span className="text-caption_s_desk">2</span>
							</div>
						)}
					</button>
					<Link to={"/account"}>
						<div className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex justify-center items-center bg-medium_grey">
							{profile.photo ? (
								<img src={profile.photo} />
							) : (
								<img src={unauthorizedAvatar} />
							)}
						</div>
					</Link>
					<button onClick={() => setIsOpenMobileMenu(true)}>
						<Burger height={`${burgerSize}px`} />
					</button>
				</div>
			) : (
				<div className="flex gap-6">
					<div
						className="flex items-center justify-center cursor-pointer"
						onClick={handleSearchClick}
					>
						<SearchIcon
							width="30"
							className="fill-amber-50 hover:fill-medium_grey"
						/>
					</div>
					<button
						className="relative"
						onClick={() => setOpenNotifications(true)}
					>
						<NotificationIcon className="stroke-white hover:stroke-medium_grey" />
						{notification && (
							<div className="w-4 h-4 rounded-full bg-secondary_red flex justify-center items-center absolute top-2 left-1">
								<span className="text-caption_s_desk">2</span>
							</div>
						)}
					</button>
					<Link to={"/account"}>
						<div className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex justify-center items-center bg-medium_grey">
							{profile.photo ? (
								<img src={profile.photo} />
							) : (
								<img src={unauthorizedAvatar} />
							)}
						</div>
					</Link>
				</div>
			)}
		</>
	);
});

import React, { useState } from "react";
import useSharedHook from "./useSharedHook.js";

const _useOpenModalSearch = () => {
	const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
	const [subscriptionOnClick, setSubscriptionOnClick] = useState(false);
	const [buttonText, setButtonText] = useState("Перейти");
	const [isShowAll, setIsShowAll] = useState(true);
	const [subscription, setSubscription] = useState(undefined);

	return {
		isOpenSearchModal,
		setIsOpenSearchModal,
		subscriptionOnClick,
		setSubscriptionOnClick,
		buttonText,
		setButtonText,
		isShowAll,
		setIsShowAll,
		subscription,
		setSubscription,
	};
};
export const useOpenModalSearch = () =>
	useSharedHook<ReturnType<typeof _useOpenModalSearch>>(_useOpenModalSearch);

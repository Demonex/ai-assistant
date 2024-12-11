import useSharedHook from "../../../../hooks/useSharedHook.js";
import React, { useEffect, useState } from "react";
import { useLazyFetch } from "../../../../hooks/useFetch.js";
import { BACKEND_URL } from "../../../../constants/index.js";
import { useAccount } from "../../../../components/Header/hooks/useAccount.js";
import { useForm } from "react-hook-form";
import { clear } from "use-between";
import { navigate } from "wouter/use-browser-location";

const _useAccountSettings = () => {
	const [accountSettingsType, setAccountSettingsType] = useState("account");
	const [mobileRender, setMobileRender] = useState("");
	const [openPopupDeleteAccount, setOpenPopupDeleteAccount] = useState(false);
	const { profile, setProfile } = useAccount();
	const [avatarImage, setAvatarImage] = useState<string>();
	const [
		{ data: dataUpdatedProfile, error: updateRequestError },
		fetchUpdateProfile,
	] = useLazyFetch({
		url: `${BACKEND_URL}/profile`,
		method: "put",
		cache: false,
	});

	const [{ data: dataUpdateAvatar }, fetchUpdateAvatar] = useLazyFetch({
		url: `${BACKEND_URL}/profile/avatar/update`,
		method: "post",
		cache: false,
	});
	/*  const [{data: dataUpdateProfile}, fetchUpdateProfile] = useLazyFetch({
    url: `${BACKEND_URL}/profile`,
    method: 'put',
    cache: false
  });*/
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		setError,
	} = useForm();

	const [{ data: signOut }, fetchSignOut] = useLazyFetch({
		url: `${BACKEND_URL}/auth/sign-out`,
		method: "post",
	});
	const onSubmitSignOut = async () => {
		await fetchSignOut();
		clear();
		navigate("/auth/sign-in");
	};
	const onSubmitUpdate = async ({ avatar, ...data }, e) => {
		const formValues = data;
		console.log("update data", data);
		if (avatar?.length) {
			const formDataAvatar = new FormData();
			Array.from(avatar).map((file: any, index) => {
				formDataAvatar.append("file", file);
			});
			await fetchUpdateAvatar({
				data: formDataAvatar,
				headers: { "Content-Type": "multipart/form-data" },
			}).catch(console.error);
		}

		const changedFields = {
			name: data?.name,
			email: data.email,
		};

		void fetchUpdateProfile({
			data: changedFields,
		}).then(({ data }) => {
			setProfile(data);
		});
	};
	return {
		accountSettingsType,
		setAccountSettingsType,
		fetchUpdateProfile,
		fetchUpdateAvatar,
		onSubmitUpdate,
		register,
		handleSubmit,
		errors,
		setValue,
		avatarImage,
		setAvatarImage,
		openPopupDeleteAccount,
		setOpenPopupDeleteAccount,
		mobileRender,
		setMobileRender,
		onSubmitSignOut,
		setError,
		updateRequestError,
	};
};

export const useAccountSettings = () =>
	useSharedHook<ReturnType<typeof _useAccountSettings>>(_useAccountSettings);

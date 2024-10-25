import useSharedHook from "../../../../hooks/useSharedHook.js";
import React, {useEffect, useState} from "react";
import {useLazyFetch} from "../../../../hooks/useFetch.js";
import {BACKEND_URL} from "../../../../constants/index.js";
import {useAccount} from "../../../../components/Header/hooks/useAccount.js";
import {useForm} from "react-hook-form";

const _useAccountSettings = () => {
  const [accountSettingsType, setAccountSettingsType] = useState('account');
  const {profile, setProfile} = useAccount();
  const [{data: dataUpdatedProfile}, fetchUpdateProfile] = useLazyFetch({
    url: `${BACKEND_URL}/profile`,
    method: 'put',
    cache: false
  });

  const [{data: dataUpdateAvatar}, fetchUpdateAvatar] = useLazyFetch({
    url: `${BACKEND_URL}/profile/avatar/update`,
    method: 'post',
    cache: false
  });
/*  const [{data: dataUpdateProfile}, fetchUpdateProfile] = useLazyFetch({
    url: `${BACKEND_URL}/profile`,
    method: 'put',
    cache: false
  });*/
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    setValue
  } = useForm();

  const onSubmitUpdate = async ({avatar, ...data}, e) => {
    const formValues = data;
    if(avatar?.length) {
      const formDataAvatar = new FormData();
      Array.from(avatar).map((file: any, index) => {
        formDataAvatar.append('file', file);
      });
      await fetchUpdateAvatar({
        data: formDataAvatar,
        headers: {'Content-Type': 'multipart/form-data'}
      }).catch(console.error);
    }

    const changedFields = {
      name: data?.name,
      email: data.email
    };

    void fetchUpdateProfile({
      data: changedFields
    });
  };
  useEffect(() => {
    if(!dataUpdatedProfile) {
      return;
    }
    setProfile(dataUpdatedProfile);
  }, [dataUpdatedProfile]);
  return {
    accountSettingsType,
    setAccountSettingsType,
    fetchUpdateProfile,
    fetchUpdateAvatar,
    onSubmitUpdate,
    register,
    handleSubmit,
    errors,
    setValue
  };
};

export const useAccountSettings = () => useSharedHook<ReturnType<typeof _useAccountSettings>>(_useAccountSettings);

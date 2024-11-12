import useSharedHook from '../../../hooks/useSharedHook.js';
import { BACKEND_URL } from '../../../constants/index.js';
import useFetch from '../../../hooks/useFetch.js';
import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { IProfile } from '../../../entities/account/types/types.js';

const _useAccount = (): {
  profile: IProfile;
  setProfile: Dispatch<SetStateAction<IProfile>>;
  loading?: boolean;
  error?: unknown;
} => {

  const [profile, setProfile] = useState<IProfile>();
  const {data, loading, error} = useFetch({
    url: `${BACKEND_URL}/profile`,
    cache: false
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    console.log('reset')
    console.log("data", data)
    setProfile(data as IProfile);
  }, [data]);

  return {
    profile,
    setProfile,
    loading,
    error
  };
};

export const useAccount = () => useSharedHook<ReturnType<typeof _useAccount>>(_useAccount);

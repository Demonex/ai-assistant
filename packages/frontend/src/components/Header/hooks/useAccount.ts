import useSharedHook from '../../../hooks/useSharedHook.js';
import {BACKEND_URL} from '../../../constants/index.js';
import useFetch from '../../../hooks/useFetch.js';
import {useEffect, useState} from 'react';

const _useAccount = (): {
  profile: any
  setProfile: any
  loading?: boolean
  error?: any
} => {

  const [profile, setProfile] = useState<any>();
  const {data, loading, error} = useFetch({
    url: `${BACKEND_URL}/profile`,
    cache: false
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    setProfile(data);
  }, [data]);

  return {
    profile,
    setProfile,
    loading,
    error
  };
};

export const useAccount = () => useSharedHook<ReturnType<typeof _useAccount>>(_useAccount);

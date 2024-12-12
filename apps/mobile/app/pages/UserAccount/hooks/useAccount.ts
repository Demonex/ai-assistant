
import {useEffect, useState} from 'react';
import useSharedHook from "../../../hooks/useSharedHook";
import useFetch from "../../../hooks/useFetch";

const _useAccount = (): {
  profile: any
  setProfile: any
  loading?: boolean
  error?: any
} => {

  const [profile, setProfile] = useState<any>();
  const {data, loading, error} = useFetch({
    url: `${process.env.EXPO_PUBLIC_API_URL}/api/rest/profile`,
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

export default {
  useAccount
}
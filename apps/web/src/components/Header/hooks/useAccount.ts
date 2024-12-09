import useSharedHook from '../../../hooks/useSharedHook.js';
import { BACKEND_URL } from '../../../constants/index.js';
import useFetch from '../../../hooks/useFetch.js';
import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { IProfile } from '../../../entities/account/types/types.js';
import usePrevious from '@/shared/hooks/usePrevious.js';

const _useAccount = (): {
  profile: IProfile;
  setProfile: Dispatch<SetStateAction<IProfile>>;
  loading?: boolean;
  error?: unknown;
  initializing: boolean;
} => {

  const [profile, setProfile] = useState<IProfile>();
  const {data, loading, error} = useFetch({
    url: `${BACKEND_URL}/profile`,
    cache: false
  });

  const [initializing, setInitializing] = useState(true);
	const previousLoading = usePrevious(loading);

  useEffect(() => {
    if (!data) {
      return;
    }

    setProfile(data as IProfile);
  }, [data]);

  useEffect(() => {
		if (previousLoading === true && loading === false) {
			setInitializing(false);
		}
	}, [loading, previousLoading]);

  return {
    profile,
    setProfile,
    loading,
    error,
    initializing,
  };
};

export const useAccount = () => useSharedHook<ReturnType<typeof _useAccount>>(_useAccount);

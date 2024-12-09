import useSharedHook from '../../../hooks/useSharedHook.js';
import {useEffect} from 'react';
import {useArtist} from './useArtist.js';
import {type FetchError, useLazyFetch} from '../../../hooks/useFetch.js';
import type {ArtistProfileType} from '../types.js';
import {BACKEND_URL} from '../../../constants/index.js';

const _useArtistProfile = (): {
  data?: ArtistProfileType
  loading: boolean
  error?: FetchError<any>
} => {
  const {id} = useArtist();
  const [{data, loading, error}, fetchData] = useLazyFetch<ArtistProfileType>({
    url: `${BACKEND_URL}/proxy/api/v1/managements/get_account_info`
  });

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchData({
      params: {
        idUnique: id
      }
    }).catch(console.error);
  }, [id]);

  return {
    data,
    loading,
    error
  };
};

export const useArtistProfile = () => useSharedHook<ReturnType<typeof _useArtistProfile>>(_useArtistProfile);

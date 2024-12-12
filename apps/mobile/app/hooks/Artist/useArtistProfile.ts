import {useEffect} from 'react';
// import {BACKEND_URL} from '../../../constants/index.js';
import useSharedHook from "../useSharedHook";
import { FetchError, useLazyFetch } from "../useFetch";
import { ArtistProfileType } from "./types";
import { useArtist } from "./useArtist";
import { URL, URLSearchParams } from 'react-native-url-polyfill';



const _useArtistProfile = (): {
  data?: ArtistProfileType
  loading: boolean
  error?: FetchError<any>
} => {
  const {id, artistUniqueId} = useArtist();
  const [{data, loading, error}, fetchData] = useLazyFetch<ArtistProfileType>({
    url: `https://backend.musicstats.ru/api/rest/proxy/api/v1/managements/get_account_info`
  });


  useEffect(() => {
    if (!artistUniqueId) {
      return;
    }
    fetchData({
      url: `https://backend.musicstats.ru/api/rest/proxy/api/v1/managements/get_account_info?idUnique=${artistUniqueId}`
    }).catch(console.error);
  }, [id,artistUniqueId]);

  return {
    data,
    loading,
    error
  };
};

export const useArtistProfile = () => useSharedHook<ReturnType<typeof _useArtistProfile>>(_useArtistProfile);

export default {
  useArtistProfile
}


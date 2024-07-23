import useSharedHook from '../../../hooks/useSharedHook.js';
import {useEffect} from 'react';
import {useArtist} from './useArtist.js';
import {FetchError, useLazyFetch} from '../../../hooks/useFetch.js';
import {TrackDataType} from '../types.js';
import {BACKEND_URL} from "../../../constants/index.js";

const _useArtistTrack = (): {
  data?: TrackDataType
  loading: boolean
  error?: FetchError<any>
  id?: string,
} => {
  const {id, source} = useArtist();
  const [{data, loading, error}, fetchData] = useLazyFetch<TrackDataType>({
    url: `${BACKEND_URL}/proxy/api/v1/analytics/track_data`
  });



  useEffect(() => {
    if (!id || !source) {
      return;
    }
    void fetchData({
      params: {
        idUnique: id,
        source
      }
    });
  }, [id, source]);

  return {
    data,
    loading,
    error,
    id
  };
};

export const useArtistTrack = () => useSharedHook<ReturnType<typeof _useArtistTrack>>(_useArtistTrack);

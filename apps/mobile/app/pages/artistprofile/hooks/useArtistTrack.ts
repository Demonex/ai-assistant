
import {useEffect} from 'react';
import {TrackDataType} from '../types.js';
import { useArtist } from "../../../hooks/Artist/useArtist";
import { FetchError, useLazyFetch } from "../../../hooks/useFetch";
import useSharedHook from "../../../hooks/useSharedHook";

const _useArtistTrack = (): {
  data?: TrackDataType
  loading: boolean
  error?: FetchError<any>
} => {
  const {id, source, artistUniqueId} = useArtist();
  const [{data, loading, error}, fetchData] = useLazyFetch<TrackDataType>({
    url: `https://backend.musicstats.ru/api/rest/proxy/api/v1/analytics/track_data`
  });

  useEffect(() => {
    if (!artistUniqueId || !source) {
      return;
    }
    void fetchData({
      url: `https://backend.musicstats.ru/api/rest/proxy/api/v1/analytics/track_data?idUnique=${artistUniqueId}&source=${source}`
    });
  }, [artistUniqueId, source]);

  return {
    data,
    loading,
    error
  };
};

export const useArtistTrack = () => useSharedHook<ReturnType<typeof _useArtistTrack>>(_useArtistTrack);

export default {
  useArtistTrack
}

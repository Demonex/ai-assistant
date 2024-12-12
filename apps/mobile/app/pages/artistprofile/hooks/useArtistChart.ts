import {useEffect} from 'react';
import { useArtist } from "../../../hooks/Artist/useArtist";
import { ChartDataType } from "../types";
import useSharedHook from "../../../hooks/useSharedHook";
import { FetchError, useLazyFetch } from "../../../hooks/useFetch";

const _useArtistChart = (): {
  data?: ChartDataType
  loading: boolean
  error?: FetchError<any>
} => {
  const {id, source,artistUniqueId} = useArtist();
  const [{data, loading, error}, fetchData] = useLazyFetch<ChartDataType>({
    url: `https://backend.musicstats.ru/api/rest/proxy/api/v1/analytics/chart`
  });

  useEffect(() => {
    if (!artistUniqueId || !source) {
      return;
    }
    fetchData({
      url: `https://backend.musicstats.ru/api/rest/proxy/api/v1/analytics/chart?idUnique=${artistUniqueId}&source=${source}&`
    }).catch(console.error);
  }, [artistUniqueId, source]);

  return {
    data,
    loading,
    error
  };
};

export const useArtistChart = () => useSharedHook<ReturnType<typeof _useArtistChart>>(_useArtistChart);

export default {
  useArtistChart
}
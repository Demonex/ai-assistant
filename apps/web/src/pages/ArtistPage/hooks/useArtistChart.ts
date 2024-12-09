import useSharedHook from '../../../hooks/useSharedHook.js';
import {useEffect} from 'react';
import {useArtist} from './useArtist.js';
import {type FetchError, useLazyFetch} from '../../../hooks/useFetch.js';
import type {ChartDataType} from '../types.js';
import {BACKEND_URL} from '../../../constants/index.js';

const _useArtistChart = (): {
  data?: ChartDataType
  loading: boolean
  error?: FetchError<any>
} => {
  const {id, source} = useArtist();
  const [{data, loading, error}, fetchData] = useLazyFetch<ChartDataType>({
    url: `${BACKEND_URL}/proxy/api/v1/analytics/chart`
  });

  useEffect(() => {
    if (!id || !source) {
      return;
    }
    fetchData({
      params: {
        idUnique: id,
        source
      }
    }).catch(console.error);
  }, [id, source]);

  return {
    data,
    loading,
    error
  };
};

export const useArtistChart = () => useSharedHook<ReturnType<typeof _useArtistChart>>(_useArtistChart);

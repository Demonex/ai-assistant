import useSharedHook from '../../../hooks/useSharedHook.js';
import {useEffect} from 'react';
import {FetchError, useLazyFetch} from '../../../hooks/useFetch.js';
import {ChartTrackDataType} from '../types.js';
import {BACKEND_URL} from '../../../constants/index.js';
import {useArtist} from "../../ArtistPage/hooks/useArtist.js";
import {useTrack} from "./useTrack.js";

const _useTableTrackData = (): {
  chartTrackData?: ChartTrackDataType
  loading: boolean
  error?: FetchError<any>
} => {
  const {id, source} = useArtist();
  const {idTrack} = useTrack();
  const [{data: chartTrackData, loading, error}, fetchData] = useLazyFetch<ChartTrackDataType>({
    url: `${BACKEND_URL}/proxy/api/v1/analytics_track/${idTrack}/tables`,
  });

  useEffect(() => {
     if (!id || !source || !idTrack) {
       return;
     }
    fetchData({
      params: {
        idUnique: id,
        source
      },
     /* headers: {
        'authorization': 'Bearer RSxzYxgrUm3NrH_-RwbN'
      }*/
    }).catch(console.error);
  }, [id, source, idTrack]);

  return {
    chartTrackData,
    loading,
    error
  };
};

export const useTableTrackData = () => useSharedHook<ReturnType<typeof _useTableTrackData>>(_useTableTrackData);

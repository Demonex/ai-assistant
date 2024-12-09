import useSharedHook from '../../../hooks/useSharedHook.js';
import type React from 'react';
import {useEffect, useState} from 'react';
import {type FetchError, useLazyFetch} from '../../../hooks/useFetch.js';
import type {ChartTrackDataType} from '../types.js';
import {BACKEND_URL} from '../../../constants/index.js';
import {useArtist} from "../../ArtistPage/hooks/useArtist.js";
import {useTrack} from "./useTrack.js";

const _useChartTrackData = (): {
  chartTrackData?: ChartTrackDataType
  loading: boolean
  error?: FetchError<any>
  setTrackId: React.Dispatch<React.SetStateAction<string>>
  setIdArtist: React.Dispatch<React.SetStateAction<string>>
  setSource: React.Dispatch<React.SetStateAction<string>>
} => {

  const [trackId, setTrackId] = useState<string>()
  const [idArtist, setIdArtist] = useState<string>()
  const [source, setSource] = useState<string>()
  const [{data: chartTrackData, loading, error}, fetchData] = useLazyFetch<ChartTrackDataType>({
    url: `${BACKEND_URL}/proxy/api/v1/analytics_track/${trackId}/chart`
  });

  useEffect(() => {

    if (!idArtist || !source || !trackId) {
      return;
    }
    fetchData({
      params: {
        idUnique: idArtist,
        source
      }
    }).catch(console.error);
  }, [idArtist, source, trackId]);

  return {
    chartTrackData,
    loading,
    error,
    setTrackId,
    setIdArtist,
    setSource
  };
};

export const useChartTrackData = () => useSharedHook<ReturnType<typeof _useChartTrackData>>(_useChartTrackData);

import useSharedHook from '../../../hooks/useSharedHook.js';
import type React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {useLazyFetch} from '../../../hooks/useFetch.js';
import {BACKEND_URL} from '../../../constants/index.js';
import {useArtist} from '../../ArtistPage/hooks/useArtist.js';
import {useParams} from 'wouter';
import type {TrackDataType} from '../types.js';
import memoize from 'memoizee';
import {useBetween} from 'use-between';
import {useArtistProfile} from '../../ArtistPage/hooks/useArtistProfile.js';

type UseTrackReturn = {
  idTrack?: string
  idArtist?: string
  source?: string
  trackData?: TrackDataType
  setIdTrack: React.Dispatch<React.SetStateAction<string>>
}
const _useTrack = ({trackId}: { trackId?: string }): UseTrackReturn => {
  const {setIdFromTrack, id: idArtist, source, name} = useArtist();
  const [idTrack, setIdTrack] = useState<string>(trackId);
  const [{
    data: trackData,
    loading,
    error
  }, fetchData] = useLazyFetch<TrackDataType>();

  useEffect(() => {
    if (!trackId) {
      return;
    }
    setIdTrack(trackId);
    void fetchData({
      url: `${BACKEND_URL}/proxy/api/v1/analytics_track/${trackId}/info`
    });
  }, [trackId]);
  useEffect(() => {
    const artistIds = trackData?.trackInfo?.artistLinks?.map((artist => artist?.idUnique));
    if (
      !trackData?.trackInfo?.entityIdUnique
      || !artistIds?.length
      || artistIds.includes(idArtist)) {
      return;
    }
    setIdFromTrack(trackData.trackInfo.entityIdUnique);
  }, [trackData?.trackInfo?.entityIdUnique, idArtist]);
  return {
    idTrack,
    trackData,
    idArtist,
    source,
    setIdTrack
  };
};

const useTrackMemo = memoize((trackId) => {
  return () => _useTrack({
    trackId
  });
});

export const useTrack = ({trackId}: { trackId?: string } = {}) => {
  return useBetween<ReturnType<typeof _useTrack>>(useTrackMemo(trackId));
};

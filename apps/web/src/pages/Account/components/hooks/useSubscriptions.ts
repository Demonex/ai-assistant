import {useCallback, useEffect, useMemo, useState} from 'react';
import useSharedHook from '../../../../hooks/useSharedHook.js';
import {useLazyFetch} from '../../../../hooks/useFetch.js';
import {BACKEND_URL} from '../../../../constants/index.js';
import type {ArtistProfileType} from "../../../ArtistPage/types.js";


const _useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [artistsFromSubscriptions, setArtistsFromSubscriptions] = useState<{
    [k: string]: any
  }>({});
  const [{data: dataUpdateSubscription}, fetchUpdateSubscriptions] = useLazyFetch({
    url: `${BACKEND_URL}/subscription/:id/update`,
    method: 'put',
    cache: false
  });
  const [{data: userSubscriptions, loading, error}, fetchSubscriptions] = useLazyFetch({
    url: `${BACKEND_URL}/profile/subscriptions`,
    cache: false
  });
  const [_, fetchArtist] = useLazyFetch<ArtistProfileType>({
    url: `${BACKEND_URL}/proxy/api/v1/managements/get_account_info`
  });
  useEffect(() => {
    fetchSubscriptions().catch(console.error);
  }, []);

  useEffect(() => {
    setSubscriptions(userSubscriptions);
  }, [userSubscriptions]);

  const artistsIds = useMemo(() => {
    return subscriptions?.reduce((prev, next) => {
      return [...new Set([...prev, ...(next.artists || [])])];
    }, []) || [];
  }, [subscriptions]);

  useEffect(() => {
    if (!artistsIds.length) {
      return;
    }
    artistsIds.forEach((id) => {
      fetchArtist({
        params: {
          idUnique: id
        }
      })
        .then(({data}) => {
          setArtistsFromSubscriptions((prev) => ({...prev, [id]: data?.account}));
        })
        .catch(console.error);
    });
  }, [artistsIds]);
  return {
    subscriptions,
    setSubscriptions,
    dataUpdateSubscription,
    fetchUpdateSubscriptions,
    userSubscriptions,
    artistsFromSubscriptions
  };
};
export const useSubscriptions = () => useSharedHook<ReturnType<typeof _useSubscriptions>>(_useSubscriptions);

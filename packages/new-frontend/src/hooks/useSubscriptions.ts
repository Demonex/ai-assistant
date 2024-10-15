import {useEffect, useMemo, useState} from 'react';
import {BACKEND_URL} from '../constants/index.js';
import {useLazyFetch} from './useFetch.js';
import useSharedHook from './useSharedHook.js';
import {useArtistProfile} from '../pages/ArtistPage/hooks/useArtistProfile.js';

const _useSubscriptions = () => {
  const {data: artistProfile} = useArtistProfile();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [{data, loading, error}, fetchSubscriptions] = useLazyFetch({
    url: `${BACKEND_URL}/profile/subscriptions`,
    cache: false
  });

  const [, fetchSubscribe] = useLazyFetch({
    url: `${BACKEND_URL}/profile/subscription`,
    method: 'post',
    cache: false
  });
  const [, fetchUnsubscribe] = useLazyFetch({
    url: `${BACKEND_URL}/profile/subscription`,
    method: 'delete',
    cache: false
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    setSubscriptions(data);
  }, [data]);

  useEffect(() => {
    fetchSubscriptions().catch(console.error);
  }, []);

  /*const subscribe = async (artist: string) => {
    fetchSubscribe({data: {artist}}).then(({data}) => {
      setSubscriptions(subscriptions => [...subscriptions.reduce((prev, next) => {
        return next?.artist === data.artist ? prev : prev.concat(next);
      }, []), data]);
    });
  };

  const unsubscribe = async (artist: string) => {
    fetchUnsubscribe({data: {artist}}).then(({data}) => {
      setSubscriptions(subscriptions => subscriptions.reduce((prev, next) => {
        return next?.artist === data.artist ? prev : prev.concat(next);
      }, []));
    });
  };*/

  const artistId = useMemo(() => {
    return artistProfile?.account?.idUnique;
  }, [artistProfile]);

  const isSubscribed = useMemo(() => {
    return !!subscriptions?.find(({artists}) => artists.includes(artistId));
  }, [subscriptions, artistId]);

  console.log('isSubscribed',isSubscribed)
  return {
    // subscribe,
    // unsubscribe,
    subscriptions,
    setSubscriptions,
    loading,
    error,
    isSubscribed
  };
};

export const useSubscriptions = () => useSharedHook<ReturnType<typeof _useSubscriptions>>(_useSubscriptions);

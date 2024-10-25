import {useCallback, useEffect, useMemo, useState} from 'react';
import useSharedHook from '../../../../hooks/useSharedHook.js';
import {useLazyFetch} from '../../../../hooks/useFetch.js';
import {BACKEND_URL} from '../../../../constants/index.js';


const _useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([])
  const [{data: dataUpdateSubscription}, fetchUpdateSubscriptions] = useLazyFetch({
    url: `${BACKEND_URL}/subscription/:id/update`,
    method: 'put',
    cache: false
  });

  return {
    subscriptions,
    setSubscriptions,
    dataUpdateSubscription,
    fetchUpdateSubscriptions
  };
};
export const useSubscriptions = () => useSharedHook<ReturnType<typeof _useSubscriptions>>(_useSubscriptions);

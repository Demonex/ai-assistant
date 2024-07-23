import React, {useEffect} from 'react';
import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import useSharedHook from './useSharedHook.js';
import {buildWebStorage, setupCache} from 'axios-cache-interceptor';
import memoize from 'memoizee';
import {useBetween} from '../use-between/index.js';

const fetch = setupCache(Axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL || '',
  headers: {
    common: {
      ['Content-Type']: 'application/json'
    }
  },
  withCredentials: true
}), {
  storage: buildWebStorage(window.localStorage, 'axios-cache:'),
  ttl: 1000 * 60 * 60 * 24
});

export type FetchRequestConfig = AxiosRequestConfig;
export type FetchResponse<T = any> = AxiosResponse<T>;
export type FetchError<T = any> = AxiosError<T>;

interface ApiAction<T = unknown, E = unknown> extends AxiosRequestConfig {
  onSuccess?: (data: FetchResponse<T>) => void;
  onFailure?: (error: FetchError<E>) => void;
}

interface ReduceProps<T> {
  loading?: boolean;
  data?: FetchResponse<T>['data'];
  error?: FetchError;
}

const fetchFn = <T = any>(props: FetchRequestConfig): Promise<FetchResponse<T>> => {
  const {data, method} = props;
  const dataOrParams = method ? (['get', 'delete'].includes(method.toLowerCase()) ? 'params' : 'data') : 'data';
  // set(Axios, 'defaults.baseURL', import.meta.env.VITE_APP_BASE_URL || '');
  // set(Axios, 'defaults.headers.common.Content-Type', 'application/json');

  return fetch.request({
    // withCredentials: true,
    [dataOrParams]: data,
    ...props
  });
};

export const _useFetch = <T = any>({onFailure, onSuccess, ...props}: ApiAction<T> & Record<string, unknown>) => {
  const [state, dispatch] = React.useReducer(
    (state, {data, error, loading}: ReduceProps<T>) => ({loading: loading ?? false, data, error}),
    {
      data: undefined,
      error: undefined,
      loading: true
    }
  );
  let unmount = false;
  React.useEffect(() => {
    if(unmount) {
      return;
    }
    dispatch({loading: true});
    fetchFn<T>(props)
    .then((response: FetchResponse) => {
      if(unmount) {
        return;
      }
      dispatch({data: response.data});
      if(onSuccess) onSuccess(response);
      return response;
    })
    .catch((error: FetchError) => {
      if(unmount) {
        return;
      }
      dispatch({error});
      if(onFailure) onFailure(error);
      // return error;
    });
    return () => {
      unmount = true;
    };
  }, [JSON.stringify(props)]);
  return state;
};

export const useFetch = (args) => useSharedHook<ReturnType<typeof _useFetch>>(_useFetch, args);

export const _useLazyFetch = <T = any>(
  defaultProps: ApiAction<T> & Record<string, unknown> = {}
): [ReduceProps<T>, (lazyProps?: ApiAction<T> & Record<string, unknown>) => Promise<FetchResponse<T>>] => {
  let unmount = false;
  const [state, dispatch] = React.useReducer(
    (state, {data, error, loading}: ReduceProps<T>) => ({
      loading: !!loading,
      data,
      error
    }),
    {
      data: undefined,
      error: undefined,
      loading: false
    }
  );
  useEffect(() => {
    return () => {
      unmount = true;
    };
  }, []);
  return [
    state,
    async (lazyProps: ApiAction<T> = {}) => {
      // console.log('a', lazyProps, state);
      const {onFailure, onSuccess, ...props} = {...defaultProps, ...lazyProps};
      if(unmount) {
        return;
      }
      dispatch({loading: true});
      try {
        const response = await fetchFn<T>(props);
        if(unmount) {
          return;
        }
        // console.log('b', response.data, state);
        dispatch({data: response.data});
        if(onSuccess) onSuccess(response);
        return response;
      } catch(error) {
        if(!unmount) {
          dispatch({error});
          if(onFailure) onFailure(error);
        }
        throw error;
      }
    }
  ];
};

const lazyMemo = memoize((url, method, cache) => {
  return () => _useLazyFetch({
    url,
    method,
    cache
  });
});

export const useLazyFetch = <T = any>({url, method, cache}: { url?: string, method?: string, cache?: boolean } = {}) => {
  return useBetween<ReturnType<typeof _useLazyFetch<T>>>(lazyMemo(url, method, cache));
};

export default useFetch;

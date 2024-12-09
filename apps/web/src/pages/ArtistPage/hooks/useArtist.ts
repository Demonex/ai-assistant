import {type allSources, favoriteSources, overviewSources} from '../../../data/consts/favoriteSources.js';
import useSharedHook from '../../../hooks/useSharedHook.js';
import type React from 'react';
import {useCallback, useState} from 'react';
import {useArtistProfile} from './useArtistProfile.js';

export type ArtistNavigation = 'feed' | 'analytics' | 'audience' | 'tools' | 'catalogue' | undefined

const _useArtist = (): {
  id?: string
  name?: string
  navigation: ArtistNavigation
  source: typeof allSources[number]['slug']
  setSource: (source: string) => void
  setIdFromTrack: React.Dispatch<React.SetStateAction<string>>
  setParams: React.Dispatch<React.SetStateAction<{
    id?: string
    name?: string
    navigation?: ArtistNavigation
    source?: string
  }>>
} => {

  const [idFromTrack, _setIdFromTrack] = useState<string>();
  const [params, setParams] = useState<{
    id?: string
    name?: string
    navigation?: ArtistNavigation
    source?: string
  }>({});
  const [source, _setSource] = useState<string>();

  const setSource = useCallback((source: string) => {
    const sourceFound = favoriteSources.find(({slug}) => slug === source)?.slug;
    if (!sourceFound) {
      return;
    }
    _setSource(sourceFound);
  }, [favoriteSources]);

  const setIdFromTrack = useCallback((id: string) => {
    setParams((params) => ({
      ...params,
      id
    }));
    _setIdFromTrack(id);
  }, [params]);

  return {
    id: params?.id ?? idFromTrack,
    source: source ?? params?.source,
    setSource,
    name: params?.name,
    navigation: params?.navigation,
    setIdFromTrack,
    setParams
  };
};

export const useArtist = () => useSharedHook<ReturnType<typeof _useArtist>>(_useArtist);

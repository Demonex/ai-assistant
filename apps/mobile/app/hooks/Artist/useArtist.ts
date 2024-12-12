import {allSources, favoriteSources, overviewSources} from '../../consts/favoriteSources';
import {useCallback, useState} from 'react';
import {useParams, useSearch} from 'wouter';
import useSharedHook from "../useSharedHook";

export type ArtistNavigation = 'feed' | 'analytics' | 'audience' | 'marketing' | 'catalogue' | undefined

const _useArtist = (): {
  id?: string
  name?: string
  navigation: ArtistNavigation
  source: typeof allSources[number]['slug']
  setSource: (source: string) => void
  setArtistUniqueId: (artist: string) => void
  artistUniqueId: string
} => {

  const {id, name, navigation} = useParams<{
    id: string
    name: string
    navigation: ArtistNavigation
  }>();

  const search = '';//useSearch();

  const queryParams:{[k: string]: unknown} = Array.from(new URLSearchParams(search)).reduce((prev, [key, value]) => ({
    ...prev,
    [key]: value
  }), {});


  const defaultSource = (
    overviewSources.find(({slug}) => slug === queryParams.source)
    || overviewSources[0]
  ).slug;

  const [source, _setSource] = useState(defaultSource);
  const [artistUniqueId, setArtistUniqueId] = useState('');

  const setSource = useCallback((source: string) => {
    const sourceFound = favoriteSources.find(({slug}) => slug === source)?.slug;
    if (!sourceFound) {
      return;
    }
    _setSource(sourceFound);
  }, [favoriteSources]);

  return {
    id,
    source,
    setSource,
    name,
    navigation,
    artistUniqueId,
    setArtistUniqueId
  };
};

export const useArtist = () => useSharedHook<ReturnType<typeof _useArtist>>(_useArtist);
export default {
  useArtist
}

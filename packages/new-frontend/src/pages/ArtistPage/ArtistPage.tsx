import {HeaderAccount} from '../../components/HeaderAccount/HeaderAccount.js';
import {Sidebar} from './components/Sidebar/Sidebar.js';
import imgPng from '/assets/imgs/docs-dark@30.1a9f8cbf.png';
import {lazy, memo, Suspense, useEffect, useMemo} from 'react';
import {ArtistNavigation, useArtist} from './hooks/useArtist.js';
import {useParams, useSearch} from 'wouter';
import {overviewSources} from '../../data/consts/favoriteSources.js';
import Header from "../../components/HeaderMain/index.js";
import '../../index.css'
const FeedContent = lazy(() => import('./components/FeedContent.js'));
const AnalyticsContent = lazy(() => import('./components/Analytics/AnalyticsContent.js'));
const AudienceContent = lazy(() => import('./components/Audience/AudienceContent.js'));

const ArtistContent = memo(() => {
  const {navigation, setParams} = useArtist();
  const params = useParams<{
    id?: string
    name?: string
    navigation?: ArtistNavigation
  }>();
  const search = useSearch();
  const queryParams = useMemo<Record<string, string>>(() => {
    return Array.from(new URLSearchParams(search)).reduce((prev, [key, value]) => ({
      ...prev,
      [key]: value
    }), {});
  }, [search]);
  const defaultSource = useMemo(() => {
    return (
      overviewSources.find(({slug}) => slug === queryParams.source)
      || overviewSources[0]
    ).slug;
  }, [queryParams?.source]);
  useEffect(() => {
    console.log('pa', params);
    setParams({
      ...params,
      source: queryParams?.source ?? defaultSource
    });
  }, [params, queryParams?.source, defaultSource]);
  switch (navigation) {
    case 'feed': {
      return (
        <Suspense fallback={null}>
          <FeedContent/>
        </Suspense>
      );
    }
    case 'analytics':
    case undefined: {
      return (
        <Suspense fallback={null}>
          <AnalyticsContent/>
        </Suspense>
      );
    }
    case 'audience': {
      return (
        <Suspense fallback={null}>
          <AudienceContent/>
        </Suspense>
      );
    }
    default: {
      return null;
    }
  }
});
export const ArtistPage = memo(() => {
  return (
    <div className="h-full relative overflow-x-hidden flex flex-col items-center">
      <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
        <div className="w-[108rem] flex-none flex justify-end">
          <picture>
            <img
              src={imgPng} alt=""
              className="w-[90rem] flex-none max-w-none hidden md:block"/>
          </picture>
        </div>
      </div>
      <Header/>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
        <Sidebar/>
      </div>
      <ArtistContent/>
    </div>
  );
});

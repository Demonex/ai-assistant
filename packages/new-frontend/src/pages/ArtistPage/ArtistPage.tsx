import {Sidebar} from './components/Sidebar/Sidebar.js';
import {lazy, memo, Suspense, useEffect, useMemo} from 'react';
import {ArtistNavigation, useArtist} from './hooks/useArtist.js';
import {useParams, useSearch} from 'wouter';

import Header from '../../components/HeaderMain/index.js';
import '../../index.css';
import {overviewSources} from '../../data/consts/favoriteSources.js';
import Catalogue from './components/Catalogue/index.js';
import {useSizes} from '../../hooks/useSizes.js';
import MobileTabs from './components/MobileTabs/index.js';
import SubscriptionsCalculator from '../Account/components/SubscriptionsCalculator.js';
import {useSubscriptionCalculator} from '../Account/components/hooks/useSubscriptionCalculator.js';


const FeedContent = lazy(() => import('./components/FeedContent.js'));
const AnalyticsContent = lazy(() => import('./components/Analytics/AnalyticsContent.js'));
const AudienceContent = lazy(() => import('./components/Audience/AudienceContent.js'));
const ToolsContent = lazy(() => import('./components/Tools/index.js'));

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
    case 'tools': {
      return (
        <Suspense fallback={null}>
          <ToolsContent/>
        </Suspense>
      );
    }
    case 'catalogue': {
      return (
        <Suspense fallback={null}>
          <Catalogue/>
        </Suspense>
      );
    }
    default: {
      return null;
    }
  }
});
export const ArtistPage = memo(() => {
  const {isMobile, isTablet} = useSizes();
  const {id} = useParams<{
    id?: string
    name?: string
    navigation?: ArtistNavigation
  }>();

  const {
    setArtistId
  } = useSubscriptionCalculator();

  useEffect(() => {
    if (!id) {
      return;
    }
    setArtistId(id);
  }, [id]);

  return (
    <div className="h-full relative overflow-x-hidden flex flex-col items-center">
      <Header/>
      <SubscriptionsCalculator/>
      <Sidebar/>
      <div
        className="flex lg:pl-[15.25rem]  lg:px-4 overflow-x-hidden flex-col items-center w-full relative mb-[4.5rem] lg:mb-[unset] mt-[68px] md:mt-[84px] lg:mt-[96px] ">
        <ArtistContent/>
      </div>
      {
        isMobile || isTablet
          ? <MobileTabs/>
          : null
      }
    </div>
  );
});

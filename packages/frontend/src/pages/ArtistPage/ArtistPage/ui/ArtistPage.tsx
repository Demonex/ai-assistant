import {Sidebar} from '../../components/Sidebar/Sidebar.js';
import {memo, useEffect } from 'react';
import {ArtistNavigation} from '../../hooks/useArtist.js';
import {useParams} from 'wouter';

import Header from '../../../../components/HeaderMain/index.js';
import '../../../../index.css';

import {useSizes} from '../../../../hooks/useSizes.js';
import MobileTabs from '../../components/MobileTabs/index.js';
import SubscriptionsCalculator from '../../../Account/components/Account/SubscriptionsCalculator.js';
import {useSubscriptionCalculator} from '../../../Account/components/hooks/useSubscriptionCalculator.js';
import { ArtistContent } from './ArtistContent.js';



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
  }, [id, setArtistId]);

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

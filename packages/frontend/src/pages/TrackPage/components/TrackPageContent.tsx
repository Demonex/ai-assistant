import {Tabs} from '../../ArtistPage/components/SocialTabs.js';
import Performance from '../components/Performance.js';
import {useTrack} from '../hooks/useTrack.js';
import TrackTable from './TrackTable.js';
import {useLocationWithGoBack} from '../../../hooks/useLocationWithGoBack.js';
import {ChartTrack} from './ChartTrack.js';
import {useArtist} from '../../ArtistPage/hooks/useArtist.js';
import {useChartTrackData} from '../hooks/useChartTrackData.js';
import React, {Fragment, memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Link, useParams, useSearch} from 'wouter';
import {overviewSources} from '../../../data/consts/favoriteSources.js';
import ChevronRight from "../../../assets/ChevronRight.js";
import PlusIcon from "../../../assets/PlusIcon.js";
import BasketIcon from "../../../assets/BasketIcon.js";
import ShareIcon from "../../../assets/ShareIcon.js";
import RelativeLinksIcon from "../../../assets/RelativeLinksIcon.js";
import settings from "*.svg";
import {useChangeTab} from "../../ArtistPage/hooks/useChangeTab.js";
import {SettingsIcon} from "../../../assets/Settings.js";
import {Dialog, Popover, Transition} from "@headlessui/react";
import SecondaryCloseIcon from "../../../assets/SecondaryCloseIcon.js";
import SecondaryButton from "../../../components/SecondaryButton.js";

const TrackPageContent = memo(() => {
  const params = useParams<{
    id?: string
    'id-track'?: string
    name: string
  }>() || {};
  const trackId = useMemo(() => {
    return params['id-track'];
  }, [params['id-track']]);
  const {setParams, name} = useArtist();
  const {trackData, idTrack, idArtist, source, setIdTrack} = useTrack({trackId});
  const {source: currentSource} = useArtist();
  const [location, navigate, goBack] = useLocationWithGoBack();
  const {changeTab} = useChangeTab();
  const [showLinks, setShowLinks] = useState(false);
  const getCurrentSourceLinks = trackData?.links.filter(source => {
    return source.source === String(currentSource)
  });

  const goBackConditional = useCallback(() => {
    if (window?.history?.length > 2) {
      goBack();
    }
    navigate(`/artist/${idArtist}/${name}/analytics`);
  }, [window?.history, idArtist]);


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
    setParams((params) => ({
      ...params,
      source: queryParams?.source ?? defaultSource
    }));
  }, [queryParams?.source, defaultSource]);

  useEffect(() => {

    if (!params['id-track'] || !setIdTrack) {
      return;
    }

    setIdTrack(params['id-track']);

  }, [params['id-track'], setIdTrack]);

  const {setTrackId, setIdArtist, setSource} = useChartTrackData();
  useEffect(() => {
    if (!idTrack || !idArtist || !source) {
      return;
    }
    setTrackId(idTrack);
    setIdArtist(idArtist);
    setSource(source);
  }, [idTrack, idArtist, source]);

  return (
    <div
      className="flex lg:pl-[15.25rem]  lg:px-4 overflow-x-hidden flex-col items-center w-full relative  lg:mb-[unset] mt-[4.25rem] md:mt-[5.25rem] lg:mt-[6rem]">
      <main className="h-full relative z-20 pt-6 w-full px-4 md:px-6 lg:pl-6 lg:pr-2 flex flex-col gap-4 ">
        <header id="header" className="flex flex-col gap-4 lg:flex-row items-start pb-4 ">
          <div className="flex w-full items-center gap-4 md:gap-6 ">
            <button onClick={goBackConditional}>
              <ChevronRight className='fill-white w-5 h-5 md:w-10 md:h-10 rotate-180'/>
            </button>
            <div className="min-w-[3.75rem] h-[3.75rem] md:min-w-20 md:h-20 rounded-[12px] overflow-hidden">
              <div style={{
                backgroundImage: `url(${trackData?.trackInfo?.avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%'
              }}/>
            </div>
            <div className="flex flex-col items-start w-full  gap-2 ">
              <h1
                className="text-[1.25rem] font-medium md:text-t1Semi_deck  md:max-w-[unset]">{trackData?.trackInfo?.trackName}</h1>
              <p
                className="text-t2Regular text-light_grey">{trackData?.trackInfo?.artistName}</p>
            </div>
          </div>
          <div className='flex w-full justify-center md:justify-end lg:items-center gap-8'>
            <div className='relative '>
              <Popover>
                {({ open }) => (
                  <>
                    <Popover.Button>
                      <div
                        className='w-7 h-7 border border-light_grey rounded-lg flex justify-center items-center text-caption_s_desk cursor-pointer'>
                        <span>{getCurrentSourceLinks?.length}</span>
                      </div>
                    </Popover.Button>
                    <Transition
                      show={open}
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Popover.Panel static>
                        <div
                          className='absolute bg-popup_gray px-4 top-[calc(100%+1rem)] -left-[8rem] z-50  rounded-[4px] max-w-[24.5rem] max-h-[27.5rem] overflow-y-scroll transition-all opacity-100'>
                          <div className='overflow-y-auto'>
                            <ul className='py-4'>
                              {
                                getCurrentSourceLinks?.map((link, index) => (
                                  <li className='py-3.5 px-5 border-b border-secondary_dark_gray' key={index}>
                                    <a href={link.url} target='_blank'>
                                      {link.url}
                                    </a>
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
            <PlusIcon className='stroke-white cursor-pointer'/>
            <BasketIcon className='fill-white cursor-pointer'/>
            <ShareIcon className='fill-white cursor-pointer'/>
            <Link to={`/share/track/${trackId}/${trackData?.trackInfo?.baseUrl.split('/').pop()}`}>
              <RelativeLinksIcon className='fill-white cursor-pointer hover:fill-medium_grey'/>
            </Link>
          </div>
        </header>
        <section className="h-full mb-16 relative">
          <div className="h-full relative z-10">
            <div className="h-full flex  mb-6 flex-col overflow-y-scroll pb-[100px]">
              <div className="py-4 lg:pt-2 border-b border-secondary_dark_gray/50 lg:border-none">
                <div className='flex min-w-full items-center gap-4 '>
                  <button className='min-w-5 h-5'>
                    <ChevronRight color={changeTab === 0 || changeTab === undefined ? '#7B7B7B' : 'white'}
                                  className={`rotate-[180deg]`}/>
                  </button>
                  <Tabs/>
                  <button className='min-w-5 h-5'>
                    <ChevronRight color='white' className={``}/>
                  </button>
                  <SettingsIcon className='stroke-white'/>
                </div>
              </div>
              <p className='text-[10px] leading-3 text-medium_grey mt-2 lg:hidden'>*компания Meta Platforms Inc., владеющая
                Facebook и Instagram, внесена в реестр экстремистских организаций, ее деятельность в России по
                поддержанию указанных соцсетей признана экстремистской деятельностью</p>
              <div className="w-full flex flex-col 2xl:flex-row justify-start xl:justify-center gap-4 lg:gap-6 py-6">
                <ChartTrack/>
                <Performance/>
              </div>
              <div className="w-full h-auto">
                <TrackTable/>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
});
export default TrackPageContent;

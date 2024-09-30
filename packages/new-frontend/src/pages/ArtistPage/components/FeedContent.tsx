import {Dialog, Transition} from '@headlessui/react';
import React, {Fragment, memo, useEffect, useMemo, useState} from 'react';
import {socials} from '../../../data/consts/socials.js';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import {useArtist} from '../hooks/useArtist.js';
import {useLazyFetch} from '../../../hooks/useFetch.js';
import {useArtistProfile} from '../hooks/useArtistProfile.js';
import {BACKEND_URL} from '../../../constants/index.js';
import '../../../index.css';
import {useSubscriptions} from '../../../hooks/useSubscriptions.js';
import {Tabs} from "./SocialTabs.js";
import ChevronRight from "../../../assets/ChevronRight.js";
import settings from "/assets/svg/settings_icon.svg";
import {useChangeTab} from "../hooks/useChangeTab.js";
import { overviewSources} from "../../../data/consts/favoriteSources.js";
import {navbar} from "../../../data/consts/navbar.js";
import {ShowOnLaptopToDesktop} from "../../../components/SowOnLaptopToDeckTop/index.js";
import {ShowOnMobileToTablet} from "../../../components/showFromMobileToTablet/index.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {useOpenMobileSidebar} from "../hooks/useOpenMobileSidebar.js";
import {Sidebar, SidebarMobile} from "./Sidebar/Sidebar.js";
import ArtistMobileHeader from "./ArtistMobileHeader.js";
import PrimaryButton from "../../../components/PrimaryButton.js";
import reload from "/assets/svg/reload_icon.svg";
import LockIcon from "../../../assets/LockIcon.js";
import {useAccount} from "../../../components/Header/hooks/useAccount.js";
import SecondaryButton from "../../../components/SecondaryButton.js";


type PopupProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<PopupProps['isOpen']>>
}


const Popup = memo<PopupProps>(({isOpen, setIsOpen}) => (
  <Transition
    show={isOpen}

    as={Fragment}
  >
    <Dialog onClose={() => setIsOpen(false)}
            className="relative z-50"
    >
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true"/>
      </Transition.Child>

      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 flex w-[80%] md:max-w-md  items-center justify-center bg-gradient-to-b from-indigo-500/40 via-indigo-500/30 rounded-xl p-[0.060rem] text-center bg-gray-900 max-h-[15rem]">
          <Dialog.Panel
            className="w-full bg-gray-900 px-6 h-full rounded-xl flex flex-col items-start justify-center">
            <Dialog.Title className="font-bold text-white mb-4 text-xl">You've Found A Premium
              Feature!&nbsp; 😎</Dialog.Title>
            <Dialog.Description
              className="text-sm text-transparent capitalize bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text font-light">
              Subscribe in order to filter by source type.
            </Dialog.Description>
            <div className="w-full flex py-3 justify-end gap-4 mt-8">
              <button onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-white rounded-[8px] border border-indigo-500 text-xs">Cancel
              </button>
              <button onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-white rounded-[8px] bg-indigo-400 text-xs">Subscribe
              </button>

            </div>
          </Dialog.Panel>
        </div>
      </Transition.Child>

    </Dialog>
  </Transition>
));

const SkeletonFeedContent = memo(() => (
  <SkeletonTheme baseColor="#C7D2FE0D"
                 highlightColor="#C7D2FE12">
    {
      Array.from({length: 10}).map((_, index) => (
        <li
          className="relative pl-10 gap-16 pb-8"
          style={{counterIncrement: 'step-1'}}
          key={index}>
          <div className="mb-6 col-span-2 xl:mb-0 w-full xl:w-[70%] 2lg:w-[80%] relative">
            <div
              className="flex items-center justify-center rounded-md  p-[0.060rem] text-center bg-gray-900 aspect-square absolute w-[2rem] h-[2rem] top-[50%] -translate-y-1/2 -left-[2.75rem]">
              <Skeleton width={32} height={32}/>
            </div>
            <div
              className="ring-1 ring-inset ring-white/5 text-white shadow-2xl rounded-xl w-full">
              <div
                className="bg-transparent p-4 rounded-xl h-full flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Skeleton width={16} height={16}/>
                  <div className="flex flex-col">
                    <h4
                      className="text-sm leading-6">{<Skeleton width={100}/>}</h4>
                    <p
                      className="text-md">{<Skeleton width={150}/>}</p>
                  </div>
                </div>
                <div>
                  <a href="#" className="items-center block sm:flex gap-3">
                    <Skeleton width={50} height={50}/>
                    <div className="text-gray-600 dark:text-gray-400">
                      <Skeleton width={300}/>
                      <Skeleton width={100}/>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))
    }
  </SkeletonTheme>
));
const SkeletonLocked = memo(() => (
  <SkeletonTheme baseColor="#C7D2FE0D"
                 highlightColor="#C7D2FE12">
    <div className="w-full h-full flex flex-col justify-center items-center gap-2 p-4">
      <Skeleton width={300} height={30}/>
      <Skeleton width={500}/>
      <div className="relative button-wrapper w-fit h-[36px] mt-4 ">
        <Skeleton width={200} height={36} borderRadius={10}/>
      </div>
    </div>
  </SkeletonTheme>
));

export const FeedContent = memo(() => {
  const {setSource} = useArtist();
  const {openMobileSidebar, setOpenMobileSidebar} = useOpenMobileSidebar();
  const {isMobile, isTablet} = useSizes();
  const {profile} = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const {source,} = useArtist();
  const {id} = useArtist();
  const {data: artistProfile} = useArtistProfile();
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const {changeTab} = useChangeTab();
  const [{data: feedDataFree, loading: loadingFree}, fetchFeedFree] = useLazyFetch({
    url: `${BACKEND_URL}/proxy/api/v1/activities/index`
  });

  const [{data: feedDataPaid, loading: loadingPaid}, fetchFeedPaid] = useLazyFetch({
    url: `${BACKEND_URL}/proxy-paid/v1/artists/activities`
  });

  const {subscriptions, subscribe, unsubscribe,isSubscribed} = useSubscriptions();


  /*
    const chankNews = feedDataFree.tracks.reduce((cur, item) => {
      console.log(cur, item);
      const date = new Date();
      const formattedDate = DateTime.fromJSDate(date).toFormat(`yyyy-MM-dd`);
      const getTodayNews = item.filter(elem => elem.date === formattedDate);
      return {
        ...item,
        'today': getTodayNews,
        'other': cur
      }
    },{})*/




  const fetchFeed = useMemo(() => {
    return isSubscribed ? fetchFeedPaid : fetchFeedFree;
  }, [isSubscribed]);

  const loading = useMemo(() => {
    return isSubscribed ? loadingPaid : loadingFree;
  }, [isSubscribed]);

  const feedData = useMemo(() => {
    return isSubscribed ? {
      tracks: feedDataPaid?.data?.map(({
                                         track_info,
                                         ...rest
                                       }) => ({...rest, ...track_info})) || []
    } : feedDataFree;
  }, [isSubscribed, feedDataFree, feedDataPaid]);

  useEffect(() => {
    if (!source) {
      return;
    }
    void fetchFeed({
      params: {
        [isSubscribed ? 'songstats_artist_id' : 'idUnique']: id,
        page,
        source
      }
    });
  }, [page, fetchFeed, isSubscribed, source]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
      return;
    }
    setIsFetching(true);
  };

  useEffect(() => {
    if (!isFetching) return;
    setPage((prevState) => prevState + 1);
  }, [isFetching]);
  useEffect(() => {
    const overview = overviewSources.find(item => item.slug === 'overview')
    setSource(overview.slug)
  }, []);

  return (
    <>
      {
        openMobileSidebar
          ? <SidebarMobile/>
          :
            <main className=" h-full relative z-20 pt-4 xl:max-w-none w-full px-4 md:px-8 lg:pl-6 lg:pr-2">
              <header id="header"
                      className="pb-3 border-b border-popup_gray md:border-none md:pb-[unset] md:mb-6 md:flex justify-between items-center  lg:px-[unset]">
                {
                  isMobile || isTablet
                    ? <ArtistMobileHeader/>
                    : <div className="flex-auto max-w-4xl">
                      <h1 className="text-t1Semi_deck">Активность</h1>
                    </div>
                }
                <PrimaryButton
                  titleClassName='text-caption_m_desk text-light_grey'
                  className='px-6 py-4 border border-solid border-medium_grey rounded-xl hidden lg:flex'
                  title='Обновить'
                  isIcon={true}
                  icon={reload}/>
              </header>
              <section className=" relative">
                <div className="relative z-10">
                  <div className=" flex overflow-y-auto ">
                    <div
                      className="flex min-w-full items-center gap-4 justify-between pb-3 md:pb-4 lg:pb-[unset] lg:px-[unset] border-b border-[#33333380] lg:border-none pt-3 md:pt-[unset]">
                      <ShowOnLaptopToDesktop>
                        <button className='min-w-5 h-5'>
                          <ChevronRight color={changeTab === 0 || changeTab === undefined ? '#7B7B7B' : 'white'}
                                        className={`rotate-[180deg]`}/>
                        </button>
                      </ShowOnLaptopToDesktop>
                      <Tabs/>
                      <ShowOnLaptopToDesktop>
                        <button className='min-w-5 h-5'>
                          <ChevronRight color='white' className={``}/>
                        </button>
                      </ShowOnLaptopToDesktop>
                      <img className='fill-white w-7 h-7 ' src={settings}/>
                    </div>
                    <Popup isOpen={isOpen} setIsOpen={setIsOpen}/>
                  </div>
                  <ShowOnMobileToTablet>
                    <p className='text-[10px] font-normal leading-3 text-left text-medium_grey  mt-2'>*компания
                      Meta
                      Platforms Inc., владеющая Facebook и Instagram, внесена в реестр экстремистских организаций, ее
                      деятельность в России по поддержанию указанных соцсетей признана экстремистской деятельностью</p>
                  </ShowOnMobileToTablet>
                </div>
                 {isSubscribed ? null : (
              <div className="w-full">
                {
                  loading === true
                    ? <SkeletonLocked/>
                    : (
                      <div className="w-full flex flex-col justify-center items-center gap-6 py-6 px-4 lg:p-8 mt-8 mb-4 md:py-6 md:my-6 rounded-xl border border-secondary_dark_gray">
                        <div className=" flex flex-col justify-center items-center gap-4">
                          <div className='flex items-center gap-4'>
                            <LockIcon className='stroke-yellow min-w-8'/>
                            <h1 className="text-t1Mobile md:text-t1Regular text-light_grey">Активность за последние 30 дней недоступна</h1>
                          </div>
                          {
                            !profile && (
                              <p className="text-t2Regular text-medium_grey text-center">Войдите или зарегистрируйтесь, чтобы получить доступ к подписке.</p>
                            )
                          }
                          {
                            !isSubscribed && (
                              <p className="text-t2Regular text-medium_grey text-center">Подпишись на артиста, чтобы пользоваться всеми возможностями ленты и получать уведомления о новых действиях!</p>
                            )
                          }
                        </div>
                        {
                          !profile && (
                            <SecondaryButton title='Войти' className='border-none bg-primary_blue text-white w-full md:w-fit'/>
                          )
                        }
                        {
                          !isSubscribed && (
                            <SecondaryButton
                              title={`Подпишись
                              на ${artistProfile?.account.name}`}
                              className='border-none bg-primary_blue text-white w-full md:w-fit  '/>
                          )
                        }
                      </div>
                    )
                }
              </div>
            )}
                <div>
                  <p className='text-medium_grey text-caption_r_desk'>В прошлом месяце</p>
                </div>
                {
                  source === 'overview'
                    ? <ol className="relative py-4  grid xl:grid-cols-2 gap-4 lg:gap-6 lg:px-[unset]"
                          style={{counterReset: 'step-0'}}>
                      {
                        loading === true
                          ? <SkeletonFeedContent/>
                          : feedData?.tracks?.map((item, index) => {
                            const getSourceActivity = navbar[0].content[0].options.find(elem => elem.slug === item.source);
                            /* const date = new Date(`${item.date || item.activity_date}`);
                             const dd = new Date(date).getDate();
                             const mm = new Date(date).toLocaleString('default', {month: 'short'});*/
                            return (
                              <li
                                className="relative "
                                style={{counterIncrement: 'step-1'}}
                                key={index}>
                                <div className="p-4 bg-popup_gray/50 rounded-xl">
                                  <div
                                    className="flex gap-4">
                                    {
                                      !isMobile && (
                                        <div className='w-7 h-7'>
                                          <img src={getSourceActivity?.logo}/>
                                        </div>
                                      )
                                    }
                                    <div
                                      className="w-full flex flex-col">
                                      <div
                                        className='flex w-full pb-2 border-b border-dark_grey gap-2 md:gap-4 md:items-center flex-col md:flex-row'>
                                        <div className='flex gap-4'>
                                          {
                                            isMobile && (
                                              <div className='w-7 h-7'>
                                                <img src={getSourceActivity?.logo}/>
                                              </div>
                                            )
                                          }
                                          <div className='w-7 h-7 bg-medium_grey'/>

                                        </div>
                                        <div className='flex flex-col-reverse md:flex-row gap-2 md:gap-4'>
                                          <p
                                            className="text-t2Regular truncate max-w-[250px]">{item.actionSubjectText || item.title}</p>
                                          <h4
                                            className="text-caption_r_desk text-medium_grey whitespace-nowrap">{item.actionDescriptorText || item.activity_text}</h4>
                                        </div>

                                      </div>
                                      <div className='mt-2'>
                                        <div className="items-center flex gap-4 justify-between"
                                        >
                                          <div className="items-center flex gap-4 ">
                                            <img className="w-11 h-11 rounded-full"
                                                 src={item.avatarFullpath || item.avatar}
                                                 alt="Jese Leos image"/>
                                            <div className="max-w-[180px] 2xl:max-w-full">
                                              <div className="text-t2Regular truncate">{item.trackName}</div>
                                              <div className="text-caption_s_desk text-medium_grey">{item.artistName}</div>
                                            </div>
                                          </div>

                                          <a href={item.externalUrl || item.activity_url} target="_blank"
                                             className='flex items-center gap-2.5 text-caption_m_desk whitespace-nowrap'>
                                            {isMobile ? '' : ' Перейти к треку'}
                                            <ChevronRight color={'white'}
                                                          className={`w-5 h-5`}/>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })
                      }
                    </ol>
                    : <div className='w-full'>
                      <h2 className='text-center text-t1Semi_deck'>Subscribe to get full info</h2>
                    </div>
                }
              </section>
            </main>
      }
    </>

  );
});

export default FeedContent;

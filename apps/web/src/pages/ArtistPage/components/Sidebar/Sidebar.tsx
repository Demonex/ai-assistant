import {Link} from 'wouter';
import React, {memo, useMemo} from 'react';
import {useArtistProfile} from '../../hooks/useArtistProfile.js';
import {socials} from '../../../../data/consts/socials.js';
import {useArtist} from '../../hooks/useArtist.js';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import {useMobileMenu} from '../../../../components/Header/components/MobileMenu/hooks/useMobileMenu.js';
import {useSubscriptions} from '../../../../hooks/useSubscriptions.js';
import subscribedIcon from '/assets/svg/subscribed_icon.svg';
import {buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PrimaryButton from '../../../../components/PrimaryButton.js';
import {navigations} from '../../../../data/consts/navigation.js';
import {useSizes} from '../../../../hooks/useSizes.js';
import SecondaryCloseIcon from '../../../../assets/SecondaryCloseIcon.js';
import {ArrowBack} from '../../../../assets/ArrowBack.js';
import {useOpenMobileSidebar} from '../../hooks/useOpenMobileSidebar.js';
import {useSubscriptionCalculator} from '../../../Account/components/hooks/useSubscriptionCalculator.js';


export const NavigationItems = memo(() => {
  const {id, navigation, name} = useArtist();
  const {setIsOpen} = useMobileMenu();
  const {isTablet, isMobile} = useSizes();
  return (
    <>
      {
        navigations.map((nav, index) => (
          <div key={index}
               className={`${isTablet || isMobile ? '' : 'py-4 border-b border-secondary_dark_gray/50 w-full'} `}>
            <Link to={`/artist/${id}/${name}${nav.component ? `/${nav.component}` : ''}`}
                  className={`group flex items-center text-btnText ${nav.component === navigation ? 'text-medium_grey' : 'text-[white]'}  hover:text-medium_grey gap-2.5`}
                  onClick={() => setIsOpen(false)}
            >
              {nav.svg(nav.component === navigation)}
              {
                !isTablet && !isMobile && (
                  <p className="text-btnText"> {nav.title}</p>
                )
              }
            </Link>
          </div>
        ))
      }
    </>
  );
});

const SkeletonSideBar = memo(() => (
  <SkeletonTheme baseColor="#C7D2FE0D"
                 highlightColor="#C7D2FE12">
    <div className="flex flex-col items-center gap-6">
      <Skeleton width={180} height={180} circle={true}/>
      <div className="flex flex-col items-center">
        <Skeleton width="5rem" height="1.5rem"/>
        <Skeleton width="3rem" height="1.5rem"/>
      </div>
      <div
        className="flex justify-center flex-wrap lg:text-center gap-2 list-none ">
        {
          Array.from({length: 10}).map((option, index) => (
            <Link
              key={index}
              to=""
            >
              <Skeleton
                className="rounded-xl inline-flex items-center border border-indigo-500/30"
                width={34} height={34}/>
            </Link>
          ))
        }
      </div>
      <div className="relative button-wrapper w-[155px] h-[36px] mt-5">
        <Skeleton height={36}/>
      </div>

    </div>
  </SkeletonTheme>
));

export const SidebarMobile = memo(() => {
  const profile = useArtistProfile();
  const {subscriptions /*subscribe, unsubscribe*/} = useSubscriptions();
  const {id: artistId} = useArtist();
  const {setOpenMobileSidebar} = useOpenMobileSidebar();
  /* const artistId = useMemo(() => {
       return profile?.data?.account?.idUnique;
   }, [profile]);*/

  const isSubscribed = useMemo(() => {
    return !!subscriptions?.find(({artist}) => artist === artistId);
  }, [subscriptions, artistId]);
  const {data: artistProfile, loading: artistProfileLoading} = profile || {};
  const artistProfileFiltered = artistProfile?.account?.links?.map((social) => {
    return (
      {
        source: social.source,
        link: social.link
      }
    );
  });
  const socialsFiltered = artistProfileFiltered?.reduce((prev, item) => {
    const result = socials.find((elem) => elem.slug === item.source);
    return result ? [...prev, {
      link: item.link,
      logo: result?.logo
    }] : prev;
  }, []);
  return (
    <div
      className="mb-[4.5rem] overflow-y-auto mt-[4.375rem] py-6 px-4 relative">
      <button className="absolute left-2 p-2 top-2 z-20" onClick={() => setOpenMobileSidebar(false)}>
        <ArrowBack className='fill-white'/>
      </button>
      <nav id="nav" className=" relative flex flex-col h-full">
        <div className="relative">
          {
            artistProfileLoading === true
              ? <SkeletonSideBar/>
              : <div className="flex flex-col items-center gap-4 ">
                <div className="">
                  <CircularProgressbarWithChildren
                    value={80}
                    strokeWidth={2}
                    styles={buildStyles({
                      trailColor: '#0c0c0c',
                      pathColor: '#E4FF29'
                    })} className="w-[7.5rem] h-[7.5rem]">
                    <div
                      className="w-[7rem] h-[7rem] bg-cover bg-center bg-no-repeat rounded-full relative"
                      style={{
                        backgroundImage: `url(${artistProfile?.account?.imageUrl})`
                      }}/>
                  </CircularProgressbarWithChildren>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <h1 className="text-h4Desctop">{artistProfile?.account?.name}</h1>
                  <span
                    className="text-caption_r_desk text-medium_grey uppercase">{artistProfile?.account?.country}</span>
                </div>

                <div className={isSubscribed ? '' : 'mt-2.5'}>
                  <PrimaryButton
                    className={`py-3.5 px-11 rounded-xl text-caption_m_desk ${isSubscribed ? 'bg-medium_grey' : 'bg-primary_blue'}`}
                    title={`${isSubscribed ? 'Отписаться' : 'Подписаться'}`}
                    isIcon={false}
                    icon={subscribedIcon}
                    // onClick={() => isSubscribed ? unsubscribe(artistId) : subscribe(artistId)}
                  />
                  <div className={`w-full flex justify-center ${isSubscribed ? '' : 'mt-4'}`}>
                    <Link to="" className=" text-caption_m_desk text-light_grey text-center">Как
                      работает сервис?</Link>
                  </div>
                </div>
              </div>
          }
        </div>
        {
          <>
            <div
              className="flex justify-center flex-wrap gap-[18px] list-none mt-7">
              {
                socialsFiltered?.map((option, index) => (
                  <Link
                    key={index}
                    to={option.link}
                    target="_blank"
                  >
                    <div
                      className="bg-popup_gray p-1.5 rounded-full">
                      <img
                        src={option.logo} alt="" className="w-3.5 h-3.5"/>
                    </div>
                  </Link>
                ))
              }
            </div>
            <p className="text-[10px] text-medium_grey text-center mt-2 leading-3">*компания Meta Platforms
              Inc.,
              владеющая Facebook и Instagram, внесена в реестр экстремистских организаций, ее
              деятельность в России по поддержанию указанных соцсетей признана экстремистской
              деятельностью</p>
          </>
        }
      </nav>
    </div>
  );
});
export const Sidebar = memo(() => {
  const profile = useArtistProfile();
  const {isSubscribed} = useSubscriptions();
  // const {subscriptions, subscribe, unsubscribe} = useSubscriptions();
  const {
    setOpenModal
  } = useSubscriptionCalculator();
  const artistId = useMemo(() => {
    return profile?.data?.account?.idUnique;
  }, [profile]);

  const {data: artistProfile, loading: artistProfileLoading} = profile || {};
  const artistProfileFiltered = artistProfile?.account?.links?.map((social) => {
    return (
      {
        source: social.source,
        link: social.link
      }
    );
  });
  const socialsFiltered = artistProfileFiltered?.reduce((prev, item) => {
    const result = socials.find((elem) => elem.slug === item.source);
    return result ? [...prev, {
      link: item.link,
      logo: result?.logo
    }] : prev;
  }, []);
  return (
    <>
      <div
        className="hidden lg:block fixed z-20 inset-0  right-auto w-[15.25rem] mb-10 px-6 overflow-y-auto mt-[63px] md:mt-[103px] pt-6 border-r border-popup_gray">
        <nav id="nav" className="lg:text-sm lg:leading-6 relative flex flex-col h-full items-start">
          <div className="sticky pointer-events-none">
            <div className="relative pointer-events-auto">
              {
                artistProfileLoading === true
                  ? <SkeletonSideBar/>
                  : <div className="flex flex-col items-center gap-6 ">
                    <div className="px-7">
                      <CircularProgressbarWithChildren
                        value={80}
                        strokeWidth={2}
                        styles={buildStyles({
                          trailColor: '#0c0c0c',
                          pathColor: '#E4FF29'
                        })} className="w-[8.75rem] h-[8.75rem]">
                        <div
                          className="w-[8rem] h-[8rem] bg-cover bg-center bg-no-repeat rounded-full relative"
                          style={{
                            backgroundImage: `url(${artistProfile?.account?.imageUrl})`
                          }}/>
                      </CircularProgressbarWithChildren>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                      <h1 className="text-h4Desctop">{artistProfile?.account?.name}</h1>
                      <span
                        className="text-caption_r_desk text-medium_grey uppercase">{artistProfile?.account?.country}</span>
                    </div>

                    <div className={isSubscribed ? '' : 'mt-2.5'}>
                      {
                        !isSubscribed && (
                          <PrimaryButton
                            className={` py-3.5 px-11 rounded-xl text-caption_m_desk ${isSubscribed ? 'bg-medium_grey' : 'bg-primary_blue'}`}
                            title={`${isSubscribed ? 'Отписаться' : 'Подписаться'}`}
                            isIcon={false}
                            icon={subscribedIcon}
                            onClick={() => isSubscribed ? () => {
                            } : setOpenModal(true)}
                          />
                        )
                      }
                      <div className={`w-full flex justify-center ${isSubscribed ? '' : 'mt-4'}`}>
                        <Link to="" className=" text-caption_m_desk text-light_grey text-center">Как
                          работает сервис?</Link>
                      </div>
                    </div>
                  </div>
              }
            </div>
          </div>
          <div className="mt-11 flex flex-col w-full">
            <NavigationItems/>
          </div>
          {
            <>
              <div
                className="flex justify-center flex-wrap lg:text-center gap-4 list-none py-4 mt-7">
                {
                  socialsFiltered?.map((option, index) => (
                    <Link
                      key={index}
                      to={option.link}
                      target="_blank"
                    >
                      <div
                        className="bg-popup_gray p-1.5 rounded-full">
                        <img
                          src={option.logo} alt="" className="w-3.5 h-3.5"/>
                      </div>
                    </Link>
                  ))
                }
              </div>
              <p className="text-[10px] text-medium_grey text-start mt-2 leading-3">*компания Meta Platforms Inc.,
                владеющая Facebook и Instagram, внесена в реестр экстремистских организаций, ее
                деятельность в России по поддержанию указанных соцсетей признана экстремистской
                деятельностью</p>
            </>
          }
        </nav>
      </div>
    </>
  );
});

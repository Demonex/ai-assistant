import {memo, useEffect, useMemo, useState} from "react";
import RRR from '/assets/svg/RRRRR.svg'
import {SvgLogo} from "../../../../assets/Logo.js";
import {ChainIcon} from "../../../../assets/ChainIcon.js";
import {Link, useParams} from "wouter";
import {useTrack} from "../../../TrackPage/hooks/useTrack.js";
import {useLazyFetch} from "../../../../hooks/useFetch.js";
import type {TrackDataType} from "../../../TrackPage/types.js";
import {BACKEND_URL} from "../../../../constants/index.js";
import {navbar} from "../../../../data/consts/navbar.js";
import ChevronRight from "../../../../assets/ChevronRight.js";
import {useArtistProfile} from "../../hooks/useArtistProfile.js";

export const ProfileShearingPage = memo(() => {
  const params = useParams();
  const [idTrack, setIdTrack] = useState();
  const trackId = useMemo(() => {
    return params['id-track'];
  }, [params['id-track']]);
  const [{
    data: trackData,
    loading,
    error
  }, fetchData] = useLazyFetch<TrackDataType>();
  const {data: artistData} = useArtistProfile();
  // const {trackData, setIdTrack,idTrack} = useTrack(trackId);
  const outerLinksTrack = trackData?.links.map((source) => {
    const result = navbar[0].content[0].options.filter((item) => item.slug === source.source);
    return {
      url: source?.url,
      icon: result[0]?.logo,
      name: result[0]?.name
    }
  })
  const outerLinksArtist = artistData?.account?.links.map((source) => {
    const result = navbar[0].content[0].options.filter((item) => item.slug === source.source);
    return {
      url: source?.link,
      icon: result[0]?.logo,
      name: result[0]?.name
    }
  })
  const isArtist = params['artist'] === 'artist'
  console.log('data', artistData)
  console.log('isArtist', isArtist)

  useEffect(() => {
    if (!trackId) {
      return;
    }
    setIdTrack(trackId);
    void fetchData({
      url: `${BACKEND_URL}/proxy/api/v1/analytics_track/${trackId}/info`
    });
  }, [trackId]);
  return (
    <section className='w-full h-full '>
      <div className='h-full '>
        <div className='pt-10 pb-5 flex flex-col gap-6 max-w-[35rem] px-4 md:px-8 lg:mx-[12.5rem] h-screen'>
          <div className=' flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
              <SvgLogo className='fill-white max-w-[6.5rem]'/>
              <ChainIcon className='fill-white'/>
            </div>
            <div className='py-2 flex flex-col md:flex-row gap-6 lg:items-center'>
              <img src={isArtist ? artistData?.account?.imageUrl : trackData?.trackInfo?.avatar} alt=''
                   className={`w-[12.5rem] h-[12.5rem] ${isArtist ? 'rounded-full' : ' rounded-[1.25rem]'}`}/>
              <div className='flex flex-col gap-6'>
                <h1
                  className= ' text-t1Semi_mob md:text-t1Semi_deck'>{isArtist ? artistData?.account?.name : trackData?.trackInfo?.trackName}</h1>
                <p
                  className='text-t2Regular text-light_grey'>{isArtist ? artistData?.account?.country : trackData?.trackInfo?.artistName}</p>
              </div>
            </div>
          </div>
          <div className='h-full overflow-y-auto'>
            <div className='pb-2 border-b border-secondary_dark_gray'>
              <p className='uppercase text-caption_s_desk text-medium_grey'>ЭТОТ {isArtist ? 'АРТИСТ' : 'ТРЕК'} НА МУЗЫКАЛЬНЫХ ПЛАТФОРМАХ</p>
            </div>
            <ul className='h-full '>
              {
                isArtist
                  ? outerLinksArtist?.map((link, index) =>link?.name && (
                    <a key={index} href={link?.url} target='_blank' rel="noreferrer">
                      <li
                        className='p-4 flex justify-between items-center border-b border-secondary_dark_gray/50 cursor-pointer'>
                        <div className='flex items-center gap-2.5'>
                          <img src={link?.icon} alt='' className='w-5 h-5'/>
                          <h2 className='text-t2Regular'>{link?.name}</h2>
                        </div>
                        <ChevronRight className='fill-medium_grey w-5'/>
                      </li>
                    </a>
                  ))
                  : outerLinksTrack?.map((link, index) => link?.name && (
                    <a key={index} href={link?.url} target='_blank' rel="noreferrer">
                      <li
                        className='p-4 flex justify-between items-center border-b border-secondary_dark_gray/50 cursor-pointer'>
                        <div className='flex items-center gap-2.5'>
                          <img src={link?.icon} alt='' className='w-5 h-5'/>
                          <h2 className='text-t2Regular'>{link?.name}</h2>
                        </div>
                        <ChevronRight className='fill-medium_grey w-5'/>
                      </li>
                    </a>
                  ))
              }
            </ul>
          </div>
          <div className='-mt-2 flex flex-col gap-4'>
            <p className='text-medium_grey text-[10px] '>*компания Meta Platforms Inc., владеющая Facebook и Instagram,
              внесена в реестр экстремистских
              организаций, ее деятельность в России по поддержанию указанных соцсетей признана экстремистской
              деятельностью</p>
            <div className='flex justify-between items-center'>
              <SvgLogo className='fill-white max-w-[5rem]'/>
              <p className='text-caption_s_desk'>Получи аналитику своих треков</p>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full lg:w-1/2 h-full absolute md:-right-1/2 lg:right-0  top-0 overflow-hidden hidden md:block'>
        <img src={RRR} className='opacity-25'/>
      </div>
    </section>
  )
})

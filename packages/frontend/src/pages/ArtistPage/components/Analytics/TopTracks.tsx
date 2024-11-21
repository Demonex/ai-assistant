import {memo, useCallback, useState} from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import {useArtistTrack} from '../../hooks/useArtistTrack.js';
import {socials} from '../../../../data/consts/socials.js';
import {TrackDataType} from '../../types.js';
import useFetch, {useLazyFetch} from '../../../../hooks/useFetch.js';
import {useArtist} from '../../hooks/useArtist.js';
import useStateRef from 'react-usestateref';
import {BACKEND_URL} from "../../../../constants/index.js";
import InfoIcon from "../../../../assets/InfoIcon.js";
import {useSizes} from "../../../../hooks/useSizes.js";
import {Link} from "wouter";


const SkeletonTopTracks = memo(() => (
  <SkeletonTheme baseColor="#C7D2FE0D"
                 highlightColor="#C7D2FE12">
    <div className="bg-indigo-200/5 rounded-3xl my-3 h-fit py-4 px-3 xl:px-5 w-full">
      <div className="flex items-center gap-3 mb-5">
        <Skeleton width={32} height={32}/>
        <Skeleton width={150} height={20}/>
      </div>
      <div className="w-full flex justify-start items-center gap-2 mb-5 px-2">
        <Skeleton width={80} height={40}/>
        <Skeleton width={80} height={40}/>
      </div>
      {
        Array.from({length: 10}).map((_, index) => (
          <div className="w-full" key={index}>
            <div className="p-2 rounded-xl h-full flex justify-between ">
              <div className="flex flex-col gap-1.5">
                <span>{<Skeleton width={100}/>}</span>
                <p>{<Skeleton width={70}/>}</p>
              </div>
              <span>{<Skeleton width={50} height={32}/>}</span>
            </div>
          </div>
        ))
      }
    </div>
  </SkeletonTheme>
));

const WithButtons = memo<{
  data: TrackDataType['trackData']['listData'][number]
}>(({
      data
    }) => {
  const {id, source} = useArtist();
  const [activeButton, setActiveButton, activeButtonStateRef] = useStateRef(0);
  const [{data: dataLoaded, loading, error}, fetchData] = useLazyFetch({
    url: `${BACKEND_URL}/proxy/api/v1/analytics/top_list_track_data`
  });

  const handleButtonClick = useCallback((index: number, buttonId: string) => {
    setActiveButton(index);
    const requestButtonIdIndex = activeButtonStateRef.current;
    if (!data.items[requestButtonIdIndex]?.length) {
      void fetchData({
        params: {
          idUnique: id,
          source,
          buttonId
        }
      }).then(({data: {topListTrackData}}) => {
        data.items[requestButtonIdIndex] = topListTrackData?.items;
      });
    }
  }, []);

  return (
    <>
      <div className="w-full flex justify-start items-center gap-2 my-4  overflow-x-auto ">
        {
          data.buttons.map(({title, buttonId}, index) => (
              <button key={index}
                      className={`whitespace-nowrap text-caption_m_desk px-6 py-2 rounded-[30px] border border-solid transition-colors duration-150 ${index === activeButton ? 'bg-yellow border-transparent text-[black]' : 'bg-transparent border-dark_grey hover:border-yellow hover:text-white text-medium_grey'}`}
                      onClick={() => handleButtonClick(index, buttonId)}>
                {title}
              </button>
            )
          )
        }
      </div>
      <div className="w-full overflow-y-scroll flex flex-col gap-3 mt-2.5">
        {
          data.items[activeButton]?.length
            ? data.items[activeButton]?.map((track, index) => {
                if (index > 9) {
                  return null;
                }
                return (
                  <Link to={`/track/${track.idUnique}/${track.trackName?.split('/').pop()}?source=${source}`}
                    className="text-white rounded-xl w-full"
                    key={index}>
                    <div className="bg-transparent py-2.5 rounded-xl h-full flex justify-between items-center gap-5">
                      <div className="flex gap-4 items-start">
                        <img src={track.imageUrl} alt="" className="w-11 h-11 rounded-full"/>
                        <div className="flex flex-col gap-1.5 max-w-[15rem]">
                          <p
                            className="text-caption_r_desk whitespace-nowrap truncate">{track.primaryText}</p>
                          <p
                            className="text-caption_s_desk text-medium_grey capitalize line-clamp-1">{track.secondaryText}</p>
                        </div>
                      </div>
                      <span
                        className="text-caption_m_desk">{track.primaryValue}</span>
                    </div>
                  </Link>
                );
              }
            )
            : (
              loading
                ? (
                  <SkeletonTheme baseColor="#C7D2FE0D"
                                 highlightColor="#C7D2FE12">
                    {
                      Array.from({length: 10}).map((_, index) => (
                        <div className="w-full" key={index}>
                          <div className="p-2 rounded-xl h-full flex justify-between ">
                            <div className="flex flex-col gap-1.5">
                              <span>{<Skeleton width={100}/>}</span>
                              <p>{<Skeleton width={70}/>}</p>
                            </div>
                            <span>{<Skeleton width={50} height={32}/>}</span>
                          </div>
                        </div>

                      ))
                    }
                  </SkeletonTheme>
                )
                : null
            )
        }
      </div>
    </>
  );
});

export const TopTracks = memo(() => {
  const {data: trackData, loading: apiTrackDataLoading} = useArtistTrack();
  const {  source} = useArtist();
  return (
    <div className={`w-full  flex flex-col lg:flex-row gap-4 lg:gap-6 ${trackData?.trackData?.listData?.length > 2 ? 'flex-wrap' : ''} `}>
      {
        apiTrackDataLoading === true
          ? <SkeletonTopTracks/>
          : trackData?.trackData?.listData?.map((item, index) => {
            if (!('buttons' in item && item.items.length || (item as any).items?.length)) {
              return null;
            }
            return (
              <div
                className={`lg:bg-popup_gray/50 rounded-[20px] h-fit  lg:px-7 py-4 lg:py-8  w-full lg:max-w-[30rem]`}
                key={index}>
                <div className="flex items-center gap-3 pb-4 border-b border-dark_grey justify-between">
                  <p
                    className="text-btnText text-light_grey">{item.headerText}</p>
                  <InfoIcon className='fill-light_grey hover:fill-medium_grey'/>
                </div>
                {
                  'buttons' in item
                    ? (<WithButtons data={item}/>)
                    : (
                      <div className="w-full overflow-y-scroll flex flex-col gap-3 mb-5  mt-4">
                        {
                          (item as any).items?.map((track, index) => {
                            return (
                              <Link to={`/track/${track.idUnique}/${track.trackName?.split('/').pop()}?source=${source}`}
                                className="text-white rounded-xl w-full"
                                key={index}>
                                <div className="bg-transparent p-2 rounded-xl h-full flex justify-between items-center gap-10">
                                  <div className="flex gap-3 items-start">
                                    <img src={track.imageUrl} alt="" className="w-10 h-10"/>
                                    <div className="flex flex-col gap-1.5 max-w-[9.125rem]">
                                      <span
                                        className="font-normal text-gray-300 text-caption_r_desk whitespace-nowrap truncate">{track.artistName}</span>
                                      {
                                        track?.trackName && (
                                          <p
                                            className="text-gray-400 font-light text-[10px] xl:text-[12px] capitalize">{track.trackName}</p>
                                        )
                                      }
                                    </div>
                                  </div>
                                  <span
                                    className="text-t1Sem2_deck text-light_grey">{track.primaryValue}</span>
                                </div>
                              </Link>
                            );
                          })
                        }
                      </div>
                    )
                }
              </div>
            );
          })
      }
    </div>
  );
});

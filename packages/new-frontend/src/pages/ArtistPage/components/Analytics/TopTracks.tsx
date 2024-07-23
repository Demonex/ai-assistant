import {memo, useCallback, useState} from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import {useArtistTrack} from '../../hooks/useArtistTrack.js';
import {socials} from '../../../../data/consts/socials.js';
import {TrackDataType} from '../../types.js';
import useFetch, {useLazyFetch} from '../../../../hooks/useFetch.js';
import {useArtist} from '../../hooks/useArtist.js';
import useStateRef from 'react-usestateref';
import {BACKEND_URL} from "../../../../constants/index.js";


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
      <div className="w-full flex justify-start items-center gap-2 mb-5 px-2 overflow-x-auto">
        {
          data.buttons.map(({title, buttonId}, index) => (
              <button key={index}
                      className={`text-white text-xs px-4 py-2 rounded-[8px] border ${index === activeButton ? 'bg-indigo-500 border-transparent' : 'bg-transparent border-indigo-500'}`}
                      onClick={() => handleButtonClick(index, buttonId)}>
                {title}
              </button>
            )
          )
        }
      </div>
      <div className="w-full overflow-y-scroll flex flex-col gap-3 mb-5">
        {
          data.items[activeButton]?.length
            ? data.items[activeButton]?.map((track, index) => {
                if (index > 9) {
                  return null;
                }
                return (
                  <div
                    className="text-white rounded-xl w-full"
                    key={index}>
                    <div className="bg-transparent p-2 rounded-xl h-full flex justify-between items-center">
                      <div className="flex gap-3 items-start">
                        <img src={track.imageUrl} alt="" className="w-10 h-10"/>
                        <div className="flex flex-col gap-1.5 max-w-[9.125rem]">
                          <p
                            className="font-normal text-gray-300 text-sm xl:text-md">{track.primaryText}</p>
                          <p
                            className="text-gray-400 font-light text-[10px] xl:text-[12px] capitalize">{track.secondaryText}</p>
                        </div>
                      </div>
                      <span
                        className="text-sm xl:text-[1.125rem] text-transparent capitalize text-white font-bold">{track.primaryValue}</span>
                    </div>
                  </div>
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
  const getLogo = socials.filter((item, _) => {
    const getSource = trackData?.sourceId;
    return item.slug === getSource;
  });

  return (
    <div className="w-full min-w-full lg:min-w-[17rem] max-w-[20rem] flex flex-col md:flex-row lg:flex-col lg:items-center gap-4">
      {
        apiTrackDataLoading === true
          ? <SkeletonTopTracks/>
          : trackData?.trackData.listData.map((item, index) => {
            if (!('buttons' in item && item.items.length || (item as any).items?.length)) {
              return null;
            }
            return (
              <div
                className="bg-indigo-200/5 rounded-3xl my-3 h-fit py-4 px-3 xl:px-5 w-full"
                key={index}>
                <div className="flex items-center gap-3 mb-5 justify-center">
                  <div
                    className="flex w-6 xl:w-8 h-6 xl:h-8 items-center justify-center rounded-md  p-[0.060rem] text-center aspect-square">
                    <div
                      className="bg-indigo-200/5 border border-indigo-500/30 p-[6px] xl:p-[8px] h-full w-full rounded-md flex items-center justify-center ">
                      {
                        getLogo.map((logo, index) => (
                          <img src={logo.logo} alt="" className="w-[15px] h-[15px]" key={index}/>
                        ))
                      }
                    </div>
                  </div>
                  <p
                    className="text-sm lg:text-md text-transparent uppercase bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text ">{item.headerText}</p>
                </div>
                {
                  'buttons' in item
                    ? (<WithButtons data={item}/>)
                    : (
                      <div className="w-full overflow-y-scroll flex flex-col gap-3 mb-5">
                        {
                          (item as any).items?.map((track, index) => {
                            return (
                              <div
                                className="text-white rounded-xl w-full"
                                key={index}>
                                <div className="bg-transparent p-2 rounded-xl h-full flex justify-between items-center">
                                  <div className="flex gap-3 items-start">
                                    <img src={track.imageUrl} alt="" className="w-10 h-10"/>
                                    <div className="flex flex-col gap-1.5 max-w-[9.125rem]">
                                      <span
                                        className="font-normal text-gray-300 text-sm xl:text-md">{track.artistName}</span>
                                      <p
                                        className="text-gray-400 font-light text-[10px] xl:text-[12px] capitalize">{track.trackName}</p>
                                    </div>
                                  </div>
                                  <span
                                    className="text-sm xl:text-[1.125rem] text-transparent capitalize text-white font-bold">{track.primaryValue}</span>
                                </div>
                              </div>
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

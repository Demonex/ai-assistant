import {socials} from '../../../data/consts/socials.js';
import {useArtistProfile} from '../hooks/useArtistProfile.js';
import {useArtistChart} from '../hooks/useArtistChart.js';
import {useArtist} from '../hooks/useArtist.js';
import {memo} from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {Chart} from "./Chart/Chart.js";
import {Performance} from "./Analytics/Performance.js";
import {TopTracks} from "./Analytics/TopTracks.js";
import {RelatedTracks} from "./Analytics/RelatedTracks.js";
import {Tabs} from "./SocialTabs.js";
import '../../../index.css'
import {useSizes} from "../../../hooks/useSizes.js";

const SkeletonArtistMobilePage = memo(() => (
  <SkeletonTheme baseColor="#C7D2FE0D"
                 highlightColor="#C7D2FE12">
    <>
      <div className="w-full flex flex-col justify-center relative overflow-hidden items-center mt-[55px]">
        <div className="w-[50%] h-[50%] flex justify-center aspect-square mt-5">
          <Skeleton width='25rem' height='25rem'/>
        </div>
      </div>
      <div className="w-full flex flex-col items-center px-5 gap-3 z-30">
        <div className=" flex flex-col items-center gap-2">
          <Skeleton width='10rem' height='2rem'/>
          <Skeleton width='3rem' height='2rem'/>
            <div
              className="bg-gray-900/70 p-[8px] h-full w-full rounded-md flex items-center justify-center">
                  <Skeleton width={32} height={32}/>
            </div>
              <p
                className="text-md text-transparent capitalize bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text">{<Skeleton width='20rem' height='1.1rem'/>}</p>
        </div>
        <div className="w-full overflow-y-scroll flex flex-col gap-4 mb-5">
          {
           Array.from({length:4}).map((item, index) => (
              <div
                className="ring-1 ring-inset ring-white/5 text-white shadow-2xl rounded-xl w-full"
                key={index}>
                <div className="bg-transparent p-4 rounded-xl h-full flex justify-between">
                  <Skeleton width='10rem' height='1.1rem'/>
                  <Skeleton width='3rem' height='1.5rem'/>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  </SkeletonTheme>
))

export const ArtistMobilePage = memo(() => {
  const {data: artistProfile, loading:loadingArtistProfile} = useArtistProfile();
  const {data: chartData, loading} = useArtistChart();
  const getLogo = socials.filter((item, _) => {
    const getSource = chartData?.chart.source;
   return  item.slug === getSource;
  });
  const {elementRange} = useSizes(320, 1023);
  const artistAvatarSize = elementRange(10, 30);
  return (
    <>
      {
        loadingArtistProfile === true
        ? <SkeletonArtistMobilePage/>
          : <>
            <div
              className="w-full min-h-[30rem] md:min-h-[50rem] bg-cover bg-center bg-no-repeat absolute"
              style={{
                backgroundImage: `url(${artistProfile?.account.imageUrl})`,
                filter: ' blur(50px)'
              }}/>
            <div className="w-full flex flex-col justify-center relative overflow-hidden items-center mt-[55px] " style={{minHeight: `${artistAvatarSize}rem`}}>
              <div className="w-[50%] h-full flex justify-center aspect-square mt-5">
                <div className="w-full h-full bg-cover overflow-hidden bg-center bg-no-repeat rounded-3xl"
                     style={{
                       backgroundImage: `url(${artistProfile?.account.imageUrl})`
                     }}/>
              </div>
            </div>
            <div className="w-full flex flex-col items-center px-5 pt-8 gap-6 z-30">
              <div className=" flex flex-col items-center gap-3">
                <h1 className="text-2xl text-white font-bold tracking-wider block">{artistProfile?.account.name}</h1>
                <p className="text-gray-400 font-light text-sm block uppercase">{artistProfile?.account.country}</p>
                <div
                  className="flex w-8 h-8 items-center justify-center bg-gradient-to-b from-indigo-500/70 via-indigo-500/60 rounded-md  p-[0.060rem] text-center bg-gray-900/70 aspect-square">
                  <div
                    className="bg-gray-900/70 p-[8px] h-full w-full rounded-md flex items-center justify-center">
                    {
                      getLogo?.map((logo, index) => (
                        <img src={logo.logo} alt="" className="w-[15px] h-[15px]" key={index}/>
                      ))
                    }
                  </div>
                </div>
                {
                  getLogo?.map((itemName, index) => (
                    <p
                      className="text-md text-transparent capitalize bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text"
                      key={index}>{itemName.name} Playlist & Chart Positions</p>
                  ))
                }
              </div>
              <div className="w-full overflow-y-scroll flex flex-col gap-4 mb-5">
                <Tabs/>
                <Chart/>
                <Performance/>
                <TopTracks/>
                <RelatedTracks/>
              </div>
            </div>
          </>
      }
    </>
  );
});

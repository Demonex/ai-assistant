import {memo} from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {useArtistTrack} from '../../hooks/useArtistTrack.js';
import {socials} from "../../../../data/consts/socials.js";
import {Link} from "wouter";
import {useArtist} from "../../hooks/useArtist.js";
import {useTrack} from "../../../TrackPage/hooks/useTrack.js";

const SkeletonRelatedTracks = () => {
  return (
    <SkeletonTheme
      baseColor="#C7D2FE0D"
      highlightColor="#C7D2FE12"
    >
      <div className="flex items-center gap-3 justify-center mb-4">
        <Skeleton height={32}
                  width={32}/>
        <p className="text-sm lg:text-md"><Skeleton height={20} width={150}/></p>
      </div>
      <div>
        <ul className="w-full h-full grid grid-cols-2 md:grid-cols-5 justify-center 4xl:grid-cols-auto-fit-290 gap-4">
          {
            Array.from({length: 10}).map((item, index) => (
              <li
                className=""
                key={index}>
                <div className="rounded-xl border-l border-r border-b border-slate-200/5 ">
                  <div
                    className="flex items-end justify-center overflow-hidden rounded-t-xl">
                    <Skeleton width={150} height={150} borderRadius={10}/>
                  </div>
                  <div className="p-2 xl:p-4">
                    <h3 className=" text-sm font-bold leading-6">{<Skeleton/>}</h3>
                    <p className="mt-2 text-sm line-clamp-1">{<Skeleton/>}</p>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </SkeletonTheme>
  );
};

export const RelatedTracks = memo(() => {
  const {data: trackData, loading: apiTrackDataLoading} = useArtistTrack();
  const getLogo = socials.filter((item, _) => {
    const getSource = trackData?.sourceId;
    return  item.slug === getSource;
  });
  const {source} = useArtist();
  return (
    <div className="bg-indigo-200/5 rounded-3xl py-4 pb-20 w-full flex-1 h-full px-4 xl:px-6">

      {
        apiTrackDataLoading === true
          ? <SkeletonRelatedTracks/>
          : trackData?.trackData.relatedTracks.map((relatedTracksItem, index) =>
            (
              <div key={index}>
                <div className="flex items-center gap-3 justify-center mb-4">
                  <div
                    className="flex w-6 xl:w-8 h-6 xl:h-8 items-center justify-center aspect-square">
                    <div
                      className="bg-indigo-200/5 border border-indigo-500/30 p-[6px] xl:p-[8px] h-full w-full rounded-md flex items-center justify-center ">
                      {
                        getLogo.map((logo,index) => (
                          <img src={logo.logo} alt="" className="w-[15px] h-[15px]" key={index}/>
                        ))
                      }
                    </div>
                  </div>
                  <p
                    className="text-sm lg:text-md text-transparent uppercase bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text">{relatedTracksItem.headerText}</p>
                </div>
                <ul className="w-full h-full grid grid-cols-2 md:grid-cols-5  justify-center 4xl:grid-cols-auto-fit-290 gap-4">

                  {
                    relatedTracksItem.relatedTracks.map((track, index) => (
                      <li
                        className="group ring-1 ring-inset ring-white/5 text-white bg-gradient-to-b from-indigo-500/50 via-indigo-500/5  rounded-xl p-[0.060rem] overflow-hidden  shadow-gray-950 shadow-2xl max-w-[290px] "
                          key={index} >
                        <Link to={`/track/${track.idUnique}/${track.baseUrl.split('/').pop()}?source=${source}`}>
                          <div className="bg-gray-900/50  rounded-xl">
                            <div
                              className="flex items-end justify-center overflow-hidden rounded-t-xl border-b border-gray-800">
                              <div className="flex">
                                <img className="group-hover:scale-110 duration-300 aspect-square object-cover"
                                     loading="lazy"
                                     src={track.imageUrl}
                                     alt=""/>
                              </div>
                            </div>
                            <div className="p-2 xl:p-4">
                              <h3 className=" text-sm font-bold leading-6 text-white truncate"> {track.trackName}</h3>
                              <p className="mt-2 text-sm text-gray-400 line-clamp-1">{track.artistName}</p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            )
          )
      }
    </div>
  );
});

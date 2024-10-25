import {Tabs} from '../../ArtistPage/components/SocialTabs.js';
import {Chart} from '../../ArtistPage/components/Chart/Chart.js';
import Performance from '../components/Performance.js';
import {useArtistTrack} from '../../ArtistPage/hooks/useArtistTrack.js';
import {useTrack} from '../hooks/useTrack.js';
import TrackTable from './TrackTable.js';
import {useLocationWithGoBack} from '../../../hooks/useLocationWithGoBack.js';
import {ChartTrack} from './ChartTrack.js';
import {useArtistProfile} from '../../ArtistPage/hooks/useArtistProfile.js';
import {useArtist} from '../../ArtistPage/hooks/useArtist.js';
import {useChartTrackData} from '../hooks/useChartTrackData.js';
import {memo, useCallback, useEffect, useMemo} from 'react';
import {useParams, useSearch} from 'wouter';
import {overviewSources} from '../../../data/consts/favoriteSources.js';

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
  const [location, navigate, goBack] = useLocationWithGoBack();

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
      className=" h-full hidden laptop:flex lg:pl-[19.5rem] pt-24  px-8 overflow-x-hidden flex-col items-center w-full relative overflow-hidden">
      <main className="h-full max-w-4xl relative z-20 pt-10 xl:max-w-none w-full lg:mt-[62px] mt-[103px]">
        <header id="header" className="mb-8 md:flex md:items-start">
          <div className="flex w-full items-center gap-4">
            <button onClick={goBackConditional}>
              <svg width="22px" height="22px" viewBox="0 0 1024 1024"
                   style={{
                     display: 'inline-block', verticalAlign: 'middle'
                   }}>
                <g transform="scale(1) translate(0, 0)">
                  <path
                    d="M785.691 970.149c7.979 13.175-0.226 32.462-10.999 43.234s-37.063 15.184-47.833 4.411l-485.074-485.074c-4.991-4.992-8.079-11.889-8.079-19.506s3.087-14.514 8.079-19.506l485.074-485.074c10.773-10.773 34.658-11.371 48.937-2.206s19.566 34.505 8.791 45.278l-453.417 461.509 454.514 456.937z"
                    style={{fill: 'rgb(240, 240, 240)', fillOpacity: 1}}></path>
                </g>
              </svg>
            </button>

            <div className="w-16 h-16 rounded-[8px] overflow-hidden">
              <div style={{
                backgroundImage: `url(${trackData?.trackInfo?.avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%'
              }}/>
            </div>
            <div className="flex flex-col items-start w-full flex-1">
              <h1
                className="text-2xl font-extrabold tracking-tight text-slate-200">{trackData?.trackInfo?.trackName}</h1>
              <p
                className="text-sm font-normal tracking-tight text-slate-400">{trackData?.trackInfo?.artistName}</p>
            </div>
          </div>
        </header>
        <section className="h-full mb-16 relative">
          <div className="h-full relative z-10">
            <div className="h-full flex  mb-6 flex-col overflow-y-scroll pb-[100px]">
              <div className="flex-none min-w-full">
                <Tabs/>
              </div>
              <div className="w-full flex justify-start xl:justify-center gap-4">
                <div className="flex gap-4 flex-col items-center h-fit xl:flex-1 w-full">
                  <ChartTrack/>
                </div>
                <div className="hidden xl:block xl:w-[20rem] my-6">
                  <Performance/>
                </div>
              </div>
              <div className="w-full h-auto">
                <div className="w-full  border-b border-b-slate-200/5 p-4 ">
                  <h1 className="uppercase font-bold text-indigo-100 text-center">Premium feature</h1>
                </div>
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

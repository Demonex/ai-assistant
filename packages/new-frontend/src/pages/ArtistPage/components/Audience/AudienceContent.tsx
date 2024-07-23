import {memo, lazy, Suspense, useMemo} from 'react';
import {Tabs} from '../SocialTabs.js';
import {useArtistAudienceMap} from '../../hooks/useArtistAudienceMap.js';
import {useArtistAudienceSummery} from '../../hooks/useArtistAudienceSummery.js';
import get from 'lodash.get';
import {CountriesTable} from "./components/CountriesTable.js";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {useArtist} from '../../hooks/useArtist.js';
import {overviewSources} from '../../../../data/consts/favoriteSources.js';
import '../../../../index.css'
const MapChart = lazy(() => import('./components/MapChart.js'));

const ChartsTabs = memo(() => {
  const {data, mapTabSelected, setMapTabSelected} = useArtistAudienceMap();
  return (
    <ul className="border-b space-x-6 flex whitespace-nowrap border-slate-200/5 mb-px overflow-x-auto overflow-y-hiddenr">
      {
        data?.mapStats.map((chart, index) => (
          <li key={index} className='overflow-y-hidden overflow-x-hidden min-w-fit'>
            <button
              className={`capitalize flex text-4 leading-6 font-semibold pt-3 pb-2.5 border-b whitespace-nowrap overflow-x-hidden ${index === mapTabSelected ? 'text-indigo-400 border-indigo-500' : 'border-transparent text-slate-200 hover:border-slate-700'}`}
              onClick={() => setMapTabSelected(index)}
            >{chart.name}</button>
          </li>
        ))
      }
    </ul>
  );
});
const SkeletonChartsTabs = memo(() => (
  <SkeletonTheme baseColor="#C7D2FE0D"
                 highlightColor="#C7D2FE12">
    <div className='flex gap-3 py-3 border-b border-slate-600/30'>
      {
        Array.from({length: 2}).map((_, i) => (
          <Skeleton width='8rem' height='1.3rem' key={i}/>
        ))
      }
    </div>

  </SkeletonTheme>
));

const SkeletonDataSummary = memo(() => (
  <SkeletonTheme baseColor="#C7D2FE0D"
                 highlightColor="#C7D2FE12">
    {
      Array.from({length: 2}).map((_, i) => (
        <Skeleton width='9.625rem' height={100} className="border border-indigo-500/30" borderRadius={10} key={i}/>
      ))
    }
  </SkeletonTheme>
))
export const AudienceContent = memo(() => {

  const {source: sourceSlug} = useArtist();
  const {
    data: dataMap,
    mapTabSelected,
    mapButtonSelected,
    setMapButtonSelected,
    loading: dataMapLoading
  } = useArtistAudienceMap();
  const {data: dataSummery, loading: dataSummeryLoading} = useArtistAudienceSummery();

  const buttons: typeof dataMap.mapStats[number]['data']['columns'] = useMemo(() => {
    return get(dataMap, `mapStats.${mapTabSelected}.data.columns`, []).filter(({showInMap}) => showInMap);
  }, [dataMap]);

  const isDataExists = useMemo(() => {
    if (!dataMap && !dataSummery) {
      return true;
    }
    return Boolean(dataMap?.mapStats?.length || dataSummery?.summaryStats?.length);
  }, [dataMap, dataSummery]);

  const source = useMemo(() => {
    return overviewSources.find(({slug}) => slug === sourceSlug);
  }, [sourceSlug]);

  return (
    <>
      <div
        className="h-full laptop:flex lg:pl-[19.5rem]  px-6 overflow-x-hidden flex-col items-center w-full relative overflow-hidden">
        <main className="h-full max-w-4xl relative z-20 pt-10 xl:max-w-none w-full ">
          <header id="header" className="mb-8 md:flex md:items-start">
            <div className="flex-auto max-w-4xl">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-200">Audience</h1>
            </div>
          </header>
          <section className="h-full mb-16 relative">
            <div className="h-full relative z-10">
              <div className="h-full flex overflow-auto mb-6 flex-col">
                <div className="flex-none min-w-full overflow-y-hidden">
                  <Tabs/>
                </div>
                {
                  isDataExists
                    ? (
                      <>
                        <section className="w-full py-5 flex gap-6 overflow-x-auto min-h-[140px]">
                          {
                            dataSummeryLoading === true
                              ? <SkeletonDataSummary/>
                              : dataSummery?.summaryStats.map((item, index) => (
                                <div
                                  key={index}
                                  className="rounded-2xl bg-indigo-200/5 hover:bg-indigo-200/10 flex flex-col gap-1 min-w-[9.625rem] border border-indigo-500/30 py-3 px-4 items-center h-[100px]">
                                  <div className="flex flex-col gap-0.5 w-full">
                                    <h2
                                      className="font-normal text-white text-sm xl:text-[.9rem] whitespace-nowrap">{item.titleText}</h2>
                                    <p
                                      className="text-gray-400 font-light text-xs xl:text-md capitalize">{item.subtitleText}</p>
                                  </div>
                                  <h1
                                    className="text-2xl text-transparent capitalize bg-gradient-to-r from-indigo-400 to-indigo-500 bg-clip-text font-extrabold tracking-wider">{item.primaryValue}</h1>
                                </div>
                              ))
                          }
                        </section>
                        <section>
                          {
                            dataMapLoading === true
                              ? <SkeletonChartsTabs/>
                              : <ChartsTabs/>
                          }
                          <Suspense fallback={(<div className="map-container w-full h-full min-h-[480px]"/>)}>
                            <MapChart/>
                          </Suspense>
                          <div className="flex gap-2 justify-center md:justify-end">
                            {
                              buttons.map((button, index) => (
                                <button
                                  key={index}
                                  className={`text-white text-[10px] px-4 py-1.5 rounded-3xl border border-indigo-500
                          ${index === mapButtonSelected ? 'bg-indigo-500' : ''}`}
                                  onClick={() => setMapButtonSelected(index)}
                                >{button.name}</button>
                              ))
                            }
                          </div>
                        </section>
                        <section className=' mt-16 lg:mt-32 min-h-screen'>
                          <CountriesTable/>
                        </section>
                      </>
                    )
                    : (
                      <div className="mx-auto max-w-3xl flex items-start h-1/2 py-10 min-h-[50rem]">
                        <p className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
                          Subscribe to connect your {source?.name} account and import valuable Audience insights.</p>
                      </div>
                    )
                }
              </div>
            </div>
          </section>
        </main>
        <svg className="absolute blur-3xl right-[15%] top-[30.5rem] opacity-20" width="50%" height="20%"
             viewBox="0 0 400 400"
             fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_17_60)">
            <g filter="url(#filter0_f_17_60)">
              <path d="M128.6 0H0V322.2L332.5 211.5L128.6 0Z" fill="#4D07E3"></path>
              <path d="M0 322.2V400H240H320L332.5 211.5L0 322.2Z" fill="#4C00FF"></path>
              <path d="M320 400H400V78.75L332.5 211.5L320 400Z" fill="#7fcef3"></path>
              <path d="M400 0H128.6L332.5 211.5L400 78.75V0Z" fill="#7fcef3"></path>
            </g>
          </g>
          <defs>
            <filter id="filter0_f_17_60" x="-159.933" y="-159.933" width="719.867" height="619.867"
                    filterUnits="userSpaceOnUse">
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feGaussianBlur stdDeviation="109.9667" result="effect1_foregroundBlur_17_60"></feGaussianBlur>
            </filter>
          </defs>
        </svg>
        <svg className="absolute blur-[85px] right-[15%] top-[50%] opacity-25" width="50%" height="35%"
             viewBox="0 0 400 500"
             fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_17_60)">
            <g filter="url(#filter0_f_17_60)">
              <path d="M128.6 0H0V322.2L332.5 211.5L128.6 0Z" fill="#4D07E3"></path>
              <path d="M0 322.2V400H240H320L332.5 211.5L0 322.2Z" fill="#4C00FF"></path>
              <path d="M320 400H400V78.75L332.5 211.5L320 400Z" fill="#7fcef3"></path>
              <path d="M400 0H128.6L332.5 211.5L400 78.75V0Z" fill="#7fcef3"></path>
            </g>
          </g>
          <defs>
            <filter id="filter0_f_17_60" x="-159.933" y="-159.933" width="719.867" height="619.867"
                    filterUnits="userSpaceOnUse">
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feGaussianBlur stdDeviation="139.9667" result="effect1_foregroundBlur_17_60"></feGaussianBlur>
            </filter>
          </defs>
        </svg>

      </div>
    </>
  );
});

export default AudienceContent;

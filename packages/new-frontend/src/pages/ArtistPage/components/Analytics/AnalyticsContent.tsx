import {ArtistMobilePage} from '../ArtistMobile.js';
import {ShowOnMobileToTablet} from '../../../../components/Sizes/ShowOnMobileToTablet/ShowOnMobileToTablet.js';
import {Chart} from '../Chart/Chart.js';
import {memo} from 'react';
import {RelatedTracks} from './RelatedTracks.js';
import {Performance} from './Performance.js';
import {TopTracks} from './TopTracks.js';
import {Tabs} from '../SocialTabs.js';


export const AnalyticsContent = memo(() => {
  return (
    <>
      <ShowOnMobileToTablet>
        <ArtistMobilePage/>
      </ShowOnMobileToTablet>
      <div
        className=" h-full hidden laptop:flex lg:pl-[19.5rem]  px-8 overflow-x-hidden flex-col items-center w-full relative overflow-hidden pb-[100px]">
        <main className="h-full max-w-4xl relative z-20 pt-10 xl:max-w-none w-full ">
          <header id="header" className="mb-8 md:flex md:items-start">
            <div className="flex-auto max-w-4xl">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-200">Analytics</h1>
            </div>
          </header>
          <section className="h-full  relative">
            <div className="h-full relative z-10">
              <div className="h-full flex overflow-y-auto flex-col">
                <div className="flex-none min-w-full">
                  <Tabs/>
                </div>
                <div className="w-full flex justify-start xl:justify-center gap-4">
                  <div className="flex gap-4 flex-col items-center h-fit xl:flex-1 w-full">
                    <Chart/>
                    <RelatedTracks/>
                  </div>
                  <div className="hidden xl:block xl:w-[20rem] my-6">
                    <Performance/>
                    <TopTracks/>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <svg className="absolute blur-3xl right-[15%] top-[50%] opacity-30" width="50%" height="50%"
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
            <filter id="filter0_f_17_60" x="-159.933" y="-159.933" width="719.867" height="719.867"
                    filterUnits="userSpaceOnUse">
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feGaussianBlur stdDeviation="79.9667" result="effect1_foregroundBlur_17_60"></feGaussianBlur>
            </filter>
          </defs>
        </svg>
      </div>
    </>
  );
});
export default AnalyticsContent;

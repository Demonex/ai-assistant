import {ShowOnMobileToTablet} from '../../../../components/Sizes/ShowOnMobileToTablet/ShowOnMobileToTablet.js';
import {Chart} from '../Chart/Chart.js';
import {Fragment, memo, ReactNode, useEffect, useRef, useState} from 'react';
import {RelatedTracks} from './RelatedTracks.js';
import {Performance} from './Performance.js';
import {TopTracks} from './TopTracks.js';
import {Tabs} from '../SocialTabs.js';
import reload from '/assets/svg/reload_icon.svg'
import PrimaryButton from "../../../../components/PrimaryButton.js";
import settings from "/assets/svg/settings_icon.svg";
import ChevronRight from "../../../../assets/ChevronRight.js";
import {Dialog, Transition} from "@headlessui/react";
import {useChangeTab} from "../../hooks/useChangeTab.js";
import {useArtist} from "../../hooks/useArtist.js";
import {overviewSources} from "../../../../data/consts/favoriteSources.js";
import {useSizes} from "../../../../hooks/useSizes.js";
import {AnalyticsMobile} from "../AnalyticsMobile.js";
import {useArtistChart} from "../../hooks/useArtistChart.js";


function DialogPanel(props: { className: string, transition: boolean, children: ReactNode }) {
  return null;
}

export const AnalyticsContent = memo(() => {
  const {data} = useArtistChart();
  const {changeTab, setChangeTab} = useChangeTab();
  const [popupChart, setPopupChart] = useState(false);
  const {is1600} = useSizes();
  const refChart = useRef(null);
  const refChartContainer = useRef(null);
  const {setSource} = useArtist();
  const handlePopup = () => {
    if (!refChart.current && popupChart) {
      setPopupChart(false)
    }
    setPopupChart(true);
  }

  useEffect(() => {
    if (!refChart.current) {
      return
    }
  }, [popupChart]);
  return (
    <>
      <ShowOnMobileToTablet>
        <AnalyticsMobile/>
      </ShowOnMobileToTablet>
        <main className="h-full relative z-20 pt-4 xl:max-w-none w-full pl-6 pr-2 hidden lg:block">
          <header id="header" className="mb-6 md:flex justify-between items-center">
            <div className="flex-auto max-w-4xl">
              <h1 className="text-t1Semi_deck">Аналитика</h1>
            </div>
            <PrimaryButton
              titleClassName='text-caption_m_desk text-light_grey'
              className='px-6 py-4 border border-solid border-medium_grey rounded-xl'
              title='Обновить'
              isIcon={true}
              icon={reload}/>
          </header>
          <section className="h-full  relative">
            <div className="h-full relative z-10">
              <div className="h-full flex overflow-y-auto flex-col">
                <div className="flex min-w-full items-center gap-4">
                  <button className='min-w-5 h-5'>
                    <ChevronRight color={changeTab === 0 || changeTab === undefined ? '#7B7B7B' : 'white'}
                                  className={`rotate-[180deg]`}/>
                  </button>
                  <Tabs/>
                  <button className='min-w-5 h-5'>
                    <ChevronRight color='white' className={``}/>
                  </button>
                  <img className='fill-white w-7 h-7 ' src={settings}/>
                </div>
                <div className="flex gap-6 flex-col items-center h-fit ">
                  <section className={`w-full flex gap-6 mt-6 ${is1600 ? 'flex-row' : 'flex-col' } `}>
                    <Chart setPopupChart={setPopupChart} popupChart={popupChart}/>
                    <Performance/>
                  </section>
                  <section className={`w-full flex gap-6 mb-24 ${is1600 ? 'flex-row' : 'flex-col'}`}>
                    <RelatedTracks/>
                    <TopTracks/>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </main>
      <Transition appear show={popupChart} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50" onClose={() => setPopupChart(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/85 w-full h-full flex justify-center items-center"/>
          </Transition.Child>
          <div className="" ref={refChartContainer}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-popup_gray max-w-[1280px] my-20 mx-auto rounded-2xl">
                <Chart/>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

    </>
  );
});
export default AnalyticsContent;

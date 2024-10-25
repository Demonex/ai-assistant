import React, {memo, useState} from "react";
import ArtistMobileHeader from "../ArtistMobileHeader.js";
import PrimaryButton from "../../../../components/PrimaryButton.js";
import reload from "/assets/svg/reload_icon.svg";
import {useSizes} from "../../../../hooks/useSizes.js";
import {useArtistSongshare} from "../../hooks/useArtistSongshare.js";
import {Tab} from "@headlessui/react";
import HeaderMobileTools from "./components/HeaderMobile.js";
import {useOpenMobileSidebar} from "../../hooks/useOpenMobileSidebar.js";
import ChevronRight from "../../../../assets/ChevronRight.js";
import PublicProfile from "./components/PublicProfiles/PublicProfile.js";
import RecommendedPlaylists from "./components/Recommended/index.js";
import {useManageToolsMobile} from "../../hooks/useManageToolsMobile.js";
import RecommendedAccounts from "./components/RecommendedAccounts/index.js";
import Places from "./components/Places/index.js";


const tabs = [
  {
    title: 'Публичный профиль',
    id: 'public'
  },
  {
    title: 'Рекомендованные плейлисты',
    id: 'recommendedTracks'
  },
  {
    title: 'Рекомендованные аккаунты',
    id: 'recommendedAccounts'
  },
  {
    title: 'Места',
    id: 'places'
  },
]


const ToolsContent = memo(() => {
  const {isMobile, isTablet} = useSizes();
  const {data} = useArtistSongshare();
  const {mobileRender, setMobileRender} = useManageToolsMobile();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {setOpenMobileSidebar, openMobileSidebar} = useOpenMobileSidebar();
  return (
    <>
      <main className="h-full relative z-20  xl:max-w-none w-full lg:pl-6 lg:pr-2">
        <header id="header" className=" md:flex justify-between items-center lg:py-4">
          {
            isMobile || isTablet
              ? <HeaderMobileTools/>
              : <>
                <div className="flex-auto max-w-4xl">
                  <h1 className="text-t1Semi_deck">Инструменты</h1>
                </div>
                <PrimaryButton
                  titleClassName='text-caption_m_desk text-light_grey'
                  className='px-6 py-4 border border-solid border-medium_grey rounded-xl'
                  title='Обновить'
                  isIcon={true}
                  icon={reload}/>
              </>
          }
        </header>
        <section className='w-full flex-col hidden lg:flex'>
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex} vertical>
            <Tab.List
              className="flex gap-10 border-b border-secondary_dark_gray/50 overflow-x-auto overflow-y-hidden mt-1">
              {
                tabs.map((tab, index) => (
                  <div
                    className={` flex text-t2Regular px-4 py-2 border-solid border-b whitespace-nowrap ${selectedIndex === index ? 'text-medium_grey border-medium_grey' : 'border-transparent '}`}
                    key={index}>
                    <Tab
                    >{tab.title}
                    </Tab>
                  </div>
                ))
              }
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="w-full">
                <PublicProfile/>
              </Tab.Panel>
              <Tab.Panel className="w-full">
                <RecommendedPlaylists/>
              </Tab.Panel>
              <Tab.Panel className="w-full">
                <RecommendedAccounts/>
              </Tab.Panel>
              <Tab.Panel className="w-full">
                <Places/>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </section>
        <section className='px-4 md:px-8 lg:hidden'>
          {
            openMobileSidebar && (
              <div
                className="flex flex-col ">
                {
                  tabs.map((tab, index) => (
                    <div
                      className={` flex text-t2Regular p-6 border-solid border-b border-secondary_dark_gray/50 whitespace-nowrap ${selectedIndex === index ? 'text-medium_grey ' : ' '}`}
                      key={index}>
                      <button
                        onClick={() => {
                          setMobileRender(tab.id)
                          setOpenMobileSidebar(false)
                        }}
                        className='flex justify-between items-center w-full'>
                        <p>{tab.title}</p>
                        <ChevronRight color='white' width={20} height={20} className='min-w-5'/>
                      </button>
                    </div>
                  ))
                }
              </div>
            )
          }
          {
            !openMobileSidebar && (
              <div>
                {(() => {
                  switch (mobileRender) {
                    case 'public':
                      return <PublicProfile/>
                    case 'recommendedTracks':
                      return <RecommendedPlaylists/>
                    case 'recommendedAccounts':
                      return <RecommendedAccounts/>
                    case 'places':
                      return <Places/>
                  }
                })()}
              </div>
            )
          }
        </section>
      </main>
    </>
  )
})
export default ToolsContent

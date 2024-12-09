import Header from "../../components/HeaderMain/index.js";
import Footer from "../../components/FooterMain/index.js";
import React, {memo, useEffect, useRef, useState} from "react";
import SearchIcon from "../../assets/SearchIcon.js";
import PrimaryButton from "../../components/PrimaryButton.js";
import {useSearchData} from "../../components/Header/hooks/useSearchData.js";
import SecondaryButton from "../../components/SecondaryButton.js";
import {Link, useParams} from "wouter";
import {useSizes} from "../../hooks/useSizes.js";
import {Navigation,} from 'swiper/modules';
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import {ShowOnMobileOnly} from "../../components/Sizes/ShowOnMobileOnly/ShowOnMobileOnly.js";
import {motion, AnimatePresence} from "framer-motion";
import {wrap} from "popmotion";
import type {Swiper as SwiperClass} from "swiper/types";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const MobileSwiper = () => {
  const {
    searchData,
  } = useSearchData();
  const [swiper, setSwiper] = useState<SwiperClass>(null)
  return (
    <>
      {
        searchData.map((items, indexWrapper) => (
          <>
            {
              items?.title === 'songs'
                ? null
                : <div key={indexWrapper} className='py-3 px-4 bg-popup_gray/50 rounded-[20px] '>
                  <h2 className='text-h4Desctop capitalize mb-8'>
                    {items.title} &nbsp;
                    <span
                      className='text-t1Regular text-medium_grey'>({items.items.length})</span>
                  </h2>
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    onSwiper={(swiper) => setSwiper(swiper)}
                  >
                    {
                      items.items.map((item, indexSlide) => (
                        <SwiperSlide key={indexSlide}>
                          <div className='w-full flex justify-center'>
                            <div className='flex flex-col items-center gap-2.5'>
                              <div
                                className="flex justify-center h-[7.5rem] w-[7.5rem] flex-none rounded-full p-1 border border-yellow">
                                <div
                                  className="block h-full w-full rounded-full bg-cover bg-no-repeat bg-center"
                                  style={{
                                    backgroundImage: `url(${item?.photo})`
                                  }}
                                />
                              </div>
                              <p>{item?.title}</p>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))
                    }
                  </Swiper>
                </div>
            }
          </>
        ))
      }
    </>

  )
}

export const AllSearchResults = memo(() => {
  const {
    searchData,
    searchValue
  } = useSearchData();
  const {navigation} = useParams<{
    navigation: string
  }>();
  const {isMobile} = useSizes();
  const [showAllResults, setShowAllResults] = useState<number>(-1)
  const numberOfAllResults = searchData?.reduce((acc, elem) => acc + elem.items.length, 0);
  return (
    <div className='w-full flex flex-col h-[100vh] items-center '>
      <Header/>
      <div
        className='flex-1 w-full mt-[63px] md:mt-[103px] py-5 md:py-10 lg:py-[3.25rem] px-4 md:px-8 max-w-[1108px]'>

        <div className='w-full flex flex-col gap-4 md:gap-6 lg:gap-10'>
          <div className='w-full flex flex-col gap-4 md:gap-6'>
            <div className='w-full flex gap-4 md:gap-6 items-center'>
              <SearchIcon width={isMobile ? 40 : 60} color='white'/>
              <h1 className='text-h2Mobile md:text-h2Medium lg:text-h2Desctop'>{searchValue}</h1>
            </div>
            <div className='flex w-full flex-col md:flex-row gap-2.5 md:justify-between md:items-center'>
              <p className='text-t1Regular text-medium_grey'>Результаты поиска: {numberOfAllResults} </p>
              <PrimaryButton
                className='bg-primary_blue px-8 py-4 rounded-xl md:rounded-2xl text-btnText '
                title='Добавить артиста, лейбл или песню'
                titleClassName='truncate'
                isIcon={false}/>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4 md:gap-6'>
            <ShowOnMobileOnly>
              <div className='flex flex-col gap-4'>
                <MobileSwiper/>
              </div>
            </ShowOnMobileOnly>

            {
              searchData?.sort((a, b) => a.title.localeCompare(b.title)).map((items, indexObject) => (
                <div
                  className={"py-6 px-8 lg:px-9 rounded-[1.25rem] bg-popup_gray/50 w-full flex flex-col gap-6  "}
                  key={indexObject}
                >
                  <div className='w-full flex justify-between items-center'>
                    <h2 className='text-h4Desctop capitalize'>
                      {items.title} &nbsp;
                      <span
                        className='text-t1Regular text-medium_grey'>({items.items.length})</span>
                    </h2>
                    <SecondaryButton
                      className={`${showAllResults === indexObject ? 'hidden' : 'flex'} ${items?.title !== 'songs' && items?.items.length < 5 || items?.title === 'songs' && items?.items.length < 10 ? 'pointer-events-none border-medium_grey/50 text-medium_grey/50' : ''} hidden md:flex`}
                      title='Показать всех'
                      onClick={() => setShowAllResults(indexObject)}
                    />
                  </div>
                  <div
                    className={` ${items?.title === 'songs' ? 'w-full flex  flex-wrap' : 'gap-7 lg:gap-10 md:grid md:grid-cols-5 flex '}`}>
                    {
                      items?.items.map((item, itemIndex) => (
                        <>
                          {
                            items?.title === 'songs'
                              ? <ul className='flex flex-col w-full ' key={itemIndex}>
                                <Link
                                  to={`/artist/${item.id}/${item.title}${navigation ? `/${navigation}` : '/analytics'}`}>
                                  <li className='py-3.5 px-5 w-full flex gap-4 border-b border-secondary_dark_gray'>
                                    <img src={item?.photo}
                                         className='w-11 h-11 rounded-full'/>
                                    <div className='flex flex-col'>
                                      <h3 className='text-t2Regular'>{item?.title}</h3>
                                      <p className='text-caption_s_desk text-medium_grey'>{item?.secondaryText}</p>
                                    </div>
                                  </li>
                                </Link>
                              </ul>
                              : <>
                                <Link
                                  to={`/artist/${item.id}/${item.title}${navigation ? `/${navigation}` : '/analytics'}`}>
                                  <div key={itemIndex}
                                       className=' flex flex-col gap-2.5 justify-center items-center'>
                                    <div
                                      className="flex justify-center h-[7.5rem] w-[7.5rem] flex-none rounded-full p-1 border border-yellow">
                                      <div
                                        className="block h-full w-full rounded-full bg-cover bg-no-repeat bg-center"
                                        style={{
                                          backgroundImage: `url(${item?.photo})`
                                        }}
                                      />
                                    </div>
                                    <p className='text-t2Regular truncate max-w-[150px]'>{item?.title}</p>
                                  </div>
                                </Link>
                              </>

                          }
                        </>
                      )).filter((_, indexFilter) => {
                        return (
                          showAllResults === indexObject ? indexFilter < items.items.length : items.title === 'songs' ? indexFilter < 10 : indexFilter < 5
                        )
                      })
                    }
                  </div>
                  <div className='w-full flex justify-center'>
                    <SecondaryButton
                      className={`w-fit ${showAllResults === indexObject ? 'flex' : 'hidden'}`}
                      title={`Свернуть список ${items?.title}`}
                      onClick={() => setShowAllResults(-1)}
                    />
                    <SecondaryButton
                      className={`w-fit md:hidden ${items?.items.length < 10 ? 'pointer-events-none border-medium_grey/50 text-medium_grey/50' : ''}`}
                      title={`${showAllResults === indexObject ? `Свернуть список ${items?.title}` : 'Показать полный список'}`}
                      onClick={() => setShowAllResults(-1)}
                    />
                  </div>

                </div>
              )).filter((elem, wrapperIndexFilter) => (isMobile ? wrapperIndexFilter === searchData.length - 1 : {...elem}))
            }
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
})
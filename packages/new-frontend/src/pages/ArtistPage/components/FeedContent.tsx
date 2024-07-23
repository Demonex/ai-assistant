import {Dialog, Transition} from '@headlessui/react';
import React, {Fragment, memo, useEffect, useState} from 'react';
import {socials} from '../../../data/consts/socials.js';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import {useArtist} from '../hooks/useArtist.js';
import {useLazyFetch} from '../../../hooks/useFetch.js';
import {useArtistProfile} from '../hooks/useArtistProfile.js';
import {BACKEND_URL} from '../../../constants/index.js';
import '../../../index.css'
type TabsProps = {
  setIsOpen: PopupProps['setIsOpen']
}

type PopupProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<PopupProps['isOpen']>>
}

const Tabs = memo<TabsProps>(({setIsOpen}) => {
  const togglePopup = (index: number) => {
    if(index === 0) {
      return;
    }
    setIsOpen(true);
  };
  return (
    <ul className="border-b border-slate-200 space-x-6 flex whitespace-nowrap dark:border-slate-200/5 mb-px ">
      {
        socials.map((tab, index) => (
          <li key={index}>
            <button
              className={`capitalize flex text-4 leading-6 font-semibold pt-3 pb-2.5 border-b-2 -mb-px ${index === 0 ? 'text-indigo-400 border-indigo-500' : 'border-transparent text-slate-200 hover:border-slate-700'}`}
              onClick={() => togglePopup(index)}>{tab.name}</button>
          </li>
        ))
      }
    </ul>
  );
});

const Popup = memo<PopupProps>(({isOpen, setIsOpen}) => (
  <Transition
    show={isOpen}

    as={Fragment}
  >
    <Dialog onClose={() => setIsOpen(false)}
            className="relative z-50"
    >
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true"/>
      </Transition.Child>

      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 flex w-[80%] md:max-w-md  items-center justify-center bg-gradient-to-b from-indigo-500/40 via-indigo-500/30 rounded-xl p-[0.060rem] text-center bg-gray-900 max-h-[15rem]">
          <Dialog.Panel
            className="w-full bg-gray-900 px-6 h-full rounded-xl flex flex-col items-start justify-center">
            <Dialog.Title className="font-bold text-white mb-4 text-xl">You've Found A Premium
              Feature!&nbsp; 😎</Dialog.Title>
            <Dialog.Description
              className="text-sm text-transparent capitalize bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text font-light">
              Subscribe in order to filter by source type.
            </Dialog.Description>
            <div className="w-full flex py-3 justify-end gap-4 mt-8">
              <button onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-white rounded-[8px] border border-indigo-500 text-xs">Cancel
              </button>
              <button onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-white rounded-[8px] bg-indigo-400 text-xs">Subscribe
              </button>

            </div>
          </Dialog.Panel>
        </div>
      </Transition.Child>

    </Dialog>
  </Transition>
));

const SkeletonFeedContent = memo(() => (
  <SkeletonTheme baseColor="#C7D2FE0D"
                 highlightColor="#C7D2FE12">
    {
      Array.from({length: 10}).map((_, index) => (
        <li
          className="relative pl-10 gap-16 after:absolute after:top-[6rem] after:-bottom-[2rem] after:left-[0.6875rem] after:w-px after:bg-slate-200/5 pb-8"
          style={{counterIncrement: 'step-1'}}
          key={index}>
          <div className="mb-6 col-span-2 xl:mb-0 w-full xl:w-[70%] 2lg:w-[80%] relative">
            <div
              className="flex items-center justify-center rounded-md  p-[0.060rem] text-center bg-gray-900 aspect-square absolute w-[2rem] h-[2rem] top-[50%] -translate-y-1/2 -left-[2.75rem]">
              <Skeleton width={32} height={32}/>
            </div>
            <div
              className="ring-1 ring-inset ring-white/5 text-white shadow-2xl rounded-xl w-full">
              <div
                className="bg-transparent p-4 rounded-xl h-full flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Skeleton width={16} height={16}/>
                  <div className="flex flex-col">
                    <h4
                      className="text-sm leading-6">{<Skeleton width={100}/>}</h4>
                    <p
                      className="text-md">{<Skeleton width={150}/>}</p>
                  </div>
                </div>
                <div>
                  <a href="#" className="items-center block sm:flex gap-3">
                    <Skeleton width={50} height={50}/>
                    <div className="text-gray-600 dark:text-gray-400">
                      <Skeleton width={300}/>
                      <Skeleton width={100}/>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))
    }
  </SkeletonTheme>
));
const SkeletonLocked = memo(() => (
  <SkeletonTheme baseColor="#C7D2FE0D"
                 highlightColor="#C7D2FE12">
    <div className="w-full h-full flex flex-col justify-center items-center gap-2 p-4">
      <Skeleton width={300} height={30}/>
      <Skeleton width={500}/>
      <div className="relative button-wrapper w-fit h-[36px] mt-4 ">
        <Skeleton width={200} height={36} borderRadius={10}/>
      </div>
    </div>
  </SkeletonTheme>
));

export const FeedContent = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const {id} = useArtist();
  const {data: artistProfile} = useArtistProfile();
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
   const [{data: feedData, loading}, fetchFeed] = useLazyFetch({
     url: `${BACKEND_URL}/proxy/api/v1/activities/index`
   });
  useEffect(() => {
    void fetchFeed({
      params: {
        idUnique: id,
        page,
        source: 'overview'
      }
    });
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
      return;
    }
    setIsFetching(true);
  };

  useEffect(() => {
    if(!isFetching) return;
    setPage((prevState) => prevState + 1);
  }, [isFetching]);

  return (
    <>
      <div
        className="h-full laptop:flex lg:pl-[19.5rem]  px-6 overflow-x-hidden flex-col items-center w-full relative ">
        <main className=" max-w-4xl relative z-20 pt-10 xl:max-w-none w-full">
          <header id="header" className="mb-8 md:flex md:items-start">
            <div className="flex-auto max-w-4xl">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-200">Activity
                Feed</h1>
            </div>
          </header>
          <section className="h-auto mb-16 relative">
            <div className="h-full relative z-10">
              <div className="h-full flex overflow-y-auto mb-6 -mx-4 sm:-mx-6">
                <div className="flex-none min-w-full px-4 sm:px-6">
                  <Tabs setIsOpen={setIsOpen}/>
                  <Popup isOpen={isOpen} setIsOpen={setIsOpen}/>
                </div>
              </div>
            </div>
            <div className="w-full xl:w-[80%] 2lg:w-[90%] h-[14rem] lg:h-[9rem] absolute backdrop-blur-[8px] z-10">
              {
                loading === true
                  ? <SkeletonLocked/>
                  : <div className="w-full h-full flex flex-col justify-center items-center gap-2 p-4">
                    <h1 className=" text-[18px] laptop::text-xl font-bold tracking-tight text-slate-200">Want to see your
                      last 30 days of
                      data?</h1>
                    <p className="capitalize flex text-xs leading-6 font-semibold text-gray-400 ">Subscribe
                      to {artistProfile?.account.name} to
                      unlock your latest activities and get notified right away!</p>
                    <div className="relative button-wrapper w-fit h-[36px] mt-4 ">
                      <button type="button"
                              className="w-full text-white block text-[12px] xl:text-[16px] font-normal p-1.5 bg-[#111827] rounded-[10px] cursor-pointer px-4 h-full">Subscribe
                        to {artistProfile?.account.name}
                      </button>
                      <div className="button-bg "></div>
                    </div>
                  </div>
              }
              <span
                className="text-gray-600 text-[10px] font-light absolute top-[13%] z-20 left-[1.7rem] max-w-[50px] text-center opacity-0 md:opacity-100">LAST 30 DAYS [LOCKED]</span>
            </div>
            <ol className="relative space-y-2 mb-16 pl-[.5rem] md:pl-[2.5rem]" style={{counterReset: 'step-0'}}>
              {
                loading === true
                  ? <SkeletonFeedContent/>
                  : feedData?.tracks.map((item, index) => {
                    const date = new Date(`${item.date}`);
                    const dd = new Date(date).getDate();
                    const mm = new Date(date).toLocaleString('default', {month: 'short'});
                    return (
                      <li
                        className="relative pl-10 gap-16 after:absolute after:top-[6rem] after:-bottom-[2rem] after:left-[0.6875rem] after:w-px after:bg-slate-200/5 pb-8"
                        style={{counterIncrement: 'step-1'}}
                        key={index}>
                        <div className="mb-6 col-span-2 xl:mb-0 w-full xl:w-[70%] 2lg:w-[80%] relative">
                          <div
                            className="flex items-center justify-center bg-gradient-to-b from-indigo-500/70 via-indigo-500/60 rounded-md  p-[0.060rem] text-center bg-gray-900 aspect-square absolute w-[2rem] h-[2rem] top-[50%] -translate-y-1/2 -left-[2.75rem]">
                            <div
                              className="bg-gray-900 p-[8px] h-full w-full rounded-md flex items-center justify-center">
                              <img src={socials[1].logo} alt="" className="w-[15px] h-[15px]"/>
                            </div>
                          </div>
                          <span
                            className="text-gray-600 text-[10px] font-light absolute top-[23%]  -left-[2.95rem]">{mm} {dd}</span>
                          <div
                            className="ring-1 ring-inset ring-white/5 text-white shadow-2xl rounded-xl w-full">
                            <div
                              className="bg-transparent p-4 rounded-xl h-full flex flex-col gap-3">
                              <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor"
                                     className="w-6 h-6 fill-white">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                                </svg>
                                <div>
                                  <h4
                                    className="text-sm leading-6 text-slate-900 font-semibold dark:text-slate-200">{item.actionDescriptorText}</h4>
                                  <p
                                    className="text-md text-transparent capitalize bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text">{item.actionSubjectText}</p>
                                </div>
                              </div>
                              <div>
                                <a href="#" className="items-center block sm:flex ">
                                  <img className="w-12 h-12 mb-3 me-3 sm:mb-0"
                                       src={item.avatarFullpath}
                                       alt="Jese Leos image"/>
                                  <div className="text-gray-600 dark:text-gray-400">
                                    <div className="text-md font-normal text-white">{item.trackName}</div>
                                    <div className="text-xs font-normal">{item.artistName}</div>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })
              }
            </ol>
          </section>
        </main>
      </div>
    </>

  );
});

export default FeedContent;

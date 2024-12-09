import React, {forwardRef, Fragment, memo, useEffect, useMemo, useRef, useState} from "react";
import {ShowOnMobileToTablet} from "../../../../components/Sizes/ShowOnMobileToTablet/ShowOnMobileToTablet.js";
import PrimaryButton from "../../../../components/PrimaryButton.js";
import reload from "/assets/svg/reload_icon.svg";
import SearchIcon from "../../../../assets/SearchIcon.js";
import InfoIcon from "../../../../assets/InfoIcon.js";
import PlusIcon from "../../../../assets/PlusIcon.js";
import BasketIcon from "../../../../assets/BasketIcon.js";
import ShareIcon from "../../../../assets/ShareIcon.js";
import RelativeLinksIcon from "../../../../assets/RelativeLinksIcon.js";
import {useGetTracks} from "../../hooks/useGetTracks.js";
import {socials} from "../../../../data/consts/socials.js";
import {navbar} from "../../../../data/consts/navbar.js";
import {DateTime} from "luxon";
import ArrowDropdown from "../../../../assets/ArrowDropdown.js";
import {Dialog, Transition} from "@headlessui/react";
import AddTrackLink from "./components/AddTrackLink.js";
import DeleteTrackLink from "./components/DeleteTrackLink.js";
import DownloadReport from "./components/DownloadReport.js";
import {useSizes} from "../../../../hooks/useSizes.js";
import ArtistMobileHeader from "../ArtistMobileHeader.js";
import {ShowOnLaptopToDesktop} from "../../../../components/SowOnLaptopToDeckTop/index.js";
import IconMore from "../../../../assets/IconMore.js";
import ChevronRight from "../../../../assets/ChevronRight.js";
import SecondaryCloseIcon from "../../../../assets/SecondaryCloseIcon.js";
import {Link} from "wouter";
import {ShowOnTabletAndDesktop} from "../../../../components/Sizes/ShowOnTabletAndDesktop/ShowOnTabletAndDesktop.js";
import {useSubscriptions} from "../../../../hooks/useSubscriptions.js";
import {useAccount} from "../../../../components/Header/hooks/useAccount.js";
import LockIcon from "../../../../assets/LockIcon.js";
import {useTrack} from "../../../TrackPage/hooks/useTrack.js";
import {useArtist} from "../../hooks/useArtist.js";
import sample from "lodash.sample";
const toolsButtons = [
  {
    label: 'add',
    icon: <PlusIcon/>,
  },
  {
    label: 'delete',
    icon: <BasketIcon/>,
  },
  {
    label: 'report',
    icon: <ShareIcon/>,
  },
  {
    label: 'share',
    icon: <RelativeLinksIcon/>,
  },
]

const TableItemSocials = memo<{ track: any; social: any }>(({social, track}) => {
  const filtered = track.links.filter((link) => {
    return !(link.source !== social.slug || !social.tableLogo || !social.tableLogo);
  });

  return filtered.length > 1 ? (
    <div className='w-5 h-5 rounded-full flex justify-center items-center text-black group cursor-pointer relative'
         style={{
           backgroundColor: `${social.color}`
         }}>
      {filtered.length}
      <div
        className='p-2 rounded-[4px] bg-medium_grey lg:bg-popup_gray hidden absolute group-hover:block top-full left-0 min-w-[420px]'>
        <div className='flex flex-col gap-2 '>
          {
            filtered.map((link, index) => (
              <div className='flex gap-2 items-center ' key={index}>
                <img src={social.tableLogo}/>
                <a
                  className='text-caption_r_desk text-white truncate'
                  href={link.url}
                  target='_blank'
                  key={index} rel="noreferrer">
                  {link.url}
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  ) : Boolean(filtered.length) && (
    <a href={filtered[0].url} target='_blank' className='flex justify-center items-center cursor-pointer' rel="noreferrer">
      <img src={social.tableLogo} className='w-5 h-5' alt=""/>
    </a>

  )
})
const TableItemSocialsMobile = memo<{ item: any }>(({item}) => {
  return item.links.length > 1 ? (
    <div className='w-1/2 flex justify-center'>
      <div className='w-5 h-5 rounded-full flex justify-center items-center text-black group cursor-pointer relative'
           style={{
             backgroundColor: `${item.color}`
           }}>
        {item.links.length}
        <div
          className='p-2 rounded-[4px] bg-medium_grey lg:bg-popup_gray hidden absolute group-hover:block top-full left-0 min-w-[420px]'>
          <div className='flex flex-col gap-2 '>
            {
              item.links.map((link, index) => (
                <div className='flex gap-2 items-center '>
                  <img src={item.tableLogo}/>
                  <a
                    className='text-caption_r_desk text-white truncate'
                    href={link.url}
                    target='_blank'
                    key={index} rel="noreferrer">
                    {link.url}
                  </a>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  ) : Boolean(item.links.length) && (
    <div className='w-1/2  flex justify-center'>
      <a href={item.links[0].url} target='_blank' className='flex justify-center items-center cursor-pointer' rel="noreferrer">
        <img src={item.tableLogo} className='w-5 h-5' alt=""/>
      </a>
    </div>


  )
})
const Artists = memo<{ track: any }>(({track}) => {
  const artistsList = track.artistLinks.map((artist) => (artist.text));
  return (
    <div className='flex gap-0.5'>
      {
        artistsList.map((artist, index) => (
          <p key={index}
             className='text-caption_s_desk text-medium_grey whitespace-nowrap'>{index !== artistsList.length - 1 ? `${artist},` : artist}</p>
        ))
      }
    </div>
  )
})


const Catalogue = memo(() => {
  const {setSource} = useArtist();
  const {
    tracks,
    search,
    setSearch,
    setSortTracks,
    sortTracks,
    setSortDate,
    sortDate,
    setTracks,
    selectedTrack,
    setSelectedTrack,
    openPopUp,
    setOpenPopUp,
    buttonHandling,
    setButtonHandling
  } = useGetTracks();
  const {isMobile, isTablet} = useSizes();
  const {isSubscribed} = useSubscriptions();
  const {profile} = useAccount();
  const filtredSocials = socials.filter((_, index) => index !== 0);
  const [checked, setChecked] = useState(false);
  const [openTrackModal, setOpenTrackModal] = useState(false);
  const [clickedTrack, setClickedTrack] = useState<any>({});
  const socialsWithAddedIcon = useMemo(() => {
    return filtredSocials.map((social) => {
      const curr = navbar[0].content[0].options.find(item => item.slug === social.slug);
      return {
        ...(curr || {}),
        headerLogo: social.logo,
        tableLogo: curr?.logo,
        slug: social.slug,
        color: curr?.color,
      }
    }, {})
  }, [])
  const handleChecked = (index, checked) => {
    setChecked(checked)
    setTracks(prevState => prevState.map((item, _index) => (
      index === _index ? {...item, checked} : item
    )))
  }
  const handleClickOnTrack = (index, track) => {
    if (!track) {
      return
    }
    setClickedTrack(track);
    setOpenTrackModal(true);
  }
  const filteredTrackSocials = socialsWithAddedIcon.map((social) => {
    return (
      clickedTrack?.links?.filter((link) => {
        return !(link.source !== social.slug || !social.tableLogo || !social.tableLogo);
      })
    )
  });
  const source = (socialsWithAddedIcon.length >= filteredTrackSocials?.length ? socialsWithAddedIcon : filteredTrackSocials);
  const opposite = (socialsWithAddedIcon.length >= filteredTrackSocials?.length ? filteredTrackSocials : socialsWithAddedIcon)
  const res = source.map((item, index) => {
      return ({
        ...item,
        links: (opposite[index] || {})
      })
    }
  )


  return (
    <>
      <main className="h-full relative z-20 pt-4 xl:max-w-none w-full px-4 md:px-8 lg:pl-6 lg:pr-2">
        <header id="header" className="mb-4 md:flex justify-between items-center">
          {
            isMobile || isTablet
              ? <ArtistMobileHeader/>
              : <>
                <div className="flex-auto max-w-4xl">
                  <h1 className="text-t1Semi_deck">Каталог</h1>
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
        <section className='w-full flex flex-col md:flex-row gap-4 justify-between items-start md:items-center'>
          <div className='w-full flex gap-4 items-center '>
            <div
              className=' w-full md:max-w-[320px] border border-dark_grey rounded-xl flex items-center gap-2 py-3.5 px-2.5 '>
              <SearchIcon color="#7B7B7B" width={20}/>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Поиск по каталогу'
                className='placeholder:text-medium_grey'/>
            </div>
            <div className='relative group hidden md:block'>
              <InfoIcon className='fill-light_grey hover:fill-medium_grey '/>
              <div
                className='p-2 rounded-[4px] flex gap-3 bg-popup_gray text-caption_r_desk absolute whitespace-nowrap bottom-full mb-1 opacity-0 group-hover:opacity-100 transition duration-300'>
                <p className='text-medium_grey'>Не нашёл трек?</p>
                <span>Напиши нам</span>
              </div>
            </div>
          </div>
          <div className='w-full flex items-center justify-between md:justify-end'>
            <div className='relative group  md:hidden'>
              <InfoIcon className='fill-light_grey hover:fill-medium_grey '/>
              <div
                className='p-2 rounded-[4px] flex gap-3 bg-popup_gray text-caption_r_desk absolute whitespace-nowrap bottom-full mb-1 opacity-0 group-hover:opacity-100 transition duration-300'>
                <p className='text-medium_grey'>Не нашёл трек?</p>
                <span>Напиши нам</span>
              </div>
            </div>
            <ul className='flex items-center gap-8'>
              {
                toolsButtons.map((tool, index) => (
                  <li onClick={() => {
                    if (!checked) {
                      return
                    }
                    setButtonHandling(tool.label);
                    setOpenPopUp(true)
                  }}
                      key={index}
                      className={`${checked ? 'fill-white' : 'fill-medium_grey'}  ${index === 0 && checked ? 'stroke-white' : index === 0 ? 'stroke-medium_grey' : ''} cursor-pointer`}>
                    {tool.icon}
                  </li>
                ))
              }
            </ul>
          </div>
        </section>
        <section className="h-full relative py-4 ">
          <div className="py-1 w-full overflow-auto">
            <table className='table overflow-hidden rounded-t-xl w-full'>
              <thead className="h-[67px] space-x-6">
              <tr className='bg-popup_gray/50 text-left'>
                <th className='p-4 pl-[66px]'>
                  <div className='flex items-center gap-2'>
                    <p>Tracks</p>
                    <button onClick={() => setSortTracks(!sortTracks)}>
                      <ArrowDropdown className={`fill-white ${sortDate ? 'rotate-180' : ''}`}/>
                    </button>
                  </div>
                </th>
                <ShowOnTabletAndDesktop>
                  <th className='p-4'>
                    <div className='flex items-center gap-2'>
                      <p>Date</p>
                      <button onClick={() => setSortDate(!sortDate)}>
                        <ArrowDropdown className={`fill-white ${sortDate ? 'rotate-180' : ''}`}/>
                      </button>
                    </div>
                  </th>
                </ShowOnTabletAndDesktop>
                <ShowOnMobileToTablet>
                  <th className=''>
                    <div className='flex items-center justify-end mr-6'>
                      <IconMore/>
                    </div>
                  </th>
                </ShowOnMobileToTablet>
                <ShowOnLaptopToDesktop>
                  {
                    socialsWithAddedIcon.map((social, indexSocial) => (
                      <th key={indexSocial} className='p-4'>
                        <div className='w-6 h-6 p-1 bg-popup_gray rounded-full'>
                          <img src={social.headerLogo} className=''/>
                        </div>
                      </th>
                    ))
                  }
                </ShowOnLaptopToDesktop>
              </tr>
              </thead>
              <tbody>
              {
                tracks?.filter((_, i) => i < 20).map((track, index) => {
                  return (
                    <tr key={index} className='border-b border-secondary_dark_gray'>
                      <td
                        className='flex items-center gap-6 p-4 max-w-[430px]'>
                        {
                          !profile || !isSubscribed
                            ? <LockIcon className='stroke-yellow min-w-8'/>
                            : <input
                              checked={track.checked}
                              onChange={(e) => handleChecked(index, e.target.checked)}
                              onClick={() => setSelectedTrack([...selectedTrack, track])}
                              type='checkbox'
                              className='min-w-[1.125rem] h-[1.125rem] border border-solid border-secondary_dark_gray rounded-sm bg-black'/>
                        }
                        <Link
                          to={`/track/${track.idUnique}/${track.baseUrl.split('/').pop()}?source=${sample(track.links).source}`}
                          onClick={() => setSource(sample(track.links).source)}>
                          <div className='flex gap-4'>
                            <img src={track.imageUrl} alt={track.title} className='w-11 h-11 rounded-full'/>
                            <div className='block overflow-hidden w-[130px] md:w-[260px]'>
                              <p
                                className={`text-t2Regular  whitespace-nowrap ${track.trackName.length > 30 ? 'ticker-item' : ''}`}
                              > {track.trackName}</p>
                              <Artists track={track}/>
                            </div>
                          </div>
                        </Link>

                      </td>
                      <ShowOnTabletAndDesktop>
                        <td
                          className='p-4 whitespace-nowrap text-caption_r_desk text-medium_grey'>{DateTime.fromISO(track.createdAt).toFormat("dd/MM/yyyy")}</td>
                      </ShowOnTabletAndDesktop>
                      <ShowOnLaptopToDesktop>
                        {
                          socialsWithAddedIcon.map((social, indexSocial) => (
                            <td key={indexSocial} className='p-4 min-w-[60px]'>
                              <TableItemSocials track={track} social={social}/>
                            </td>
                          ))
                        }
                      </ShowOnLaptopToDesktop>
                      <ShowOnMobileToTablet>
                        <th className=''>
                          <div
                            onClick={() => handleClickOnTrack(index, track)}
                            className='flex items-center justify-end gap-2 mr-6'>
                            <ChevronRight color='white' width={20}/>
                          </div>
                        </th>
                      </ShowOnMobileToTablet>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Transition appear show={openPopUp} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-40" onClose={() => setOpenPopUp(false)}>
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
          <div className="">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-popup_gray my-36 p-10 mx-auto rounded-[20px] z-50 relative max-w-xl">
                {
                  <div>
                    {(() => {
                      switch (buttonHandling) {
                        case 'add':
                          return <AddTrackLink/>
                        case 'delete':
                          return <DeleteTrackLink/>
                        case 'report':
                          return <DownloadReport/>
                      }
                    })()}
                  </div>
                }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={openTrackModal} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50" onClose={() => setOpenTrackModal(false)}>
          <div className="">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-popup_gray w-full h-screen p-4 md:p-8 overflow-auto">
                <div className='w-full flex justify-end'>
                  <button onClick={() => setOpenTrackModal(false)}>
                    <SecondaryCloseIcon className='stroke-white'/>
                  </button>
                </div>
                <div className='flex flex-col gap-6'>
                  <div className='flex items-center gap-6'>
                    <img src={clickedTrack?.imageUrl}
                         className='w-[6.25rem] h-[6.25rem] md:w-[7.5rem] md:h-[7.5rem] rounded-full'/>
                    <div className='flex flex-col gap-2'>
                      <h1 className={"text-t1Mobile md:text-t1Regular  "}>{clickedTrack?.trackName}</h1>
                      <p className='text-t2Regular text-medium_grey'>
                        {
                          clickedTrack?.artistLinks?.map((item, i) => {
                            return (
                              <span
                                key={i}>{i !== clickedTrack.artistLinks.length - 1 ? `${item.text},` : item.text}</span>
                            )
                          })
                        }
                      </p>
                    </div>
                  </div>
                  <div className='hidden md:block'>
                    <div
                      className='flex md:px-4 md:py-5 md:bg-[#48484840] rounded-t-xl md:gap-6 justify-between '>
                      {
                        socialsWithAddedIcon.map((social, indexSocial) => (
                          <div key={indexSocial}>
                            <div className='flex justify-center '>
                              <div className='w-6 h-6 p-1 bg-[#48484840] rounded-full'>
                                <img src={social.headerLogo} className=''/>
                              </div>
                            </div>
                            {/*<div className='w-full h-[1px] bg-medium_grey'/>*/}
                          </div>
                        ))
                      }

                    </div>
                    <div
                      className='md:p-4 flex md:gap-6 justify-between border-b border-secondary_dark_gray '>
                      {
                        socialsWithAddedIcon.map((social, indexSocial) => (
                          <div key={indexSocial}>
                            <td className='flex justify-center min-h-[25px] md:min-h-[unset] min-w-6 '>
                              <TableItemSocials track={clickedTrack} social={social}/>
                            </td>
                            {/*<div className='w-full h-[1px] bg-medium_grey'/>*/}
                          </div>

                        ))
                      }
                    </div>
                    <p className='text-[10px] font-normal leading-3 text-left text-medium_grey mt-4 hidden md:block'>
                      *компания Meta Platforms Inc., владеющая Facebook и Instagram, внесена в реестр экстремистских
                      организаций, ее деятельность в России по поддержанию указанных соцсетей признана экстремистской
                      деятельностью
                    </p>
                  </div>
                  <div className='md:hidden'>
                    <div>
                      {
                        res.map((item, index) => {
                          return (
                            <div className='p-4 border-b border-secondary_dark_gray flex justify-between' key={index}>
                              <div className='w-1/2  flex justify-center'>
                                <img src={item.headerLogo} className='w-5 h-5'/>
                              </div>
                              <TableItemSocialsMobile item={item}/>
                            </div>
                          )
                        })
                      }
                    </div>

                    <p className='text-[10px] font-normal leading-3 text-left text-medium_grey mt-6 md:mt-4'>
                      *компания Meta Platforms Inc., владеющая Facebook и Instagram, внесена в реестр экстремистских
                      организаций, ее деятельность в России по поддержанию указанных соцсетей признана экстремистской
                      деятельностью
                    </p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
})
export default Catalogue
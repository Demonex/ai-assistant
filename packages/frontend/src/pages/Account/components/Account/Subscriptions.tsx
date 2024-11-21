import SecondaryButton from '../../../../components/SecondaryButton.js';
import {ChevronYellowIcon} from '../../../../assets/ChevronYellowIcon.js';
import BasketIcon from '../../../../assets/BasketIcon.js';
import {Dialog, Disclosure, Transition} from '@headlessui/react';
import {ReloadIcon} from '../../../../assets/ReloadIcon.js';
import {useSubscriptionCalculator} from '../hooks/useSubscriptionCalculator.js';
import SubscriptionsCalculator from './SubscriptionsCalculator.js';
import {useLazyFetch} from '../../../../hooks/useFetch.js';
import {BACKEND_URL} from '../../../../constants/index.js';
import React, {Fragment, memo, useCallback, useEffect, useMemo, useState} from 'react';
import {DateTime} from 'luxon';
import {ArtistProfileType} from '../../../ArtistPage/types.js';
import {useOpenModalSearch} from '../../../../hooks/useOpenModalSearch.js';
import {useSubscriptions} from '../hooks/useSubscriptions.js';
import {ShowOnLaptopToDesktop} from "../../../../components/SowOnLaptopToDeckTop/index.js";
import {ShowOnMobileOnly} from "../../../../components/Sizes/ShowOnMobileOnly/ShowOnMobileOnly.js";
import ChevronRight from "../../../../assets/ChevronRight.js";
import {ArrowBack} from "../../../../assets/ArrowBack.js";


/*const archive = {
  name: 'Архив',
  paymentType: 'Архив',
  recurring: 'monthly',
  status: 'Активен',
  period: '12 месяцев',
  sum: '1190 ₽',
  nextPayment: '22.12.2024',
  endDate: '22.12.2025',
  autoExtend: true,
  artistsList: [
    {
      name: 'Tame Impala',
      photo: photo3,
      paymentType: 'Архив',
      recurring: 'monthly',
      status: 'Архив',
      period: '12 месяцев',
      sum: '1190 ₽',
      nextPayment: '',
      endDate: '22.12.2025',
      autoExtend: false
    },
    {
      name: 'Tame Impala',
      photo: photo1,
      paymentType: 'Архив',
      recurring: 'monthly',
      status: 'Архив',
      period: '12 месяцев',
      sum: '1190 ₽',
      nextPayment: '',
      endDate: '22.12.2025',
      autoExtend: false
    }
  ]
};*/
const subscriptionTitles = [
  {
    title: 'Наименование подписки'
  },
  {
    title: 'Статус'
  },
  {
    title: 'Длительность'
  },
  {
    title: 'Сумма в месяц'
  },
  {
    title: 'Следующее списание'
  },
  {
    title: 'Дата окончания'
  },
  {
    title: 'Автопродление'
  },
  {
    title: ''
  }
];

const TableItemMobile = memo<{
  item: any
  artistsFromSubscriptions: any
  handleAddArtistClick: any
  onRemoveFromArchive: any
}>(({item, artistsFromSubscriptions, handleAddArtistClick, onRemoveFromArchive}) => {
  const {subscriptions, setSubscriptions, dataUpdateSubscription, fetchUpdateSubscriptions} = useSubscriptions();
  const [isRenew, setIsRenew] = useState(item.renew);
  const [renderItemContent, setRenderItemContent] = useState(false);
  const onUpdateSubscription = (item) => {
    setIsRenew(!isRenew);
    fetchUpdateSubscriptions({
      url: `${BACKEND_URL}/subscription/${item.id}/update`,
      data: {
        renew: !isRenew
      }
    }).catch(console.error);

  };
  const onUpdateArchive = (item) => {
    fetchUpdateSubscriptions({
      url: `${BACKEND_URL}/subscription/${item.id}/update`,
      data: {
        archived: true
      }
    }).catch(console.error);

  };
  useEffect(() => {
    if (!dataUpdateSubscription) {
      return;
    }
    setSubscriptions(prev => prev.reduce((prev, next) => {
      return [
        ...prev,
        next.id === dataUpdateSubscription.id ? dataUpdateSubscription : next
      ];
    }, []));
  }, [dataUpdateSubscription]);

  const isPackage = item.plan.limit > 1;
  const artist = artistsFromSubscriptions[item.artists[0]];

  const status = 'Активен';
  const [period, periodByMonth] = useMemo(() => {
    switch (item.plan.period) {
      case 'month': {
        return ['1 месяц', 1];
      }
      case 'half-year': {
        return ['6 месяцев', 6];
      }
      case 'year': {
        return ['12 месяцев', 12];
      }
    }
  }, [item.plan]);
  const sum = item.plan.price;
  const endDate = DateTime.fromISO(item.createdAt).plus({month: periodByMonth}).toFormat(`d/MM/yyyy`);
  const nextPayment = DateTime.fromISO(item.createdAt).plus({month: periodByMonth}).minus({day: 1}).toFormat(`d/MM/yyyy`);
  return (
    <>
      <Transition appear show={renderItemContent} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-40 overflow-y-auto" onClose={() => setRenderItemContent(false)}>
          <div className="">
            <Transition.Child
              enter=" transition linear duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-1/2 "
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="-translate-x-0"
              leaveTo="translate-x-full "
            >
              <Dialog.Panel className="w-full bg-[#0C0C0C] py-6 px-4 mt-[4.25rem]">
                <div className="flex  gap-2.5 pb-6" onClick={() => setRenderItemContent(false)}>
                  <ArrowBack className='fill-white w-5'/>
                  <p className='text-t2Regular'>Все подписки</p>
                </div>
                <div className='py-4 border-b border-secondary_dark_gray/50'>
                  <div className='flex gap-2 items-center'>
                    {
                      isPackage
                        ? <p className={` text-caption_r_desk`}>Лейбл
                          до {item.plan.limit} артистов</p>
                        : <>
                          <img src={artist?.imageUrl}
                               className={`w-11 h-11 rounded-full bg-medium_grey `}/>
                          <p className={` text-t2Regular`}>{artist?.name}</p>
                        </>
                    }
                  </div>
                  <div className='flex justify-between mt-4'>
                    {
                      item.archived
                        ? <button
                          onClick={(e) => {
                            e.preventDefault();
                            onRemoveFromArchive(item);
                          }}
                          className="w-full flex justify-start cursor-pointer">
                          <ReloadIcon className="fill-white"/>
                        </button>
                        : <>
                          <div className='flex gap-3 items-center'>
                            <input
                              onClick={() => onUpdateSubscription(item)}
                              type="checkbox"
                              className="bg-transparent border border-solid border-secondary_dark_gray rounded-sm"
                              defaultChecked={item.renew}/>
                            <p
                              className={`text-caption_r_desk text-light_grey`}>Автопродление</p>
                          </div>
                          <div className='flex gap-4 items-center'>
                            <ChevronYellowIcon
                              className={`cursor-pointer ${item.plan.limit > 1 ? 'fill-yellow' : 'fill-medium_grey'}`}/>
                            <button onClick={(e) => {
                              e.preventDefault();
                              onUpdateArchive(item);
                            }}>
                              <BasketIcon className={`cursor-pointer fill-white`}/>
                            </button>
                          </div>
                        </>
                    }
                  </div>
                </div>
                <ul className='py-4 flex flex-col gap-6 border-b border-secondary_dark_gray/50'>
                  <li className='px-2 flex flex-col gap-2 text-light_grey text-caption_r_desk'>
                    <p>Статус</p>
                    <p>{status}</p>
                  </li>
                  <li className='px-2 flex flex-col gap-2 text-light_grey text-caption_r_desk'>
                    <p>Длительность</p>
                    <p>{period}</p>
                  </li>
                  <li className='px-2 flex flex-col gap-2 text-light_grey text-caption_r_desk'>
                    <p>Сумма в месяц</p>
                    <p>{sum}</p>
                  </li>
                  <li className='px-2 flex flex-col gap-2 text-light_grey text-caption_r_desk'>
                    <p>Следующий платёж</p>
                    <p>{nextPayment}</p>
                  </li>
                  <li className='px-2 flex flex-col gap-2 text-light_grey text-caption_r_desk'>
                    <p>Дата окончания</p>
                    <p>{endDate}</p>
                  </li>
                </ul>
                {
                  isPackage && (
                    <div className="flex flex-col w-full py-4 mt-4 gap-3">
                      <h1 className='text-btnText'>Артисты</h1>
                      <ul className="flex flex-col w-full ">
                        {
                          item.artists.map((id, index) => (
                            <li key={index}
                                className={`flex items-center gap-4 py-4 px-2 border-b border-b-secondary_dark_gray bg-popup_gray/50`}>
                              <img src={artistsFromSubscriptions[id]?.imageUrl} alt={artistsFromSubscriptions[id]?.name}
                                   className="w-11 h-11 rounded-full"/>
                              <p className="text-t2Regular">{artistsFromSubscriptions[id]?.name}</p>
                            </li>
                          ))
                        }
                        <li
                          className={`flex w-full items-center gap-4 py-4 pl-4 bg-[#0C0C0C] cursor-pointer border-b border-secondary_dark_gray/50`}
                          onClick={() => handleAddArtistClick(item.id)}
                        >
                          <div
                            className="w-11 h-11 rounded-full flex items-center justify-center bg-primary_blue">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M25.6273 14H14.3136M14.3136 14H3M14.3136 14L14.3137 2.68629M14.3136 14L14.3137 25.3137"
                                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <p className="text-caption_m_desk">Добавить артиста</p>
                        </li>
                      </ul>
                    </div>
                  )
                }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <div className='py-4 flex justify-between items-center  border-b border-secondary_dark_gray/50'
           onClick={() => setRenderItemContent(true)}>
        {
          item.archived
            ? <p className={` text-t2Regular`}>Архив</p>
            : <>
              {
                (isPackage) ? (
                  <p className={` text-caption_r_desk`}>Лейбл
                    до {item.plan.limit} артистов</p>
                ) : (
                  <div className='flex gap-2 items-center'>
                    <img src={artist?.imageUrl}
                         className={`w-11 h-11 rounded-full bg-medium_grey `}/>
                    <p className={` text-t2Regular`}>{artist?.name}</p>
                  </div>
                )
              }
            </>
        }
        <ChevronRight className='w-5 h-5 fill-white'/>
      </div>
    </>
  )
})
const TableItem = memo<{
  item: any
  artistsFromSubscriptions: any
  onRemoveFromArchive: any
}>(({item, artistsFromSubscriptions, onRemoveFromArchive}) => {
  const {setSubscriptions, dataUpdateSubscription, fetchUpdateSubscriptions} = useSubscriptions();
  const [isRenew, setIsRenew] = useState(item.renew);

  const onUpdateSubscription = (item) => {
    setIsRenew(!isRenew);
    fetchUpdateSubscriptions({
      url: `${BACKEND_URL}/subscription/${item.id}/update`,
      data: {
        renew: !isRenew
      }
    }).catch(console.error);

  };
  const onUpdateArchive = (item) => {
    fetchUpdateSubscriptions({
      url: `${BACKEND_URL}/subscription/${item.id}/update`,
      data: {
        archived: true
      }
    }).catch(console.error);

  };
  useEffect(() => {
    if (!dataUpdateSubscription) {
      return;
    }
    setSubscriptions(prev => prev.reduce((prev, next) => {
      return [
        ...prev,
        next.id === dataUpdateSubscription.id ? dataUpdateSubscription : next
      ];
    }, []));
  }, [dataUpdateSubscription]);

  const isPackage = item.plan.limit > 1;
  const artist = artistsFromSubscriptions[item.artists[0]];

  const status = 'Активен';
  const [period, periodByMonth] = useMemo(() => {
    switch (item.plan.period) {
      case 'month': {
        return ['1 месяц', 1];
      }
      case 'half-year': {
        return ['6 месяцев', 6];
      }
      case 'year': {
        return ['12 месяцев', 12];
      }
    }
  }, [item.plan]);
  const sum = item.plan.price;
  const endDate = DateTime.fromISO(item.createdAt).plus({month: periodByMonth}).toFormat(`d/MM/yyyy`);
  const nextPayment = DateTime.fromISO(item.createdAt).plus({month: periodByMonth}).minus({day: 1}).toFormat(`d/MM/yyyy`);

  return (
    <>
      <td className='hidden md:block lg:hidden p-4'>
        <div className='flex gap-4 text-black justify-between'>
          {
            isPackage ? (
              <p className={`text-caption_r_desk ${item.archived ? 'text-medium_grey' : ''}`}>Лейбл
                до {item.plan.limit} артистов</p>
            ) : (
              <div className='flex gap-4 items-center'>
                <img src={artist?.imageUrl}
                     className={`w-11 h-11 rounded-full bg-medium_grey ${item.archived ? 'opacity-50' : ''}`}/>
                <p
                  className={` text-caption_r_desk ${item.archived ? 'text-medium_grey' : 'text-white'}`}>{artist?.name}</p>
              </div>
            )
          }
          <div className='flex gap-6 items-center'>
            {
              !item.archived
                ? <div className='flex gap-3 items-center'>
                  <input
                    onClick={() => onUpdateSubscription(item)}
                    type="checkbox"
                    className="bg-transparent border border-solid border-secondary_dark_gray rounded-sm"
                    defaultChecked={item.renew}/>
                  <p
                    className={`text-caption_r_desk ${item.plan.limit > 1 ? 'text-black' : 'text-white'}`}>Автопродление</p>
                </div>
                : <button
                  onClick={(e) => {
                    e.preventDefault();
                    onRemoveFromArchive(item);
                  }}
                  className="w-full flex justify-center cursor-pointer">
                  <ReloadIcon className="fill-white"/>
                </button>
            }

            {
              !item.archived && (
                <div className='flex gap-4 items-center'>
                  <ChevronYellowIcon className={`cursor-pointer ${item.plan.limit > 1 ? 'fill-black' : 'fill-yellow'}`}/>
                  <button onClick={(e) => {
                    e.preventDefault();
                    onUpdateArchive(item);
                  }}>
                    <BasketIcon className={`cursor-pointer ${item.plan.limit > 1 ? 'fill-black' : 'fill-white'}`}/>
                  </button>
                </div>
              )
            }
          </div>
        </div>
        <div className='mt-4 flex justify-between'>
          <div className='flex flex-col  gap-2'>
            <p className={` text-caption_r_desk capitalize ${item.archived ? 'text-medium_grey' : ''}`}>Статус</p>
            <p className={` text-caption_r_desk capitalize ${item.archived ? 'text-medium_grey' : ''}`}>{status}</p>
          </div>
          <div className='flex flex-col  gap-2'>
            <p className={` text-caption_r_desk capitalize ${item.archived ? 'text-medium_grey' : ''}`}>Длительность</p>
            <p className={` text-caption_r_desk capitalize ${item.archived ? 'text-medium_grey' : ''}`}>{period}</p>
          </div>
          <div className='flex flex-col  gap-2'>
            <p className={` text-caption_r_desk capitalize ${item.archived ? 'text-medium_grey' : ''}`}>Сумма в
              месяц</p>
            <p className={` text-caption_r_desk capitalize ${item.archived ? 'text-medium_grey' : ''}`}>{sum}</p>
          </div>
          <div className='flex flex-col  gap-2'>
            <p className={` text-caption_r_desk capitalize ${item.archived ? 'text-medium_grey' : ''}`}>Следующий
              платёж</p>
            <p
              className={` text-caption_r_desk capitalize ${item.archived ? 'text-medium_grey' : ''}`}>{nextPayment}</p>
          </div>
          <div className='flex flex-col  gap-2'>
            <p className={` text-caption_r_desk capitalize ${item.archived ? 'text-medium_grey' : ''}`}>Дата
              окончания</p>
            <p
              className={` text-caption_r_desk capitalize ${item.archived ? 'text-medium_grey' : ''}`}>{endDate}</p>
          </div>
        </div>
      </td>
      <ShowOnLaptopToDesktop>
        <>
          <td className="p-4 text-start flex items-center gap-2.5 min-w-[20rem] text-t2Regular">
            {
              isPackage ? (
                <p className={`p-4 text-caption_r_desk ${item.archived ? 'text-medium_grey' : ''}`}>Лейбл
                  до {item.plan.limit} артистов</p>
              ) : (
                <>
                  <img src={artist?.imageUrl}
                       className={`w-11 h-11 rounded-full bg-medium_grey ${item.archived ? 'opacity-50' : ''}`}/>
                  <p className={`p-4 text-caption_r_desk ${item.archived ? 'text-medium_grey' : ''}`}>{artist?.name}</p>
                </>
              )
            }
          </td>
          <td
            className={`p-4 text-caption_r_desk capitalize ${item.archived ? 'text-medium_grey' : ''}`}>{status}</td>
          <td
            className={`p-4 text-caption_r_desk ${item.archived ? 'text-medium_grey' : ''}`}>{period}</td>
          <td
            className={`p-4 text-caption_r_desk ${item.archived ? 'text-medium_grey' : ''}`}>{sum} ₽
          </td>
          <td
            className={`p-4 text-caption_r_desk ${item.archived ? 'text-medium_grey' : ''}`}>{nextPayment}</td>
          <td
            className={`p-4 text-caption_r_desk ${item.archived ? 'text-medium_grey' : ''}`}>{endDate}</td>
          {
            item.archived
              ? <td className="p-4"></td>
              : <td
                className={`p-4 text-caption_r_desk ${item.archived ? 'text-medium_grey' : ''}`}>
                <input
                  onClick={() => onUpdateSubscription(item)}
                  type="checkbox"
                  className="bg-transparent border border-solid border-secondary_dark_gray rounded-sm"
                  defaultChecked={item.renew}/>
              </td>
          }
          {
            !item.archived && (
              <td
                className={`p-4 flex items-center gap-4`}>
                <ChevronYellowIcon className={`cursor-pointer ${item.plan.limit > 1 ? 'fill-black' : 'fill-yellow'}`}/>
                <button onClick={(e) => {
                  e.preventDefault();
                  onUpdateArchive(item);
                }}>
                  <BasketIcon className={`cursor-pointer ${item.plan.limit > 1 ? 'fill-black' : 'fill-white'}`}/>
                </button>
              </td>
            )
          }
        </>
      </ShowOnLaptopToDesktop>
    </>
  );
});

export const Subscriptions = memo(() => {
  const {
    subscriptions,
    setSubscriptions,
    fetchUpdateSubscriptions,
    dataUpdateSubscription,
    userSubscriptions,
    artistsFromSubscriptions
  } = useSubscriptions();

  const {dataAddArtist} = useSubscriptionCalculator();

  const {
    setSubscription,
    setIsOpenSearchModal,
    setButtonText,
    setIsShowAll,
    setSubscriptionOnClick
  } = useOpenModalSearch();

  const onRemoveFromArchive = (item) => {
    fetchUpdateSubscriptions({
      url: `${BACKEND_URL}/subscription/${item.id}/update`,
      data: {
        archived: false
      }
    }).catch(console.error);

  };
  useEffect(() => {
    if (!dataUpdateSubscription) {
      return;
    }
    setSubscriptions(prev => prev.reduce((prev, next) => {
      return [
        ...prev,
        next.id === dataUpdateSubscription.id ? dataUpdateSubscription : next
      ];
    }, []));
  }, [dataUpdateSubscription]);

  useEffect(() => {
    if (!dataAddArtist) {
      return;
    }
    setSubscriptions(prev => prev.reduce((prev, next) => {
      return [
        ...prev,
        next.id === dataAddArtist.id ? dataAddArtist : next
      ];
    }, []));
  }, [dataAddArtist]);

  const handleAddArtistClick = useCallback((subscription: string = undefined) => {
    setSubscription(subscription);
    setSubscriptionOnClick(true);
    setButtonText(subscription ? 'Добавить' : 'Купить');
    setIsShowAll(false);
    setIsOpenSearchModal(true);
  }, []);

  return (
    <>
      <h1 className='text-t1Semi_ipad lg:hidden'>Подписки</h1>
      <div className="py-4">
        <div className="pt-1 pb-4 w-ful hidden md:flex justify-end">
          <SecondaryButton
            onClick={() => handleAddArtistClick()}
            title="Добавить подписку на артиста"
            className="w-fit bg-primary_blue border-none text-white"/>
        </div>
        <div className="hidden md:block ">
          <div
            className=" bg-[#272727]/50 lg:rounded-t-[20px] border-b border-b-secondary_dark_gray block overflow-y-auto">
            <table className="w-full ">
              <thead className="hidden lg:contents">
              <tr>
                {
                  subscriptionTitles.map((title, index) => (
                    <th className="py-5 px-4 text-start  text-btnText whitespace-nowrap" key={index}>
                      {title.title}
                    </th>
                  ))
                }
              </tr>
              </thead>
              <tbody className="divide-y divide-secondary_dark_gray bg-[#0C0C0C]">
              {
                subscriptions?.filter((item) => !item.archived).map((item, index) => (
                  item.plan.limit > 1
                    ? (
                      <Disclosure key={index}>
                        <Disclosure.Button as="tr" className="bg-yellow text-black cursor-pointer">
                          <TableItem item={item} artistsFromSubscriptions={artistsFromSubscriptions} onRemoveFromArchive={onRemoveFromArchive}/>
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                          as="tr"
                        >
                          <Disclosure.Panel className="m-0 p-0" as="td" colSpan={9}>
                            <ul className="flex flex-col w-full ">
                              {
                                item.artists.map((id, index) => (
                                  <li key={index}
                                      className={`flex items-center gap-4 py-4 pl-4 border-b border-b-secondary_dark_gray bg-popup_gray/50`}>
                                    <img src={artistsFromSubscriptions[id]?.imageUrl} alt={artistsFromSubscriptions[id]?.name}
                                         className="w-11 h-11 rounded-full"/>
                                    <p className="text-t2Regular">{artistsFromSubscriptions[id]?.name}</p>
                                  </li>
                                ))
                              }
                              <li
                                className={`flex items-center gap-4 py-4 pl-4 bg-[#0C0C0C] w-fit cursor-pointer`}
                                onClick={() => handleAddArtistClick(item.id)}
                              >
                                <div
                                  className="w-11 h-11 rounded-full flex items-center justify-center bg-primary_blue">
                                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                       xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M25.6273 14H14.3136M14.3136 14H3M14.3136 14L14.3137 2.68629M14.3136 14L14.3137 25.3137"
                                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                                <p className="text-caption_m_desk">Добавить артиста</p>
                              </li>
                            </ul>
                          </Disclosure.Panel>
                        </Transition>
                      </Disclosure>
                    )
                    : (
                      <tr className={``} key={index}>
                        <TableItem item={item} artistsFromSubscriptions={artistsFromSubscriptions} onRemoveFromArchive={onRemoveFromArchive}/>
                      </tr>
                    )
                ))
              }
              {
                subscriptions?.filter((item) => item.archived).length > 0 && (
                  <Disclosure>
                    <Disclosure.Button as="tr" className="bg-medium_grey text-black cursor-pointer">
                      <td className="p-4 text-start flex items-center gap-2.5 min-w-[20rem] text-t2Regular">
                        <p>Архив</p>
                      </td>
                      <ShowOnLaptopToDesktop>
                        {
                          Array.from({length: 7}).map((_, index) => (
                            <td key={index}></td>
                          ))
                        }
                      </ShowOnLaptopToDesktop>
                    </Disclosure.Button>
                    {
                      subscriptions?.filter((item) => item.archived).map((item, index) => (
                        <Disclosure.Panel className="m-0 p-0" as="tr" key={index}>
                          <TableItem item={item} artistsFromSubscriptions={artistsFromSubscriptions} onRemoveFromArchive={onRemoveFromArchive}/>
                          <td
                            className={`p-4 hidden lg:block`} colSpan={3}>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                onRemoveFromArchive(item);
                              }}
                              className="w-full flex justify-center cursor-pointer">
                              <ReloadIcon className="fill-white"/>
                            </button>
                          </td>
                        </Disclosure.Panel>
                      ))
                    }
                  </Disclosure>
                )
              }
              </tbody>
            </table>
          </div>
        </div>
        <ShowOnMobileOnly>
          <ul className='flex flex-col-reverse'>
            {
              subscriptions?.map((item, index) => {
                return (
                  <div key={index}>
                    <TableItemMobile item={item} artistsFromSubscriptions={artistsFromSubscriptions} handleAddArtistClick={handleAddArtistClick}
                                     onRemoveFromArchive={onRemoveFromArchive}/>
                  </div>
                )
              })
            }
          </ul>
        </ShowOnMobileOnly>
      </div>
      <SubscriptionsCalculator/>
    </>
  );
});

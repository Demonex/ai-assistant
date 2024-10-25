import SecondaryButton from '../../../components/SecondaryButton.js';
import {ChevronYellowIcon} from '../../../assets/ChevronYellowIcon.js';
import BasketIcon from '../../../assets/BasketIcon.js';
import photo1 from '/assets/jpg/news1.jpg';
import photo2 from '/assets/jpg/news2.jpg';
import photo3 from '/assets/jpg/news3.jpg';
import {Disclosure, Transition} from '@headlessui/react';
import {ReloadIcon} from '../../../assets/ReloadIcon.js';
import {useSubscriptionCalculator} from './hooks/useSubscriptionCalculator.js';
import SubscriptionsCalculator from './SubscriptionsCalculator.js';
import {useLazyFetch} from '../../../hooks/useFetch.js';
import {BACKEND_URL} from '../../../constants/index.js';
import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {DateTime} from 'luxon';
import {ArtistProfileType} from '../../ArtistPage/types.js';
import get from 'lodash.get';
import {useOpenModalSearch} from '../../../hooks/useOpenModalSearch.js';
import {useArtistProfile} from '../../ArtistPage/hooks/useArtistProfile.js';
import {useArtist} from '../../ArtistPage/hooks/useArtist.js';
import {useSubscriptions} from './hooks/useSubscriptions.js';

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

const TableItem = memo<{
  item: any
  artists: any
}>(({item, artists}) => {
  const {subscriptions, setSubscriptions, dataUpdateSubscription, fetchUpdateSubscriptions} = useSubscriptions();
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
  const artist = artists[item.artists[0]];
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
  );
});

export const Subscriptions = memo(() => {
  const {subscriptions, setSubscriptions, fetchUpdateSubscriptions, dataUpdateSubscription} = useSubscriptions();
  const {dataAddArtist} = useSubscriptionCalculator();
  const [{data, loading, error}, fetchSubscriptions] = useLazyFetch({
    url: `${BACKEND_URL}/profile/subscriptions`,
    cache: false
  });
  const {

    setSubscription,
    setIsOpenSearchModal,
    subscriptionOnClick,
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
  const [artists, setArtists] = useState<{
    [k: string]: any
  }>({});

  const [_, fetchArtist] = useLazyFetch<ArtistProfileType>({
    url: `${BACKEND_URL}/proxy/api/v1/managements/get_account_info`
  });


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
  useEffect(() => {
    fetchSubscriptions().catch(console.error);
  }, []);

  useEffect(() => {
    setSubscriptions(data);
  }, [data]);

  const artistsIds = useMemo(() => {
    return subscriptions?.reduce((prev, next) => {
      return [...new Set([...prev, ...(next.artists || [])])];
    }, []) || [];
  }, [subscriptions]);

  useEffect(() => {
    if (!artistsIds.length) {
      return;
    }
    artistsIds.forEach((id) => {
      fetchArtist({
        params: {
          idUnique: id
        }
      })
        .then(({data}) => {
          setArtists((prev) => ({...prev, [id]: data?.account}));
        })
        .catch(console.error);
    });
  }, [artistsIds]);

  const handleAddArtistClick = useCallback((subscription: string = undefined) => {
    setSubscription(subscription);
    setSubscriptionOnClick(true);
    setButtonText(subscription ? 'Добавить' : 'Купить');
    setIsShowAll(false);
    setIsOpenSearchModal(true);
  }, []);

  return (
    <>
      <div className="py-4">
        <div className="pt-1 pb-4 w-full flex justify-end">
          <SecondaryButton
            onClick={() => handleAddArtistClick()}
            title="Добавить подписку на артиста"
            className="w-fit bg-primary_blue border-none text-white"/>
        </div>
        <div className="flex flex-col gap-6">
          <div className=" bg-[#272727]/50 rounded-t-[20px] border-b border-b-secondary_dark_gray">
            <table className="w-full ">
              <thead className="">
              <tr>
                {
                  subscriptionTitles.map((title, index) => (
                    <th className="py-5 px-4 text-start  text-btnText" key={index}>
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
                          <TableItem item={item} artists={artists}/>
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
                                    <img src={artists[id]?.imageUrl} alt={artists[id]?.name}
                                         className="w-11 h-11 rounded-full"/>
                                    <p className="text-t2Regular">{artists[id]?.name}</p>
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
                        <TableItem item={item} artists={artists}/>
                      </tr>
                    )
                ))
              }
              {
                subscriptions?.filter((item) => item.archived).length > 0 && (
                  <Disclosure>
                    <Disclosure.Button as="tr" className="bg-medium_grey text-black cursor-pointer">
                      <td className="p-4 text-start flex items-center gap-2.5 min-w-[20rem] text-t2Regular" colSpan={8}>
                        <p>Архив</p>
                      </td>
                      {
                        Array.from({length: 7}).map((_, index) => (
                          <td key={index}></td>
                        ))
                      }
                    </Disclosure.Button>
                    {
                      subscriptions?.filter((item) => item.archived).map((item, index) => (
                        <Disclosure.Panel className="m-0 p-0" as="tr" key={index}>
                          <TableItem item={item} artists={artists}/>
                          <td
                            className={`p-4 `} colSpan={3}>
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
      </div>
      <SubscriptionsCalculator/>
    </>
  );
});

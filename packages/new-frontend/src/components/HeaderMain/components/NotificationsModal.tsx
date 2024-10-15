import React, {Fragment, memo, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import SecondaryCloseIcon from "../../../assets/SecondaryCloseIcon.js";
import {useOpenNotifications} from "../../../hooks/useOpenNotifications.js";
import {SettingsIcon} from "../../../assets/Settings.js";
import settings from '/assets/svg/settings_icon_yellow.svg'
import photo from '/assets/jpg/news2.jpg'
import deezer from "/assets/svg/deezer_logo.svg";
import sample from 'lodash.sample'

type testNotifsType =
  {
    type: string
    events?: {
      sum?: string
      date?: string
      eventIcon?: any
      eventText?: {
        title?: string
      }[]
      eventType?: string
      eventObject?: {
        name?: string
        subscribers?: string
        eventSource?: string
      }
    }[]
  }[]


const testNotifs: testNotifsType = [
  {
    type: 'Все',
    events: [
      {
        eventIcon: photo,
        eventText: [
          {
            title: 'Моя жизнь'
          }
        ],
        eventType: 'опубликовал(а) трек ',
        eventObject: {
          name: 'Алиша ',
          subscribers: '(1,3 тыс. подписчиков)',
          eventSource: 'spotify'
        }
      },
      {
        eventIcon: deezer,
        eventText: [
          {
            title: ''
          }
        ],
        eventType: 'занял 22 место в плейлисте',
        eventObject: {
          name: 'Maria -  Dua Lipa',
          subscribers: '',
          eventSource: 'Лето 2024'
        }
      },

      {
        eventIcon: settings,
        eventText: [
          {
            title: 'Будет списано'
          },
          {
            title: 'за подписку '
          }
        ],
        eventType: 'Плановое списание',
        date: '10.11.2022 в 00:00',
        sum: '2990',
        eventObject: {
          name: 'Dua Lipa',
          subscribers: '',
          eventSource: ''
        }
      },
      {
        eventIcon: deezer,
        eventText: [
          {
            title: 'Maria -  Dua Lipa'
          }
        ],
        eventType: 'занял 22 место в плейлисте',
        eventObject: {
          name: 'Трек',
          subscribers: '',
          eventSource: 'Лето 2024'
        }
      },
      {
        eventIcon: settings,
        eventText: [
          {
            title: 'Будет списано'
          },
          {
            title: 'за подписку'
          }
        ],
        eventType: 'Плановое списание',
        date: '10.11.2022 в 00:00',
        sum: '2990',
        eventObject: {
          name: 'Dua Lipa',
          subscribers: '',
          eventSource: ''
        }
      },
      {
        eventIcon: photo,
        eventText: [
          {
            title: 'Cool Official Video — Dua Lipa'
          }
        ],
        eventType: 'опубликовал(а) видео ',
        eventObject: {
          name: 'Natty1994 ',
          subscribers: '(11,5 тыс. подписчиков)',
          eventSource: ''
        }
      },
    ]
  },
  {
    type: 'Артисты',
    events: [
      {
        eventIcon: photo,
        eventText: [
          {
            title: 'Моя жизнь'
          }
        ],
        eventType: 'опубликовал(а) трек ',
        eventObject: {
          name: 'Алиша ',
          subscribers: '(1,3 тыс. подписчиков)',
          eventSource: 'spotify'
        }
      },
      {
        eventIcon: photo,
        eventText: [
          {
            title: 'Cool Official Video — Dua Lipa'
          }
        ],
        eventType: 'опубликовал(а) видео ',
        eventObject: {
          name: 'Natty1994 ',
          subscribers: '(11,5 тыс. подписчиков)',
          eventSource: ''
        }
      },
      {
        eventIcon: photo,
        eventText: [
          {
            title: 'Cool Official Video — Dua Lipa'
          }
        ],
        eventType: 'опубликовал(а) видео ',
        eventObject: {
          name: 'Natty1994 ',
          subscribers: '(11,5 тыс. подписчиков)',
          eventSource: 'youtube'
        }
      },
    ]
  },
/*  {
    type: 'Треки',
    events: [
      {
        eventIcon: deezer,
        eventText: [
          {
            title: 'Maria -  Dua Lipa'
          }
        ],
        eventType: 'занял 22 место в плейлисте',
        eventObject: {
          name: 'Трек',
          subscribers: '',
          eventSource: 'Лето 2024'
        }
      },
      {
        eventIcon: deezer,
        eventText: [
          {
            title: 'Morgenstern - Cristal'
          }
        ],
        eventType: 'занял 4 место в плейлисте',
        eventObject: {
          name: 'Трек',
          subscribers: '',
          eventSource: 'TopHits 2024'
        }
      },
      {
        eventIcon: deezer,
        eventText: [
          {
            title: 'Rammstein - Sonne'
          }
        ],
        eventType: 'попал в Хит-парад ',
        eventObject: {
          name: 'Трек',
          subscribers: '',
          eventSource: 'Рок в Москве'
        }
      }
    ],
  },*/
  {
    type: 'Служебные',
    events: [
      {
        eventIcon: settings,
        eventText: [],
        eventType: 'Мы обновили политику конфеденциальности',
        date: '22.10.2022 в 00:00',
        sum: '',
        eventObject: {
          name: '',
          subscribers: '',
          eventSource: ''
        }
      },
      {
        eventIcon: settings,
        eventText: [
          {
            title: 'Будет списано'
          },
          {
            title: 'за подписку на'
          }
        ],
        eventType: 'Плановое списание',
        date: '22.10. 2022 в 00:00',
        sum: '1990',
        eventObject: {
          name: 'Morgenstern',
          subscribers: '',
          eventSource: ''
        }
      },
      {
        eventIcon: settings,
        eventText: [
          {
            title: 'Будет списано'
          },
          {
            title: 'за подписку на'
          }
        ],
        eventType: 'Плановое списание',
        date: '10.11.2022 в 00:00',
        sum: '2990',
        eventObject: {
          name: 'Dua Lipa',
          subscribers: '',
          eventSource: ''
        }
      },

    ],
  },
]

const NotificationItemsAll = memo(({items}: any) => {
  const sampleAll = Array.from({length: 50}).map(() => sample(testNotifs[0].events))
  return (
    sampleAll.map((item, index) => (
      <div key={index} className='flex gap-2 items-center pb-4 border-b border-secondary_dark_gray'>
        <img src={item.eventIcon} alt='' className='w-5 h-5 rounded-full'/>
        <p className='text-caption_r_desk'>
          <span className=''>{item.eventObject.name}</span>
          <span className='text-medium_grey'>{item.eventObject.subscribers}&nbsp;</span>
          <span className='text-medium_grey'>{item.eventType}&nbsp;</span>
          {
            item.eventText.map((text, textIndex) => (
              <span key={textIndex}>{text.title} &nbsp;</span>
            ))
          }
          <span>{item.sum}&nbsp;</span>

          <span>{item.eventObject.eventSource}&nbsp;</span>
          <span className='text-medium_grey'>{item.date}&nbsp;</span>
        </p>
      </div>
    ))
  )
})
const NotificationsModal = memo(() => {
  const {openNotifications, setOpenNotifications} = useOpenNotifications();
  const [notificationsTypeSelected, setNotificationsTypeSelected] = useState('Все');
  return (
    <Transition appear show={openNotifications} as={Fragment}>
      <Dialog as="div" className="relative inset-0 z-40 " onClose={() => setOpenNotifications(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/85 w-full h-full flex justify-center items-center "/>
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-x-full"
          enterTo="opacity-100 -translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="-translate-x-0"
          leaveTo="translate-x-full "
        >
          <div className="fixed inset-0 w-screen overflow-y-auto ">
            <div className="w-full md:w-[unset] flex min-h-full items-center justify-center absolute right-0 top-0">
              <Dialog.Panel
                className=" bg-popup_gray w-full md:max-w-[33.7rem] ">
                  <div className='fixed top-0 bg-popup_gray w-full  md:max-w-[33.7rem] px-4 md:px-8 pt-6'>
                    <div className='w-full flex justify-end cursor-pointer' onClick={() => setOpenNotifications(false)}>
                      <SecondaryCloseIcon className='stroke-white'/>
                    </div>
                    <div className='pt-2 pb-4 '>
                      <ul className='flex items-center gap-2 justify-start overflow-y-scroll flex-wrap'>
                        {
                          testNotifs.map((type, index) => (
                            <li
                              onClick={() => setNotificationsTypeSelected(type.type)}
                              key={index}
                              className={`px-6 py-2 rounded-[30px] border border-secondary_dark_gray cursor-pointer ${notificationsTypeSelected === type.type ? 'bg-yellow text-black' : 'text-medium_grey'}`}>
                              <p className='text-caption_m_desk'>{type.type}</p>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </div>


                <ul className='py-4 flex flex-col gap-4 px-4 md:px-8'>
                  <div className='pt-4 mt-[100px]'>
                    <p className='py-2 text-caption_s_desk text-medium_grey'>Сегодня</p>
                  </div>
                  {
                    notificationsTypeSelected === 'Все' && (
                      <NotificationItemsAll/>
                    )
                  }
                </ul>
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>

      </Dialog>
    </Transition>
  )
})
export default NotificationsModal
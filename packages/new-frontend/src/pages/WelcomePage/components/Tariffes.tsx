import {Tab} from "@headlessui/react";
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {Fragment, memo} from "react";
import intersect from '/assets/svg/IntersectNew.svg'
import icon from '/assets/svg/iconDone.svg'
import graph from '/assets/svg/graph.svg'
import blotch from '/assets/svg/blotch.svg'
import sale from '/assets/svg/saleSvg.svg'
import PrimaryButton from "../../../components/PrimaryButton.js";

export  const content = [
  {
    period: '12 месяцев',
    periodMobile: '12 мес',
    options: [
      {
        title: 'Музыкант',
        price: '1 190₽',
        description: '1 профиль артиста',
        features: [
          {
            text: 'Push-уведомления'
          },
          {
            text: 'Репост обложек'
          },
          {
            text: 'Лента активности в реальном времени'
          },
          {
            text: 'Подробная аналитика треков'
          },
          {
            text: 'Автоматически импортируемый каталог'
          },

        ]
      },
      {
        title: 'Лейбл',
        price: '5 400₽',
        description: 'Все артисты лейбла ',
        features: [
          {
            text: 'Push-уведомления'
          },
          {
            text: 'Репост обложек'
          },
          {
            text: 'Лента активности в реальном времени'
          },
          {
            text: 'Подробная аналитика треков'
          },
          {
            text: 'Автоматически импортируемый каталог'
          },

        ]
      },
      /* {
           title: 'Профи',
           price: '9 880₽',
           description: 'Доступ ко всем артистам и лейблам',
           features: [
               {
                   text: 'Всесторонняя аналитика треков'
               },
               {
                   text: 'Экспортируемые отчеты в формате PDF'
               },
               {
                   text: 'Неограниченное количество членов команды'
               },
               {
                   text: 'Идеально подходит для A&R, менеджмента и PR'
               },


           ]
       },*/
      {
        title: 'Свой',
        price: '',
        description: 'Индивидуальные условия',
        features: [
          {
            text: 'Если вас интересуют другие данные, напишите нам на rifify@example.com.\n' +
              'Мы рассчитаем тарифный план индивидуально для вас.'
          },
        ]
      },
    ]
  },
  {
    period: '6 месяцев',
    periodMobile: '6 мес',
    options: [
      {
        title: 'Музыкант',
        price: '1 340₽',
        description: '1 профиль артиста',
        features: [
          {
            text: 'Push-уведомления'
          },
          {
            text: 'Репост обложек'
          },
          {
            text: 'Лента активности в реальном времени'
          },
          {
            text: 'Подробная аналитика треков'
          },
          {
            text: 'Автоматически импортируемый каталог'
          },

        ]
      },
      {
        title: 'Лейбл',
        price: '6 075₽',
        description: '1 профиль артиста',
        features: [
          {
            text: 'Push-уведомления'
          },
          {
            text: 'Репост обложек'
          },
          {
            text: 'Лента активности в реальном времени'
          },
          {
            text: 'Подробная аналитика треков'
          },
          {
            text: 'Автоматически импортируемый каталог'
          },

        ]
      },
      {
        title: 'Свой',
        price: '',
        description: 'Индивидуальные условия',
        features: [
          {
            text: 'Если вас интересуют другие данные, напишите нам на rifify@example.com.\n' +
              'Мы рассчитаем тарифный план индивидуально для вас.'
          },
        ]
      },
    ]
  },
  {
    period: '1 месяц',
    periodMobile: '1 мес',
    options: [
      {
        title: 'Музыкант',
        price: '1 490₽',
        description: '1 профиль артиста',
        features: [
          {
            text: 'Push-уведомления'
          },
          {
            text: 'Репост обложек'
          },
          {
            text: 'Лента активности в реальном времени'
          },
          {
            text: 'Подробная аналитика треков'
          },
          {
            text: 'Автоматически импортируемый каталог'
          },

        ]
      },
      {
        title: 'Лейбл',
        price: '6 750₽',
        description: '1 профиль артиста',
        features: [
          {
            text: 'Push-уведомления'
          },
          {
            text: 'Репост обложек'
          },
          {
            text: 'Лента активности в реальном времени'
          },
          {
            text: 'Подробная аналитика треков'
          },
          {
            text: 'Автоматически импортируемый каталог'
          },

        ]
      },
      {
        title: 'Свой',
        price: '',
        description: 'Индивидуальные условия',
        features: [
          {
            text: 'Если вас интересуют другие данные, напишите нам на rifify@example.com.\n' +
              'Мы рассчитаем тарифный план индивидуально для вас.'
          },
        ]
      },
    ]
  }
]


export const TariffsCards = memo(() => {
  const {elementRange, isMobile} = useSizes();
  const {elementRange: elementRangeMobile} = useSizes(320, 768);
  const cardWidth = elementRange(288, 390)
  const cardHeight = elementRange(662, 702)
  const fontSizeTabMob = elementRangeMobile(14, 18)
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <Tab.Group>
        <Tab.List
          style={{}}
        >
          <div
            className=' flex justify-center items-center p-1 rounded-[30px] border border-secondary_dark_gray gap-3.5'>
            {
              content.map((tab, index) => (
                <Tab as={Fragment} key={index}>
                  {({selected}) => (
                    <button
                      className={`px-7 md:px-16 lg:px-11 py-2 rounded-[22px] text-white ${selected ? `bg-light_blue text-white transition duration-1000 ease-out transform  ` : ''} `}
                    >
                      <p style={{
                        fontSize: `${fontSizeTabMob}px`
                      }}
                         className={`text-btnText whitespace-nowrap ${selected ? "text-white" : "text-medium_grey"}`}>{
                        isMobile
                          ? tab.periodMobile
                          : tab.period
                      }</p>
                    </button>
                  )}
                </Tab>
              ))
            }
          </div>
        </Tab.List>
        <Tab.Panels
          className='mt-11 w-full '>
          <Tab.Panel
            className="w-full flex justify-start xl:justify-center gap-5 md:gap-10 items-center overflow-x-auto overflow-y-hidden">
            {
              content[0].options.map((tariff, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: `${cardWidth}px`,
                    maxWidth: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                  }}
                  className={`px-4 md:px-6 lg:px-[2.375rem] pt-9 md:pt-[2.8rem] pb-6 rounded-[20px] bg-[#333333] relative box-border flex flex-col justify-between ${index === content.length - 1 ? 'mr-5 md:mr-10 lg:mr-[unset]' : ''}`}>
                  <img src={intersect}
                       className='absolute top-0 left-0 rounded-t-[20px] z-0'/>
                  <div className='flex flex-col '>
                    <h1
                      className='text-xl leading-[110%] font-medium md:text-h3Desctop z-30 relative text-[black] text-center'>{tariff.title}</h1>
                    <div
                      className='flex flex-col items-center justify-center gap-6 mt-[5rem]'>
                      <ol className=' flex flex-col items-center justify-center'>
                        {
                          index === content.length - 1
                            ? <div className='py-[3.125rem] px-[1rem]'>
                              <img src={graph}/>
                            </div>
                            : <>
                              <li className='flex gap-3 items-center'>
                                                                    <span
                                                                      className='text-[2rem] leading-[150%] lg:text-[2.25rem] relative z-20'>
                                                                        <img src={sale} className='absolute -z-10'/>
                                                                        -20%
                                                                    </span>
                                <p
                                  className='text-[3.5rem] leading-[110%] font-light whitespace-nowrap'>{tariff.price}</p>
                              </li>
                              <li className='text-t2Regular text-light_grey'>в
                                месяц
                              </li>
                            </>
                        }

                        <li
                          className='text-btnText text-secondary_green text-center mt-2'>{tariff.description}</li>
                      </ol>
                      <ol className='flex flex-col gap-2'>
                        {
                          tariff.features.map((feature, i) => (
                            <li key={i}
                                className='flex gap-2.5 items-start'>
                              {
                                index === content.length - 1
                                  ? null
                                  : < img src={icon} className=''/>
                              }
                              <p
                                className={`text-t2Regular text-light_grey ${index === content.length - 1 ? 'text-center' : ''}`}>{feature.text}</p>
                            </li>
                          ))
                        }
                      </ol>
                    </div>
                  </div>
                  <PrimaryButton
                    title={index === content.length - 1 ? 'Оставить заявку' : 'Купить'}
                    titleStyle={{
                      fontSize: `${fontSizeTabMob}px`
                    }}
                    titleClassName='text-btnText'
                    isIcon={false}
                    className='bg-primary_blue w-full py-4 rounded-[12px] '
                  />
                </div>

              ))
            }
          </Tab.Panel>
          <Tab.Panel
            className="w-full flex justify-start lg:justify-center gap-5 md:gap-10 items-center overflow-x-auto overflow-y-hidden">
            {
              content[1].options.map((tariff, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: `${cardWidth}px`,
                    maxWidth: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                  }}
                  className={`px-4 md:px-6 lg:px-[2.375rem] pt-9 md:pt-[2.8rem] pb-6 rounded-[20px] bg-[#333333] relative box-border flex flex-col justify-between ${index === content.length - 1 ? 'mr-5 md:mr-10 lg:mr-[unset]' : ''}`}>
                  <img src={intersect}
                       className='absolute top-0 left-0 rounded-t-[20px] z-0'/>
                  <div className='flex flex-col '>
                    <h1
                      className='text-xl leading-[110%] font-medium md:text-h3Desctop z-30 relative text-[black] text-center'>{tariff.title}</h1>
                    <div
                      className='flex flex-col items-center justify-center gap-6 mt-[5rem]'>
                      <ol className=' flex flex-col items-center justify-center'>
                        {
                          index === content.length - 1
                            ? <div className='py-[3.125rem] px-[1rem]'>
                              <img src={graph}/>
                            </div>
                            : <>
                              <li className='flex gap-3 items-center'>
                                                                    <span
                                                                      className='text-[2rem] leading-[150%] lg:text-[2.25rem] relative z-20'>
                                                                        <img src={sale} className='absolute -z-10'/>
                                                                        -10%
                                                                    </span>
                                <p
                                  className='text-[3.5rem] leading-[110%] font-light whitespace-nowrap'>{tariff.price}</p>
                              </li>
                              <li className='text-t2Regular text-light_grey'>в
                                месяц
                              </li>
                            </>
                        }

                        <li
                          className='text-btnText text-secondary_green text-center mt-2'>{tariff.description}</li>
                      </ol>
                      <ol className='flex flex-col gap-2'>
                        {
                          tariff.features.map((feature, i) => (
                            <li key={i}
                                className='flex gap-2.5 items-start'>
                              {
                                index === content.length - 1
                                  ? null
                                  : < img src={icon} className=''/>
                              }
                              <p
                                className={`text-t2Regular text-light_grey ${index === content.length - 1 ? 'text-center' : ''}`}>{feature.text}</p>
                            </li>
                          ))
                        }
                      </ol>
                    </div>
                  </div>
                  <PrimaryButton
                    title={index === content.length - 1 ? 'Оставить заявку' : 'Купить'}
                    titleStyle={{
                      fontSize: `${fontSizeTabMob}px`
                    }}
                    titleClassName='text-btnText'
                    isIcon={false}
                    className='bg-primary_blue w-full py-4 rounded-[12px] '
                  />
                </div>

              ))
            }
          </Tab.Panel>
          <Tab.Panel
            className="w-full flex justify-start lg:justify-center gap-5 md:gap-10 items-center overflow-x-auto overflow-y-hidden">
            {
              content[2].options.map((tariff, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: `${cardWidth}px`,
                    maxWidth: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                  }}
                  className={`px-4 md:px-6 lg:px-[2.375rem] pt-9 md:pt-[2.8rem] pb-6 rounded-[20px] bg-[#333333] relative box-border flex flex-col justify-between ${index === content.length - 1 ? 'mr-5 md:mr-10 lg:mr-[unset]' : ''}`}>
                  <img src={intersect}
                       className='absolute top-0 left-0 rounded-t-[20px] z-0'/>
                  <div className='flex flex-col '>
                    <h1
                      className='text-xl leading-[110%] font-medium md:text-h3Desctop z-30 relative text-[black] text-center'>{tariff.title}</h1>
                    <div
                      className='flex flex-col items-center justify-center gap-6 mt-[5rem]'>
                      <ol className=' flex flex-col items-center justify-center'>
                        {
                          index === content.length - 1
                            ? <div className='py-[3.125rem] px-[1rem]'>
                              <img src={graph}/>
                            </div>
                            : <>
                              <li className='flex gap-3 items-center'>
                                {/*<span
                                                                        className='text-[2rem] leading-[150%] lg:text-[2.25rem] relative z-20'>
                                                                        <img src={sale} className='absolute -z-10'/>
                                                                        -20%
                                                                    </span>*/}
                                <p
                                  className='text-[3.5rem] leading-[110%] font-light whitespace-nowrap'>{tariff.price}</p>
                              </li>
                              <li className='text-t2Regular text-light_grey'>в
                                месяц
                              </li>
                            </>
                        }

                        <li
                          className='text-btnText text-secondary_green text-center mt-2'>{tariff.description}</li>
                      </ol>
                      <ol className='flex flex-col gap-2'>
                        {
                          tariff.features.map((feature, i) => (
                            <li key={i}
                                className='flex gap-2.5 items-start'>
                              {
                                index === content.length - 1
                                  ? null
                                  : < img src={icon} className=''/>
                              }
                              <p
                                className={`text-t2Regular text-light_grey ${index === content.length - 1 ? 'text-center' : ''}`}>{feature.text}</p>
                            </li>
                          ))
                        }
                      </ol>
                    </div>
                  </div>
                  <PrimaryButton
                    title={index === content.length - 1 ? 'Оставить заявку' : 'Купить'}
                    titleStyle={{
                      fontSize: `${fontSizeTabMob}px`
                    }}
                    titleClassName='text-btnText'
                    isIcon={false}
                    className='bg-primary_blue w-full py-4 rounded-[12px] '
                  />
                </div>

              ))
            }
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
})
const Tariffes = () => {
  const { isMobile, isTablet} = useSizes();
  const {h1SizeMobile, paddingHorizontal, marginVertical, h1Size} = useElementRangeSize()
  return (
    <div
      id='tariffes'
      className='w-full flex flex-col justify-center items-center gap-[2.5rem] relative'
      style={{
        marginTop: `${marginVertical}px`,
        marginBottom: `${marginVertical}px`,
        paddingLeft: `${paddingHorizontal}px`,
        paddingRight: `${paddingHorizontal}px`,
      }}>
      <img src={blotch} className='absolute -right-[20%] md:right-[10%] top-1/3'/>
      <h1
        className='font-bold lg:font-black text-h2Desctop w-full lg:text-center'
        style={{
          fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
        }}>
        Тарифы
      </h1>
      <TariffsCards/>
    </div>
  )
}
export default Tariffes
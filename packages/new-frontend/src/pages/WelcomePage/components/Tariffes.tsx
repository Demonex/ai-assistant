import {Tab} from "@headlessui/react";
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {Fragment} from "react";
import intersect from '/assets/svg/IntersectNew.svg'
import icon from '/assets/svg/iconDone.svg'
import graph from '/assets/svg/graph.svg'
import PrimaryButton from "../../../components/PrimaryButton.js";


const tabs = [
    {
        title: '12 месяцев',
        titleMobile: '12 мес',
    },
    {
        title: '6 месяцев',
        titleMobile: '6 мес',
    },
    {
        title: '1 месяц',
        titleMobile: '1 мес',
    }
]
const content = [
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
    {
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
const Tariffes = () => {
    const {elementRange, isMobile, isTablet} = useSizes();
    const {elementRange: elementRangeMobile} = useSizes(320, 768);
    const {h1SizeMobile, paddingHorizontal, marginVertical, h1Size} = useElementRangeSize()
    const cardWidth = elementRange(288, 390)
    const cardHeight = elementRange(662, 702)
    const fontSizeTabMob = elementRangeMobile(14, 18)
    return (
        <div
            className='w-full flex flex-col justify-center items-center gap-[2.5rem]'
            style={{
                // paddingRight: `${paddingHorizontal}px`,
                marginTop: `${marginVertical}px`,
                marginBottom: `${marginVertical}px`,
            }}>
            <h1
                className='font-bold lg:font-black text-h2Desctop'
                style={{
                    fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
                }}>
                Тарифы
            </h1>
            <div className='w-full flex flex-col justify-center items-center'>
                <Tab.Group>
                    <Tab.List
                        style={{
                            paddingLeft: `${paddingHorizontal}px`,
                            paddingRight: `${paddingHorizontal}px`,
                        }}
                       >
                        <div  className=' flex justify-center items-center p-1 rounded-[30px] border border-medium_grey'>
                            {
                                tabs.map((tab, index) => (
                                    <Tab as={Fragment} key={index}>
                                        {({selected}) => (
                                            <button
                                                className={`px-7 md:px-11 py-2 rounded-[22px] text-white ${selected ? `bg-light_blue text-white transition duration-1000 ease-out transform  ` : ''} `}
                                            >
                                                <p style={{
                                                    fontSize: `${fontSizeTabMob}px`
                                                }}
                                                    className='text-btnText whitespace-nowrap'>{
                                                    isMobile
                                                        ? tab.titleMobile
                                                        : tab.title
                                                }</p>
                                            </button>
                                        )}
                                    </Tab>
                                ))
                            }
                        </div>
                    </Tab.List>
                    <Tab.Panels
                        style={{
                            paddingLeft: `${paddingHorizontal}px`,

                        }}
                        className='mt-11 w-full '>
                        <Tab.Panel

                            className="w-full flex justify-start gap-5 md:gap-10 items-center overflow-x-auto overflow-y-hidden">
                            {
                                content.map((item, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            minWidth: `${cardWidth}px`,
                                            maxWidth: `${cardWidth}px`,
                                            height: `${cardHeight}px`,
                                        }}
                                        className={`px-4 md:px-6 lg:px-[2.8rem] pt-9 md:pt-[2.8rem] pb-6 rounded-[20px] bg-[#333333]/75 relative box-border flex flex-col justify-between ${index === content.length - 1 ? 'mr-5 md:mr-10' : ''}`}>
                                        <img src={intersect} className='absolute top-0 left-0 rounded-t-[20px] z-0'/>
                                        <div className='flex flex-col '>
                                            <h1 className='text-xl leading-[110%] font-medium md:text-h3Desctop z-30 relative text-[black] text-center'>{item.title}</h1>
                                            <div className='flex flex-col items-center justify-center gap-6 mt-[5rem]'>
                                                <ol className=' flex flex-col items-center justify-center'>
                                                    {
                                                        index === content.length - 1
                                                            ? <div className='py-[3.125rem] px-[1rem]'>
                                                                <img src={graph}/>
                                                            </div>
                                                            : <>
                                                                <li className='text-[3.5rem] leading-[110%] font-light'>{item.price}</li>
                                                                <li className='text-t2Regular text-light_grey'>в месяц</li>
                                                            </>
                                                    }

                                                    <li
                                                        className='text-btnText text-secondary_green text-center mt-2'>{item.description}</li>
                                                </ol>
                                                <ol className='flex flex-col gap-2'>
                                                    {
                                                        item.features.map((feature, i) => (
                                                            <li key={i} className='flex gap-2.5 items-start'>
                                                                {
                                                                    index === content.length - 1
                                                                        ? null
                                                                        : < img src={icon} className=''/>
                                                                }
                                                                <p className={`text-t2Regular text-light_grey ${index === content.length - 1 ? 'text-center' : ''}`}>{feature.text}</p>
                                                            </li>
                                                        ))
                                                    }
                                                </ol>
                                            </div>
                                        </div>
                                        {
                                            index === content.length - 1
                                                ? null
                                                :  <PrimaryButton
                                                    title='Купить'
                                                    titleStyle={{
                                                        fontSize: `${fontSizeTabMob}px`
                                                    }}
                                                    titleClassName='text-btnText'
                                                    isIcon={false}
                                                    className='bg-primary_blue w-full py-4 rounded-[12px] '
                                                />
                                        }

                                    </div>
                                ))
                            }
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}
export default Tariffes
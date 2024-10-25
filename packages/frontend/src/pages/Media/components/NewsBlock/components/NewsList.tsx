import {memo} from "react";
import news1 from "/assets/jpg/news1.jpg";
import news2 from "/assets/jpg/news2.jpg";
import news3 from "/assets/jpg/news3.jpg";
import sample from 'lodash.sample'
import {useSizes} from "../../../../../hooks/useSizes.js";
import {Link} from "wouter";

export const news = [
    {
        type: 'Rifify',
        color: '#E4FF29',
        title: 'Выходит очередное обновление приложения',
        date: 'Сегодня в 16:01',
        img: news1
    },
    {
        type: 'Новости',
        color: '#FF4633',
        title: 'Мэрилин Мэнсон выпустил первый трек за четыре года ',
        date: '20 августа 2024',
        img: news2
    },
    {
        type: 'Статьи',
        color: '#1FD660',
        title: 'Нейросети для создания музыки',
        date: '18 августа 2024',
        img: news3
    },
]
const NewsList = memo(() => {
    const {isMobile, isTablet} = useSizes();
    const newsSample = Array.from({length: 30}).map(() => sample(news)).filter((_, index) => {
        if (isMobile || isTablet) {
            return index <= 11
        }
        return index <= 20
    });
    return (
        <div className='py-5'>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-6 gap-5 lg:gap-10">
                {
                    newsSample.map((item, i) => (
                        <Link to='media/media-content'>
                            <li className='bg-popup_gray hover:bg-secondary_dark_gray rounded-[16px] p-5 lg:p-8 h-[33.75rem] md:h-[31rem] lg:h-[33.75rem]' key={i}>
                                <div className='flex flex-col gap-4'>
                                    <div style={{}}
                                         className='w-full rounded-[16px] overflow-hidden'>
                                        <img src={item.img}
                                             className='bg-center bg-no-repeat bg-cover w-full h-full'/>
                                    </div>
                                    <div className='p-2 flex flex-col gap-4'>
                                        <div
                                            className='py-1 px-2 w-fit rounded-md text-[black] text-captionText font-medium'
                                            style={{backgroundColor: `${item.color}`}}>
                                            <span>{item.type}</span>
                                        </div>
                                        <h2 className='text-h3Mobile md:text-h3Desctop line-clamp-3'>{item.title}</h2>
                                        <span
                                            className='text-medium_grey text-captionText font-normal mt-1'>{item.date}</span>
                                    </div>
                                </div>
                            </li>
                        </Link>

                    ))
                }
            </ul>
            <div className='py-6 flex justify-center'>
                <button
                    className='w-full md:w-fit py-4 px-[3.375rem] border border-solid border-medium_grey rounded-xl text-center'>
                    <span className='text-btnText text-light_grey'>Показать ещё</span>
                </button>
            </div>
        </div>
    )
})
export default NewsList
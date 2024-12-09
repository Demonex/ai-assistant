import {memo} from "react";
import news1 from "/assets/jpg/news1.jpg";
import news2 from "/assets/jpg/news2.jpg";
import news3 from "/assets/jpg/news3.jpg";
import sample from 'lodash.sample'
import {useSizes} from "../../../../../hooks/useSizes.js";
import {Link} from "wouter";
import {useNews} from '../../../hooks/useNews.js';
import {DateTime} from 'luxon';

/*export const news = [
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
]*/
const NewsList = memo(() => {
    const {news: {docs = []} = {}} = useNews();
    const [post,...news] = docs;
    return (
        <div className='py-5'>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
                {
                    news.map((item, i) => (
                        <Link to={`media/${item?.id}`} key={i}>
                            <li className='bg-popup_gray hover:bg-secondary_dark_gray rounded-[16px] p-5 lg:p-8 h-[33.75rem] md:h-[31rem] lg:h-[33.75rem]' key={i}>
                                <div className='flex flex-col gap-4'>
                                    <div style={{}}
                                         className='w-full rounded-[16px] overflow-hidden'>
                                        <img src={item.preview?.url}
                                             className='bg-center bg-no-repeat bg-cover w-full h-full'/>
                                    </div>
                                    <div className='p-2 flex flex-col gap-4'>
                                        <div
                                            className='py-1 px-2 w-fit rounded-md text-[black] text-captionText font-medium'
                                            style={{backgroundColor: `${item.color||'#1FD660'}`}}>
                                            <span>{item.type||'Статьи'}</span>
                                        </div>
                                        <h2 className='text-h3Mobile md:text-h3Desctop line-clamp-3'>{item.title}</h2>
                                        <span
                                            className='text-medium_grey text-captionText font-normal mt-1'>{item.createdAt && DateTime.fromISO(post.createdAt).toFormat('d MMM yyyy')}</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    ))
                }
            </ul>
            {/*<div className='py-6 flex justify-center'>
                <button
                    className='w-full md:w-fit py-4 px-[3.375rem] border border-solid border-medium_grey rounded-xl text-center'>
                    <span className='text-btnText text-light_grey'>Показать ещё</span>
                </button>
            </div>*/}
        </div>
    )
})
export default NewsList
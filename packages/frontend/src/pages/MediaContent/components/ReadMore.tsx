import {news} from "../../Media/components/NewsBlock/components/NewsList.js";
import {Link} from "wouter";
import React, {memo} from "react";
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../hooks/useSizes.js";
import SecondaryButton from "../../../components/SecondaryButton.js";

const ReadMore = memo(() => {
    const {isMobile} = useSizes();
    const {paddingHorizontal, h1Size, h1SizeMobile} = useElementRangeSize();

    return (
        <div className='w-full bg-popup_gray pt-[3.75rem] pb-10 mt-10 md:mt-20'>
            <div className='m-auto'
                 style={{
                     paddingRight: `${paddingHorizontal}px`,
                     paddingLeft: `${paddingHorizontal}px`,
                 }}>
                <h1 style={{
                    fontSize: isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
                }}
                    className='text-h2Mobile md:text-h2Medium lg:text-h2Desctop lg:text-center '>
                    Читайте также
                </h1>
                <ul className='flex gap-1 lg:gap-10 justify-start lg:justify-center overflow-x-auto mt-2'>
                    {
                        news.map((item, i) => (
                            <Link to='media/media-content' className='w-full'>
                                <li className=' bg-popup_gray hover:bg-secondary_dark_gray rounded-[16px] p-5 lg:p-8' key={i}>
                                    <div className='flex flex-col gap-4'>
                                        <div style={{}}
                                             className='w-full rounded-[16px] overflow-hidden'>
                                            <img src={item.img}
                                                 className='bg-center bg-no-repeat bg-cover w-full h-full min-w-[14.375rem]'/>
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
                <div className='py-5 flex justify-center'>
                    <SecondaryButton title='Показать ещё'
                        className='w-full md:w-fit py-4 px-[3.375rem] border border-solid border-medium_grey rounded-xl text-center'>
                    </SecondaryButton>
                </div>
            </div>
        </div>
    )
})
export default ReadMore
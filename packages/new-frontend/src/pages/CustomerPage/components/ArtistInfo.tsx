import img from "/assets/png/imgLabels.png";
import tilda from "/assets/svg/iconTildaYellow.svg";
import React from "react";
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {useParams} from "wouter";
import {advantages, advantagesLabels} from "../const.js";


const ArtistInfo = () => {
    const {paddingHorizontal, marginVertical, h1Size, h1SizeMobile} = useElementRangeSize();
    const {isMobile, isTablet} = useSizes();
    const {elementRange: elementRangeLaptop} = useSizes(1024, 1920);
    const pSize = elementRangeLaptop(22, 32);
    const params = useParams();
    const customerName = params['customer-name'];
    return (
        <div
            style={{
                paddingLeft: `${paddingHorizontal}px`,
                paddingRight: `${paddingHorizontal}px`,
                marginTop: `${marginVertical}px`,
                marginBottom: `${marginVertical}px`,
            }}
            className='w-full flex flex-col-reverse lg:flex-row-reverse lg:items-center gap-10 md:gap-[3.125rem] lg:gap-[9.75rem]'>
            <div className='w-full'>
                <img src={img}/>
            </div>
            <div
                style={{
                    paddingRight: isMobile || isTablet ? `${paddingHorizontal}px` : '',
                }}
                className='w-full flex flex-col gap-5 md:gap-8 max-w-[760px]'>
                <h2 style={{
                    fontSize: isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
                }}
                    className='text-h2Mobile md:text-h2Medium lg:text-h2Desctop'>
                    {
                        customerName === 'labels'
                            ? <span>Все данные по&nbsp;артистам в&nbsp;одном сервисе</span>
                            : <span>Все данные об&nbsp;артистах у&nbsp;тебя под рукой</span>
                    }
                </h2>
                <div className='flex flex-col gap-4'>
                    {
                        customerName === 'labels'
                            ? advantagesLabels.map((advantage, i) => (
                                <div style={{
                                    fontSize: isMobile ? `${pSize}px` : `${pSize}px`,
                                }}
                                     className='text_inline font-medium leading-[150%]' key={i}>
                                    <img src={tilda} className='inline-block mr-3.5'/>
                                    <span className='block'>{advantage.text}</span>
                                </div>
                            ))
                            : advantages.map((advantage, i) => (
                                <div style={{
                                    fontSize: isMobile ? `${pSize}px` : `${pSize}px`,
                                }}
                                     className='text_inline font-medium leading-[150%]' key={i}>
                                    <img src={tilda} className='inline-block mr-3.5'/>
                                    <span className='block'>{advantage.text}</span>
                                </div>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}
export default ArtistInfo;
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../hooks/useSizes.js";
import LogoNew from "../../../assets/LogoNew.js";
import React, {memo} from "react";
import pattern from '/assets/svg/patternSoundcloud.svg'
import tilda from '/assets/svg/iconTilda.svg'
import img from '/assets/png/IMGSoundcloud.png'
import {advantages} from "../const.js";
import {SmallTilda} from "../../../assets/SmallTilda.js";

const HeroSoundcloud = memo(() => {
    const {paddingHorizontal, marginVertical, h1Size: h2Size, h1SizeMobile:h2SizeMobile} = useElementRangeSize();
    const {isTablet, isMobile} = useSizes();
    const {elementRange: elementRangeLaptop} = useSizes(1024, 1920);
    const {elementRange: elementRangeMobile} = useSizes(320, 768);
    const h1Size = elementRangeLaptop(56, 75);
    const pSize = elementRangeLaptop(24, 32);
    const gap = elementRangeLaptop(50, 80);
    const h1SizeMobile = elementRangeMobile(32, 56);

    return (
        <>
            <div
                style={{
                    paddingLeft: `${paddingHorizontal}px`,
                    marginTop: isMobile ?`${marginVertical + 68}px` : `${marginVertical + 103}px`,
                    marginBottom: `${marginVertical}px`,
                }}
                className='w-full flex flex-col lg:flex-row gap-10'>
                <div
                    style={{
                        paddingRight: isMobile || isTablet ?  `${paddingHorizontal}px` : '',
                    }}
                    className='flex flex-col gap-8'>
                    <h1 style={{
                        fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
                    }}
                        className='text-h1Mobile md:text-h1Desctop'>
                        Аналитика по&nbsp;трекам
                        в&nbsp;Soundcloud
                    </h1>
                    <div className='flex items-start flex-col '>
                        <div>
                            <p className=' text-t1Regular'>
                                <span className='inline-block'> <LogoNew width={90} style={{
                                    verticalAlign: 'bottom',
                                    display:'inline-block'
                                }}/> — сервис аналитики
                                данных<br/> для
                                представителей
                                музыкальной индустрии</span>
                                </p>


                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <img src={pattern}/>
                </div>
            </div>
            <div
                style={{
                    paddingLeft: `${paddingHorizontal}px`,
                    paddingRight: `${paddingHorizontal}px`,
                    marginTop: `${marginVertical}px`,
                    marginBottom: `${marginVertical}px`,
                    gap: `${gap}px`,
                }}
                className='w-full flex flex-col lg:flex-row lg:items-center '>
                <div className='w-full'>
                    <img src={img}/>
                </div>
                <div className='w-full flex flex-col gap-5 md:gap-8'>
                    <h2 style={{
                        fontSize: isMobile ? `${h2SizeMobile}px` : `${h2Size}px`,
                    }}
                        className='text-h2Mobile md:text-h2Medium lg:text-h2Desctop'>Доступ к данным</h2>
                    <div className='flex flex-col gap-4'>
                        {
                            advantages.map((advantage, i) => (
                                <div className='text_inline font-medium leading-[150%]' key={i} style={{
                                    fontSize: isMobile ? `${pSize}px` : `${pSize}px`,
                                }}>
                                    <SmallTilda className='inline-block mr-3.5' fill='#600DD6'/>
                                    <span
                                        className='block'>{advantage.text}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
})
export default HeroSoundcloud;
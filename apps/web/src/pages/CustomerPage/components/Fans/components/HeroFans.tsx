import LogoNew from "../../../../../assets/LogoNew.js";
import pattern from "/assets/png/pattern_fans.png";
import spray from "/assets/png/redSpray.png";
import React, {memo} from "react";
import {useElementRangeSize} from "../../../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../../../hooks/useSizes.js";

const HeroFans = memo(() => {
    const {paddingHorizontal, marginVertical} = useElementRangeSize();
    const {isMobile, isTablet, elementRange} = useSizes();
    const {elementRange: elementRangeLaptop} = useSizes(1024, 1920);
    const {elementRange: elementRangeMobile} = useSizes(320, 768);
    const h1Size = elementRangeLaptop(56, 75);
    const h1SizeMobile = elementRangeMobile(32, 56);
    const logoSize = elementRange(102, 245);
    const spraySize = elementRangeLaptop(310, 410);
    const spraySizeMob = elementRangeMobile(210, 310);


    return (
        <>
            <div
                style={{
                    paddingLeft: `${paddingHorizontal}px`,
                    marginTop: isMobile ?`${marginVertical + 68}px` : `${marginVertical + 103}px`,
                    marginBottom: `${marginVertical}px`,
                }}
                className=' flex flex-col lg:flex-row gap-10'>
                <div
                    style={{
                        paddingRight: isMobile || isTablet ? `${paddingHorizontal}px` : '',
                    }}
                    className='flex flex-col gap-8 w-fit '>
                    <h1 style={{
                        fontSize: isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
                    }}
                        className=' text-h1Desctop'>
                                <span className='inline-block '> <LogoNew style={{
                                    verticalAlign: 'bottom',
                                    display: 'inline-block',
                                    width: `${logoSize}px`
                                }}/> — сервис аналитики для
                                    <span className='relative block text-[black]'>
                                       фанатов
                                    <img
                                        style={{
                                            width: isMobile ? `${spraySizeMob}px` : `${spraySize}px`
                                        }}
                                        src={spray}
                                        className='absolute left-0 -top-[30%] -z-10 '/>
                                    </span>
                                </span>
                    </h1>
                    <div className='flex items-start flex-col '>
                        <p className='text-2xl leading-[150%]'>
                            Узнай всё о своих любимых артистах<br/>
                            в одном сервисе
                        </p>
                    </div>
                </div>
                <div className='w-full'>
                    <img src={pattern}/>
                </div>
            </div>

        </>
    )
})
export default HeroFans;
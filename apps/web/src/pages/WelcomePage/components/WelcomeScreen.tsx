import {useSizes} from "../../../hooks/useSizes.js";
import PrimaryButton from "../../../components/PrimaryButton.js";
import iphone from '/assets/png/iphoneWelcomeScreenNew.png'
import spray from '/assets/svg/yellowSprayVector.svg'
import RRR from '/assets/png/RRRRR@3x.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import React, {memo} from "react";
import LogoNew from "../../../assets/LogoNew.js";
import SearchIcon from "../../../assets/SearchIcon.js";
import {useOpenModalSearch} from "../../../hooks/useOpenModalSearch.js";

const WelcomeScreen = memo(() => {
    const {setIsOpenSearchModal, isOpenSearchModal} = useOpenModalSearch();
    const {elementRange, isMobile, isTablet} = useSizes();
    const {elementRange: elementRangeLaptop} = useSizes(1024, 1920);
    const {elementRange: elementRangeMobile} = useSizes(320, 768);
    const {marginVertical, paddingHorizontal} = useElementRangeSize();
    const RSize = elementRange(300, 1910);
    const spraySize = elementRange(30, 100);
    const h1Size = elementRangeLaptop(56, 75);
    const h1SizeMobile = elementRangeMobile(32, 56);

    const leftSectionMarginTop = elementRangeLaptop(0, 140);
    const gapBetweenSections = elementRangeLaptop(3.125, 10.3);

    return (
        <>
            <div
                className='w-full flex flex-col lg:flex-row items-start justify-between '
                style={{
                    marginTop: isMobile ?`${marginVertical + 68}px` : `${marginVertical + 103}px`,
                    marginBottom: `${marginVertical}px`,
                    paddingLeft: `${paddingHorizontal}px`,
                    paddingRight: `${paddingHorizontal}px`,
                    gap: `${gapBetweenSections}rem`,
                }}
            >
                <div className='leftSection w-full flex flex-col gap-8  justify-start'
                     style={{
                         marginTop: `${leftSectionMarginTop}px`
                     }}>
                    <div className=''>
                        <div className='flex gap-[3%]'>
                            <h1
                                style={{
                                    fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
                                }}
                                className='text-h1Desctop relative z-10 text-[#111111] -rotate-2'>
                                <div className="">
                                    <div
                                        className='w-full h-full bg-yellow absolute -z-10 p-1 md:p-2 -left-1 -top-1 md:-top-2 box-content rounded-[12px]'/>
                                    <img
                                        style={{
                                            width: `${spraySize}px`
                                        }}
                                        src={spray}
                                        className='absolute -z-10 -right-3 md:-right-5 -bottom-1/3 '/>
                                </div>


                                Управляй
                            </h1>
                            <h1
                                style={{
                                    fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
                                }}
                                className='text-h1Desctop'>своей</h1>
                        </div>
                        <h1
                            style={{
                                fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
                            }}
                            className='text-h1Desctop'> музыкальной {isMobile || isTablet ? null : <br/>}карьерой </h1>
                    </div>
                    <div className='flex items-start flex-col '>
                        <div>
                            <p className=' text-t1Regular'>
                                <span className='inline-block'> <LogoNew width={90} style={{
                                    verticalAlign: 'bottom',
                                    display: 'inline-block'
                                }}/> — сервис аналитики
                                данных для
                                представителей
                                музыкальной индустрии</span>
                            </p>
                        </div>
                    </div>
                    <div className='w-full flex items-center justify-start gap-5'>
                        <div
                            className='w-full border border-solid border-medium_grey flex justify-between rounded-[12px] px-6 py-4 max-w-[33.3rem]  gap-3 cursor-pointer'
                            onClick={()=>setIsOpenSearchModal(!isOpenSearchModal)}
                        >
                    <span

                        className='w-full text-medium_grey ellipsis whitespace-nowrap '>Найти артиста, лейбл или песню</span>
                            <SearchIcon width='1.375rem' color='#CCCCCD'/>
                        </div>
                    </div>
                </div>
                <div className=' w-full relative flex justify-center'>
                    <img src={iphone}/>
                </div>
                <img src={RRR} className='absolute top-0 right-0 max-h-[1910px] '
                     style={{
                         height: `${RSize}px`,
                         zIndex: '-1'
                     }}/>
            </div>
        </>
    )
})
export default WelcomeScreen

import {useSizes} from "../../../hooks/useSizes.js";
import PrimaryButton from "../../../components/PrimaryButton.js";
import spray from '/assets/png/sprayBlack.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import React, {memo} from "react";
import SearchIcon from "../../../assets/SearchIcon.js";
import {SearchBar} from "../../../components/Header/components/SearchField/index.js";
import {useOpenModalSearch} from "../../../hooks/useOpenModalSearch.js";

const VioletCTA = memo(() => {
    const {h1SizeMobile, marginVertical, paddingHorizontal} = useElementRangeSize();
    const {elementRange, isTablet, isMobile} = useSizes();
    const {elementRange: elementRangeMobile} = useSizes(320, 768);
    const {elementRange: elementRangeLaptop} = useSizes(1024, 1920);
    const parentPaddingVertical = elementRange(20, 130);
    const h1Size = elementRange(32, 75);
    const spraySize = elementRange(100, 280);
    const spraySizeMobile = elementRangeMobile(90, 150);
    const gap = elementRangeLaptop(50, 200);
    const gapMobile = elementRangeMobile(30, 50);

    const {isOpenSearchModal, setIsOpenSearchModal} = useOpenModalSearch();
    return (
        <div style={{
            width: '100%',
            marginTop: `${marginVertical}px`,
            marginBottom: `${marginVertical}px`,
            paddingLeft: `${paddingHorizontal}px`,
            paddingRight: `${paddingHorizontal}px`,
        }}>
            <div
                className='w-full animated-gradient bg-gradient-to-r from-[#6123d2] to-[#7f4ed3] px-5 md:px-[3.375rem] lg:px-[11.25rem] rounded-[20px] flex flex-col  lg:flex-row items-center justify-center py-5 md:py-[5rem] lg:py-[8.125rem]'
                style={{
                    gap: isMobile || isTablet ? `${gapMobile}px` : `${gap}px`
                }}>
                <div className='flex  gap-[15px]'>
                    <h1
                        className='capitalize text-h1Desctop'
                        style={{
                            fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`
                        }}>найди</h1>
                    <h1
                        className='text-h1Desctop  z-20 relative -rotate-2'
                        style={{
                            fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`
                        }}
                    >
                        себя
                        <img src={spray}
                             className='absolute -z-10 -top-[60%] -left-[10%] xl:-left-[8%] '
                             style={{minWidth: isTablet || isMobile ? `${spraySizeMobile}px` : `${spraySize}px`}}/>
                    </h1>
                </div>
                <div className='w-full flex items-center justify-center lg:justify-start gap-5'>
                    <div
                        className='w-full border border-solid  flex justify-between rounded-[12px] px-6 py-4 max-w-[33.3rem]  gap-5 cursor-pointer'
                        onClick={() => setIsOpenSearchModal(!isOpenSearchModal)}
                    >
                    <span
                        className='w-full text-light_grey ellipsis whitespace-nowrap text-[1.125rem] leading-[150%]'>{isMobile ? 'Артист, лейбл или песня' : 'Найти артиста, лейбл или песню'}</span>
                        <SearchIcon width='1.375rem' color='#ffffff'/>
                    </div>
                </div>
            </div>
        </div>
    )
})
export default VioletCTA;

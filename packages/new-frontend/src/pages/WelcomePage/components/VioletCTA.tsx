import {useSizes} from "../../../hooks/useSizes.js";
import PrimaryButton from "../../../components/PrimaryButton.js";
import spray from '/assets/png/sprayBlack.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {memo} from "react";

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


    return (
        <div style={{
            width: '100%',
            marginTop: `${marginVertical}px`,
            marginBottom: `${marginVertical}px`,
            paddingLeft:`${paddingHorizontal}px`,
            paddingRight:`${paddingHorizontal}px`,
        }}>
            <div
                className='w-full animated-gradient bg-gradient-to-r from-[#6123d2] to-[#7f4ed3] px-5 md:px-[3.375rem] lg:px-[6rem] rounded-[20px] flex flex-col  lg:flex-row items-center justify-center '
                style={{
                    paddingBottom: isTablet || isMobile ? '23px' : `${parentPaddingVertical}px`,
                    paddingTop: `${parentPaddingVertical}px`,
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
                <PrimaryButton
                    title='Попробовать бесплатно'
                    titleClassName='text-[black] lg:text-h3Desctop whitespace-nowrap font-medium text-[1.25rem] md:text-[1.375rem]'
                    isIcon={false}
                    className=' bg-yellow w-full lg:w-fit max-w-[750px]  px-[60px] rounded-[12px] lg:rounded-[20px] py-[1.25rem] md:py-[2rem]'

                />
            </div>
        </div>
    )
})
export default VioletCTA;

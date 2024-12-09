import bg from '/assets/png/TELEGRAM.png'
import bg_mob from '/assets/png/telega_mobNew.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import PrimaryButton from "../../../components/PrimaryButton.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {memo} from "react";

const Telegram = memo(() => {
    const {isTablet, isMobile,elementRange} = useSizes();
    const { h1Size, marginVertical, paddingHorizontal} = useElementRangeSize();
    const {elementRange: elementRangeTablet} = useSizes(1024, 1920);
    const {elementRange: elementRangeMobile} = useSizes(320, 768);
    const imageHeight = elementRangeTablet(682, 710);
    const imageHeightMobile = elementRangeMobile(534, 682);
    const h1SizeMobile = elementRangeMobile(23, 40);

    return (
        <div
            style={{
                marginTop: `${marginVertical}px`,
                marginBottom: `${marginVertical}px`,
                paddingLeft: `${paddingHorizontal}px`,
                paddingRight: `${paddingHorizontal}px`,
            }}
            className='w-full  box-border'>
            <div
                className='w-full h-full bg-cover bg-no-repeat bg-center flex flex-col lg:justify-center rounded-[20px]'
                style={{
                    backgroundImage: isMobile ?  `url(${bg_mob})` : `url(${bg})`,
                    height: isMobile?  `${imageHeightMobile}px` : `${imageHeight}px`,
                }}>
                <div
                    className='py-6 px-5 md:py-[4.375rem] lg:py-[7rem] lg:px-[3.125rem] flex h-full flex-col items-center md:items-start gap-6 md:gap-10'>
                    <h1
                        style={{
                            fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
                        }}
                        className='text-h2Mobile md:text-h2Desctop text-center md:text-left md:w-2/3 lg:w-1/2'>Новые релизы сервиса и&nbsp;интересные{isTablet ? <br/> : null} новости в&nbsp;нашем
                        телеграм-канале</h1>
                    <PrimaryButton
                        title='подписаться '
                        isIcon={false}
                        className='bg-[#E4FF29] w-full lg:w-fit rounded-[12px] md:rounded-[20px] py-5 md:py-8 px-[3.188rem] md:w-1/2'
                        titleClassName='text-[black] text-h3Mobile md:text-h3Desctop capitalize'/>
                </div>
            </div>
        </div>
    )
})
export default Telegram

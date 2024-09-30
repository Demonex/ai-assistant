import spray from '/assets/svg/black_spray.svg'
import {memo} from "react";
import {useSizes} from "../../../../../hooks/useSizes.js";
import {useElementRangeSize} from "../../../../../hooks/useElementRangeSize.js";
import PrimaryButton from '../../../../../components/PrimaryButton.js';

const VioletInterraption = memo(() => {
    const { isMobile, isTablet} = useSizes();
    const {elementRange: elementRangeLaptop} = useSizes(1024, 1920);
    const {elementRange: elementRangeMobile} = useSizes(320, 768);
    const {h1SizeMobile, marginVertical, paddingHorizontal, h1Size} = useElementRangeSize()
    const gap = elementRangeLaptop(30, 100);
    const gapVertical = elementRangeMobile(30, 60);
    const spraySize = elementRangeLaptop(210, 310);
    const spraySizeMobile = elementRangeMobile(120, 210);
    const buttonFontSize = elementRangeLaptop(20, 32);


    return (
        <div
            style={{
                marginBottom: `${marginVertical}px`,
                marginTop: `${marginVertical}px`,
                paddingLeft: `${paddingHorizontal}px`,
                paddingRight: `${paddingHorizontal}px`,
            }}
            className='w-full'>
            <div
                className='w-full animated-gradient-blue px-5 md:px-[3.375rem] lg:px-[6rem] rounded-[20px] flex flex-col lg:flex-row items-center justify-center py-5  md:py-[3.25rem] lg:py-[6.560rem]'
                style={{
                    gap: isMobile || isTablet ? `${gapVertical}px` : `${gap}px`,
                }}>
                <div className='flex gap-[1.25rem] xl:gap-[20px] flex-wrap lg:flex-nowrap justify-center'>
                    <h1
                        className=' font-bold md:font-black text-btnText md:text-h3Desctop z-10 text-center lg:text-start'
                        style={{
                            fontSize: isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
                        }}>
                        Не&nbsp;пропусти новые

                        <span className='relative '>
                      &nbsp;релизы&nbsp;
                      <img
                          src={spray}
                          className='absolute -right-[25%] -top-[50%]'
                          style={{
                              zIndex: '-1',
                              minWidth: isMobile ? `${spraySizeMobile}px` : `${spraySize}px`
                          }}
                      />
                  </span>
                        своих любимых музыкантов
                    </h1>
                </div>
                <PrimaryButton
                    title='Попробовать бесплатно'
                    to='/sign-up'
                    titleStyle={{
                        fontSize: `${buttonFontSize}px`
                    }}
                    isIcon={false}
                    titleClassName='font-medium md:font-bold text-[#000000] whitespace-nowrap font-regular text-[1.375rem] lg:text-h3Desctop'
                    className=' bg-secondary_green hover:scale-105 transition-all duration-300 w-full lg:w-fit lg:max-w-[523px] rounded-[12px] md:rounded-[20px] py-5 md:py-8 px-[3.75rem]'
                />
            </div>
        </div>
    )
})
export default VioletInterraption;

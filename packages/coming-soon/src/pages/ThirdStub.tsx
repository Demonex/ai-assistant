import logo from "../assets/svg/Logo.svg";
import telegram from "../assets/svg/telegramLogo.svg";
import crown from "../assets/svg/crown.svg";
import quotes from "../assets/svg/quotes.svg";
import markerWhite from "../assets/svg/markerWhite.svg";
import {SvgBgVector} from "../assets/svg/bgVector.js";
import img from "../assets/png/ThirdStubIMG.png";
import paper from "../assets/png/paper.png";
import {convertRange} from "../utils.js";
import {useSizes} from "../hooks/useSizes.js";
import PrimaryButton from "../components/PrimaryButton.js";
import {useWindowSize} from "@uidotdev/usehooks";


const ThirdStubPage = () => {
    const {widthRange, isMobile, isTablet} = useSizes();
    const {width} = useWindowSize();

    const logoWidth = convertRange(widthRange, [320, 1920], [76, 152]);
    const fontSize = convertRange(widthRange, [320, 1920], [24, 54]);
    const paddingHorizontal = convertRange(widthRange, [320, 1920], [10, 150]);
    const gap = convertRange(widthRange, [320, 1920], [30, 80]);
    const bgVectorWidth = convertRange(widthRange, [1024, 1920], [1600, 2900]);
    const minWidthTextContainer = convertRange(widthRange, [1024, 1920], [406, 920]);
    const paperPositionTop = convertRange(widthRange, [1024, 1920], [0, 15]);
    const paperSizeMob = convertRange(widthRange, [320, 1023], [150, 100]);
    const crownPositionTop = convertRange(widthRange, [1024, 1920], [50, 120]);
    const crownPositionTopMob = convertRange(widthRange, [320, 1023], [100, 100]);
    const crownPositionRight = convertRange(widthRange, [1024, 1920], [50, 20]);
    const crownWidth = convertRange(widthRange, [1024, 1920], [65, 95]);
    const quotesPositionRight = convertRange(widthRange, [1024, 1920], [50, -20]);
    const quotesPositionBottom = convertRange(widthRange, [1024, 1920], [15, 20]);
    const MarginTopMob = convertRange(widthRange, [320, 1023], [5.18, 9.18]);

    return (
        <>
            <div className="flex justify-center w-full h-full">
                <div className="w-full h-full mx-auto flex flex-col max-w-[1920px] ">
                    <div style={{
                        paddingRight: `${paddingHorizontal}px`,
                        paddingLeft: width > 2100 ? '0' : `${paddingHorizontal}px`,
                    }}
                         className=' pt-8 lg:pt-[52px] '>
                        <img style={{
                            width: `${logoWidth}px`
                        }}
                            src={logo}
                        />
                    </div>
                    <div style={{
                        paddingLeft: width > 2100 ? '0' : `${paddingHorizontal}px`,
                        paddingRight: `${paddingHorizontal}px`,
                        gap: `${gap}px`,
                        marginTop:isMobile || isTablet ? `${MarginTopMob}rem` : 'unset'
                    }}
                         className="w-full h-full flex flex-col lg:flex-row lg:items-center ">
                        <div
                            className='flex flex-col gap-[3.75rem] relative'
                            style={{
                                maxWidth: isMobile || isTablet ? '100%' : `${minWidthTextContainer}px`
                            }}>
                            <div>
                                <h1
                                    style={{
                                        fontSize: `${fontSize}px`
                                    }}
                                    className=' font-bold leading-[110%]'>Стань одним из
                                    <span className='relative'>&nbsp;первых&nbsp;
                                        <img
                                            style={{
                                                top: isMobile || isTablet ? `-${crownPositionTopMob}%` : `-${crownPositionTop}%`,
                                                right: isMobile || isTablet ? `0` : `-${crownPositionRight}%`,
                                                width: `${crownWidth}px`,
                                            }}
                                            className='absolute -right-[20%] '
                                            src={crown}/>
                                        <br/>
                                    </span>
                                    пользователей сервиса аналитики</h1>
                                <h1 style={{
                                    fontSize: `${fontSize}px`
                                }}
                                    className='font-bold leading-[110%] text-[white]/40'>для музыкантов,
                                    менеджеров {isTablet || isMobile ? <br/> : null}
                                    и музыкальных лейблов</h1>
                            </div>
                            {
                                isTablet || isMobile
                                    ? null
                                    : <PrimaryButton
                                        className='py-5 px-8 md:max-w-[22.18rem] rounded-[8px] lg:rounded-2xl hover:scale-110 transition duration-300'
                                        icon={telegram}
                                        title='Присоединиться'/>
                            }

                            <img style={{
                                right: `-${quotesPositionRight}%`,
                                bottom: `-${quotesPositionBottom}%`,
                            }}
                                 src={quotes}
                                 className='absolute -bottom-[10%] '/>
                        </div>

                        <div className='w-full h-full flex items-center justify-center'>
                            <img src={img} loading='lazy'/>
                        </div>
                        {
                            isTablet || isMobile
                                ? <PrimaryButton
                                    className='py-4 px-8  rounded-[8px] lg:rounded-2xl hover:scale-110 transition duration-300 mb-8'
                                    icon={telegram}
                                    title='Присоединиться'/>
                                : null
                        }
                    </div>
                </div>
                <SvgBgVector
                    style={{
                        width: `${bgVectorWidth}px`
                    }}
                    className='absolute -z-10 top-[30%] lg:-top-[10%]'
                    color='#191919'/>
                <img style={{
                    top: `-${paperPositionTop}%`,
                    minWidth: isMobile || isTablet ? `${paperSizeMob}%` : ''
                }}
                     src={paper}
                     className='absolute  -left-[10%]'/>
                {/*<img src={markerWhite} className='absolute -bottom-0 left-[30%]'/>*/}
            </div>
        </>
    )
}
export default ThirdStubPage

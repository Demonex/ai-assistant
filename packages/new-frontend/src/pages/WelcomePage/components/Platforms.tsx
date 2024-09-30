import {useSizes} from "../../../hooks/useSizes.js";
import {randomInt} from "../../../utils.js";
import apple from '/assets/png/applemusicNew.png'
import shazam from '/assets/png/shazamNew.png'
import spotify from '/assets/png/SpotifyNew.png'
import soundcloud from '/assets/png/soundcloudNew.png'
import youtube from '/assets/png/youtubeNew.png'
import React, {memo, useMemo} from "react";
import {Helmet} from "react-helmet";
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {Link, useParams} from "wouter";

type platformIconsType = {
    title: string
    img: string
    top: number
    left: number
    topMedium?: number
    leftMedium?: number
    maxWidth: number
    minWidth: number
    topMobile?: number
    leftMobile?: number
    maxWidthMobile?: number
    minWidthMobile?: number
    link?: string
}[]
const platformIcons: platformIconsType = [
    {
        title: 'youtube',
        img: youtube,
        top: 18,
        left: 18,
        topMedium: 18,
        leftMedium: 10,
        topMobile: 15,
        leftMobile: 12,
        maxWidth: 160,
        minWidth: 80,
        link: '/platform/youtube'

    },
    {
        title: 'apple',
        img: apple,
        top: 65,
        left: 36,
        topMedium: 52,
        leftMedium: 27,
        topMobile: 80,
        leftMobile: 30,
        maxWidth: 603,
        minWidth: 200,
        link: '/platform/applemusic'

    },
    {
        title: 'shazam',
        img: shazam,
        top: 30,
        left: 62,
        topMedium: 23,
        leftMedium: 50,
        topMobile: 43,
        leftMobile: 54,
        maxWidth: 240,
        minWidth: 100,
        link: '/platform/shazam'

    },
    {
        title: 'soundcloud',
        img: soundcloud,
        top: 2,
        left: 90,
        topMedium: 18,
        leftMedium: 90,
        topMobile: 12,
        leftMobile: 90,
        maxWidth: 224,
        minWidth: 70,
        link: '/platform/soundcloud'

    },
    {
        title: 'spotify',
        img: spotify,
        top: 60,
        left: 82,
        maxWidth: 180,
        minWidth: 60,
        topMedium: 55,
        leftMedium: 75,
        topMobile: 67,
        leftMobile: 80,
        link: '/platform/spotify'
    },
]

const Platforms = memo(() => {
    const {h1Size, marginVertical, paddingHorizontal} = useElementRangeSize();
    const {elementRange} = useSizes();
    const {elementRange: elementRangeMobile} = useSizes(320, 768);
    const {elementRange: elementRangeLaptop} = useSizes(1024, 1920);
    const h1SizeMobile = elementRangeMobile(23, 40);
    const platformsContainerHeight = elementRange(430, 800);
    const morePlatformsSize = elementRange(80, 200);
    const morePlatformsTop = elementRange(100, 90);
    const morePlatformsLeft = elementRange(60, 110);
    const morePlatformsGap = elementRange(24, 40);
    const morePlatformsMarginTop = elementRangeMobile(32, 0);
    const {isTablet, isMobile} = useSizes();
    const params = useParams();
    const customerName = params['customer-name'];

    const styles = useMemo(() => {
        return Array.from({length: platformIcons.length}).map((_, i) => {
            const percent25 = [
                randomInt(10),
                randomInt(5)
            ];
            const percent50 = [
                randomInt(20),
                randomInt(20)
            ];
            const percent75 = [
                randomInt(10),
                randomInt(5)
            ];
            return `
                .float-numbers:nth-child(${i}) {
                  -webkit-animation-name: animate${i};
                  -webkit-animation-duration: ${i * 3}s;
                  animation-name: animate${i};
                  animation-duration: ${i * 3}s;
                  animation-iteration-count: infinite;
                }
                @-webkit-keyframes animate${i} {
                  25% {
                    transform: translate(calc(-50% - ${percent25[0]}px), calc(-50% - ${percent25[1]}px));
                  }
                  50% {
                    transform: translate(calc(-50% - ${percent50[0]}px), calc(-50% - ${percent50[1]}px));
                  }
                  75% {
                    transform: translate(calc(-50% - ${percent75[0]}px), calc(-50% - ${percent75[1]}px));
                  }
                }
                @keyframes animate${i} {
                  25% {
                    transform: translate(calc(-50% - ${percent25[0]}px), calc(-50% - ${percent25[1]}px));
                  }
                  50% {
                    transform: translate(calc(-50% - ${percent50[0]}px), calc(-50% - ${percent50[1]}px));
                  }
                  75% {
                    transform: translate(calc(-50% - ${percent75[0]}px), calc(-50% - ${percent75[1]}px));
                  }
                  }
                `;
        }).join('\n');
    }, [platformIcons.length]);
    return (
        <div className='w-full relative'
             style={{
                 marginTop: `${marginVertical}px`,
                 marginBottom: `${marginVertical}px`,
                 paddingLeft: `${paddingHorizontal}px`,
                 paddingRight: `${paddingHorizontal}px`,
             }}>
            <Helmet>
                <style type="text/css">{styles}</style>
            </Helmet>
            {
                customerName === 'distributors'
                    ? <h1 className='text-h2Desctop font-bold lg:font-black'
                          style={{
                              fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
                          }}>Анализируй музыкальные релизы в&nbsp;одном<br/> сервисе и&nbsp;принимай обоснованные<br/> решения для
                        развития</h1>
                    : <h1 className='text-h2Desctop font-bold lg:font-black'
                          style={{
                              fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,
                          }}>Аналитика твоей музыки <br/> с 14+ платформ в одном месте</h1>
            }
            <div className='w-full relative' style={{height: `${platformsContainerHeight}px`}}>
                {
                    platformIcons.map((platform, index) => {
                            const iconSize = elementRange(platform.minWidth, platform.maxWidth);
                            const iconTop = elementRangeLaptop(platform.topMedium, platform.top);
                            const iconLeft = elementRange(platform.leftMedium, platform.left);
                            return (
                                <Link to={platform.link} key={index} className='absolute float-numbers -translate-x-1/2 -translate-y-1/2 '
                                      style={{
                                          // maxWidth: `${platform.maxWidth}px`,
                                          top: isMobile ? `${platform.topMobile}%` : `${iconTop}%`,
                                          left: isMobile ? `${platform.leftMobile}%` : `${iconLeft}%`,
                                          width: `${iconSize}px`
                                      }}>
                                        <img
                                            src={platform.img}
                                            key={index}
                                            className={`hover:scale-110 cursor-pointer transition duration-300 `}/>
                                </Link>
                            )
                        }
                    )
                }
                <div className=' items-center gap-11 absolute -translate-x-1/2 -translate-y-1/2 hidden lg:flex w-full'
                     style={{
                         top: `${morePlatformsTop}%`,
                         left: `${morePlatformsLeft}%`
                     }}>
                    <div
                        style={{
                            width: `${morePlatformsSize}px`,
                            height: `${morePlatformsSize}px`,

                        }}
                        className='border border-medium_grey rounded-[40px] 2xl:rounded-[60px] flex justify-center items-center'>
                        <span className='text-h2Desctop'
                              style={{fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,}}>+9</span>
                    </div>
                    <p className='text-t1Regular'>И еще 9 музыкальных<br/> платформ в приложении Rifify</p>
                </div>
            </div>
            <div
                style={{
                    gap: `${morePlatformsGap}px`,
                    marginTop: `${morePlatformsMarginTop}px`,
                }}
                className=' items-center flex lg:hidden'
            >
                <div
                    style={{
                        minWidth: `${morePlatformsSize}px`,
                        minHeight: `${morePlatformsSize}px`,

                    }}
                    className='border border-medium_grey rounded-[20px] md:rounded-[40px] flex justify-center items-center'>
                        <span className='text-h2Desctop'
                              style={{fontSize: isMobile || isTablet ? `${h1SizeMobile}px` : `${h1Size}px`,}}>+9</span>
                </div>
                <p className='text-[1.2rem] md:text-t1Regular'>И еще 9 музыкальных<br/> платформ в приложении Rifify</p>
            </div>
        </div>
    )
})
export default Platforms

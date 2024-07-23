import {useSizes} from "../../../hooks/useSizes.js";
import {randomInt} from "../../../utils.js";
import apple from '../../../assets/png/Apple Music@3x.png'
import shazam from '../../../assets/png/Shazam@3x.png'
import spotify from '../../../assets/png/Spotify@3x.png'
import soundcloud from '../../../assets/png/Soundcloud@3x.png'
import youtube from '../../../assets/png/Youtube@3x.png'
import React, {memo, useMemo} from "react";
import {Helmet} from "react-helmet";
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";

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
  maxWidthMobile?:number
  minWidthMobile?:number
}[]
const platformIcons: platformIconsType = [
  {
    title: 'youtube',
    img: youtube,
    top: 20,
    left: 15,
    maxWidth: 248,
    minWidth: 150,
    maxWidthMobile: 150,
    minWidthMobile: 75
  },
  {
    title: 'apple',
    img: apple,
    top: 65,
    left: 24,
    leftMedium: 32,
    maxWidth: 793,
    minWidth: 254,
    maxWidthMobile: 450,
    minWidthMobile: 261
  },
  {
    title: 'shazam',
    img: shazam,
    top: 45,
    left: 58,
    leftMedium: 77,
    topMedium: 37 ,
    maxWidth: 344,
    minWidth: 114,
    maxWidthMobile: 208,
    minWidthMobile: 104
  },
  {
    title: 'soundcloud',
    img: soundcloud,
    top: 25,
    left: 80,
    topMedium: 120 ,
    leftMedium: 15,
    maxWidth: 270,
    minWidth: 90,
    maxWidthMobile: 164,
    minWidthMobile: 82
  },
  {
    title: 'spotify',
    img: spotify,
    top: 90,
    left: 84,
    maxWidth: 336,
    minWidth: 112,
    topMedium: 100,
    leftMedium: 87,
    maxWidthMobile: 204,
    minWidthMobile: 102
  },
]

const Platforms = memo(() => {
  const {h1SizeMobile, h1Size} = useElementRangeSize();
  const {elementRange} = useSizes();
  const {elementRange: elementRangeMobile} = useSizes(320, 768);
  const platformsContainerHeight = elementRange(500, 1200);
  const {isTablet, isMobile} = useSizes();
  // const parentMarginTop = convertRange(widthRange, [768, 2560], [30, 105]);
  const styles = useMemo(() => {
    return Array.from({length: platformIcons.length}).map((_, i) => {
      const percent25 = [
        randomInt(5),
        randomInt(5)
      ];
      const percent50 = [
        randomInt(10),
        randomInt(10)
      ];
      const percent75 = [
        randomInt(5),
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
           // marginTop: `${parentMarginTop}px`,
           // height: `${height}px`
         }}>
      <Helmet>
        <style type="text/css">{styles}</style>
      </Helmet>
      <h1 className='font-black'
          style={{
            fontSize: isMobile || isTablet ? `${h1Size}px` :`${h1SizeMobile}px`,
            lineHeight: '120%'

          }}>Аналитика с 20+ платформ {isTablet || isMobile ? null : <br/>} твоей музыки в одном<br/> месте</h1>
      <div className='w-full relative' style={{height: `${platformsContainerHeight}px`}}>
        {
          platformIcons.map((platform, index) => {
              const iconSize = elementRange(platform.minWidth, platform.maxWidth);
              const iconSizeMobile = elementRangeMobile(platform.minWidthMobile, platform.maxWidthMobile);
              return (
                <img
                  src={platform.img}
                  key={index}
                  style={{
                    // maxWidth: `${platform.maxWidth}px`,
                    top: isTablet || isMobile ? `${platform.topMedium}%` : `${platform.top}%`,
                    left: isTablet || isMobile ? `${platform.leftMedium}%` : `${platform.left}%`,
                    width:  isTablet || isMobile ?`${iconSizeMobile}px` : `${iconSize}px`
                  }}
                  className={`absolute float-numbers -translate-x-1/2 -translate-y-1/2`}/>
              )
            }
          )
        }
      </div>
    </div>
  )
})
export default Platforms

import {memo, useRef, useState} from 'react';
import {Helmet} from 'react-helmet';
import logo from '../assets/svg/Logo.svg';
import telegramLogo from '../assets/svg/telegramLogo.svg';
import PrimaryButton from '../components/PrimaryButton.js';
import {SvgBgVector} from '../assets/svg/bgVector.js';
import {useSizes} from '../hooks/useSizes.js';


type SecondStubProps = {
  mainColor?: 'yellow' | 'blue'
  description?: boolean
}

type Numbers = {
  number: string
  size: number
  desktopSize: number
  top: number
  left: number
  desktopTop?: number
  desktopLeft?: number
  opacity?: number
  opacityDesktop?: number
  medianSize: number

}[][]
const numbers: Numbers = [
  [
    {
      number: '1 735 540',
      size: 28,
      desktopSize: 70,
      top: -10,
      left: 40,
      medianSize: 42,

    },
    {
      number: '62 583',
      size: 20,
      desktopSize: 60,
      top: 20,
      left: 5,

      medianSize: 34,

    },
    {
      number: '854 713',
      size: 24,
      desktopSize: 70,
      top: 16,
      left: 70,

      medianSize: 42,

    },
    {
      number: '18 526',
      size: 14,
      desktopSize: 40,

      top: 44,
      left: 40,
      medianSize: 28,

    },
    {
      number: '527 418',
      size: 20,
      desktopSize: 60,

      top: 60,
      left: 7,
      medianSize: 34,

    },
    {
      number: '35 631',
      size: 20,
      desktopSize: 60,
      top: 70,
      left: 70,
      medianSize: 34,

    },
    {
      number: '285 934',
      size: 18,
      desktopSize: 60,
      top: 95,
      left: 35,
      medianSize: 34,
      desktopLeft: 25
    },
  ],
  [
    {
      number: '50 416',
      size: 14,
      desktopSize: 40,
      top: -2,
      left: 2,
      medianSize: 28,

    },
    {
      number: '408 204',
      size: 28,
      desktopSize: 60,
      top: 7,
      left: 35,
      medianSize: 40,

    },
    {
      number: '105 872',
      size: 14,
      desktopSize: 32,
      top: 0,
      left: 80,
      medianSize: 28,

    },
    {
      number: '54 719',
      size: 28,
      desktopSize: 40,
      desktopLeft: 30,
      desktopTop: 30,
      top: 41,
      left: 12,
      medianSize: 50,

    },
    {
      number: '21 533',
      size: 14,
      desktopSize: 50,
      top: 44,
      left: 80,
      medianSize: 28,
      desktopLeft: 70,
    },
    {
      number: '216 634',
      size: 20,
      desktopSize: 50,
      top: 70,
      left: 54,
      medianSize: 28,

    },
    {
      number: '365 417',
      size: 18,
      desktopSize: 50,
      top: 90,
      left: 6,
      medianSize: 28,

    },
    {
      number: '12 874',
      size: 14,
      desktopSize: 64,
      top: 92,
      left: 80,
      medianSize: 42,
      desktopLeft: 67
    },
    {
      number: '12 874',
      size: 14,
      desktopSize: 40,
      top: 512,
      left: 75,
      medianSize: 14,
      opacity: 0,
      opacityDesktop: 1
    }
  ]


];

function randomInt(max: number) {
  return Math.floor(Math.random() * (max - 1 + 1) + 1);
}


type RefsElements = {
  [k: string]: HTMLParagraphElement | HTMLButtonElement
}

export const Test = memo<SecondStubProps>(({mainColor = 'blue', description}) => {
  const {isMobile, isDesktop} = useSizes();
  const refMiddle = useRef(null)
  const [refsElements, setRefsElements] = useState<RefsElements>({});
  const centralNumber = '41 247 853'
  const refsElementsContainer = useRef<HTMLDivElement>(null);

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Helmet>
        <style type="text/css">
          {
            Array.from({length: numbers[0].length + numbers[1].length}).map((_, i) => {
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
                    transform: translate(calc(-3% - ${percent25[0]}px), calc(-3% - ${percent25[1]}px));
                  }
                  50% {
                    transform: translate(calc(-3% - ${percent50[0]}px), calc(-3% - ${percent50[1]}px));
                  }
                  75% {
                    transform: translate(calc(-3% - ${percent75[0]}px), calc(-3% - ${percent75[1]}px));
                  }
                }
                @keyframes animate${i} {
                  25% {
                    transform: translate(calc(-3% - ${percent25[0]}px), calc(-3% - ${percent25[1]}px));
                  }
                  50% {
                    transform: translate(calc(-3% - ${percent50[0]}px), calc(-3% - ${percent50[1]}px));
                  }
                  75% {
                    transform: translate(calc(-3% - ${percent75[0]}px), calc(-3% - ${percent75[1]}px));
                  }
                  }
                `;
            }).join('\n')
          }
        </style>
      </Helmet>
      <div
        className="py-8 px-2 mb-[30px] md:py-[30px] 2xl:px-[120px] 2xl:py-[50px] flex flex-col  justify-between items-center w-full h-full flex-grow max-w-[1900px]">
        <div className="w-full flex justify-start grow-0 ">
          <img src={logo} alt="logo" className="w-[76px] md:w-[152px]"/>
        </div>

        <div className="w-full h-full  py-7 px-6  relative  mx-auto flex items-end flex-col 2lg:flex-row"
             ref={refsElementsContainer}>
          <div className='w-full h-1/3 relative lg:h-full'>
            {
              numbers[0].map((num, i) => {
                const lastNumber = num.number.split('').pop();

                return (
                  <p style={{
                    fontSize: `${isMobile
                      ? num.size
                      : !isDesktop ? num.medianSize : num.desktopSize}px`,
                    top: `${!isMobile && num.desktopTop ? num.desktopTop : num.top}%`,
                    left: `${!isMobile && num.desktopLeft ? num.desktopLeft : num.left}%`,
                  }}
                     className={`absolute numbers-blue font-bold text-nowrap float-numbers`}
                     data-end={lastNumber}
                     key={i}
                  >{num.number.slice(0, num.number.length - 1)}</p>
                )
              })
            }
          </div>
          <div
            className='w-full h-1/3 flex flex-col lg:h-full justify-center items-center gap-2.5 2lg:absolute 2lg:w-fit 2lg:h-fit 2lg:top-1/2 2lg:-translate-y-1/2 2lg:left-1/2 2lg:-translate-x-1/2'
            ref={refMiddle}>
            <p
              data-end={centralNumber.split('').pop()}
              className={`text-[42px] lg:text-[54px] 2lg:text-[70px] font-bold ${mainColor === 'yellow' ? 'numbers-yellow' : 'numbers-blue'}`}>{centralNumber}</p>
            {
              description ? (
                <span
                  className='text-center uppercase text-gray text-[14px] lg:text-[18px] 2lg:text-[32px] font-bold xl:text-nowrap'>прослушиваний beyonce в день релиза</span>
              ) : null
            }
          </div>
          <div className='w-full h-1/3 relative lg:h-full'>
            {
              numbers[1].map((num, i) => {
                const lastNumber = num.number.split('').pop();
                return (
                  <p style={{
                    fontSize: `${isMobile
                      ? num.size
                      : !isDesktop ? num.medianSize : num.desktopSize}px`,
                    top: `${!isMobile && num.desktopTop ? num.desktopTop : num.top}%`,
                    left: `${!isMobile && num.desktopLeft ? num.desktopLeft : num.left}%`,
                  }}
                     className={`absolute numbers-blue text-nowrap float-numbers font-bold`} data-end={lastNumber}
                     key={i}
                  >{num.number.slice(0, num.number.length - 1)}</p>
                )
              })
            }
          </div>
        </div>
        <div className="w-full flex justify-center">
          <PrimaryButton
            ref={(ref) => {
              const cacheKey = 'button-mobile';
              if (!ref || refsElements[cacheKey]) {
                return;
              }
              setRefsElements(refs => ({
                ...refs,
                [cacheKey]: ref
              }));
            }}
            title="Найди себя" icon={telegramLogo}
            className="rounded-2 md:rounded-4 py-4 3xl:py-5 rounded-[8px] md:rounded-[16px] -mb-[28px] md:max-w-[312px] hover:scale-105 transition-all duration-300"/>
        </div>
      </div>
      <SvgBgVector
        className={`absolute -left-[50%] -translate-y-1/2 -z-10 h-[40%] xs:h-[60%] xs:-left-[62%] sm:h-[90%]  md:h-[100%] md:-left-[45%]  xs2:h-[100%] lg:h-[120%] top-[50%] xl:-left-[40%] 2xl:h-[137%] 2xl:-left-[12%]`}
        // height='auto'
        color="#191919"
      />
    </div>
  );
});

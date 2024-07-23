import React, {memo, useMemo, useRef, useState} from 'react';
import {Helmet} from 'react-helmet';
import logo from '../assets/svg/Logo.svg';
import telegramLogo from '../assets/svg/telegramLogo.svg';
import PrimaryButton from '../components/PrimaryButton.js';
import {SvgBgVector} from '../assets/svg/bgVector.js';
import {useSizes} from '../hooks/useSizes.js';
import {convertRange, randomInt} from '../utils.js';
import memoize from 'memoize';

type SecondStubProps = {
  mainColor?: 'yellow' | 'blue'
  description?: boolean
}
type SecondStubFloatNumbers = Pick<SecondStubProps, 'mainColor'> & {
  refsElementsContainer: React.RefObject<HTMLDivElement>
  refsElements: RefsElements
  setRefsElements: React.Dispatch<React.SetStateAction<RefsElements>>
}
type Numbers = {
  number: string
  size: number
  desktopSize: number
  top: number
  left: number
  desktopTop: number
  desktopLeft: number
  opacity?: number
  opacityDesktop?: number
  medianSize: number
  medianLeft: number
  medianTop: number
}[]

function touching(
  elementPosition: [number | undefined, number | undefined, number, number],
  elementsPositions: [number, number, number, number][] = [],
  margin = 10) {
  const [width, height, left, top] = elementPosition as [number, number, number, number];
  if (!Number.isInteger(width) || !Number.isInteger(height)) {
    return true;
  }
  const isTouching = elementsPositions.reduce((prev, otherElement) => {
    const [_width, _height, _left, _top] = otherElement;
    const isTouching = !(
      ((top + height) < (_top)) ||
      (top > (_top + _height)) ||
      ((left + width) < _left) ||
      (left > (_left + _width)));
    return prev ? prev : isTouching;
  }, false);
  return isTouching;
}

const deBounce = memoize((
  _container: [number | undefined, number | undefined],
  xy: [number, number],
  elementPosition: [number, number, number, number] | [] = [],
  elementsPositions: [number, number, number, number][] = []
) => {
  const [width, height] = elementPosition;
  const [containerWidth, containerHeight] = _container;
  const [_x, _y] = xy;
  const left = (_x - (width ? width / 2 : 0)) + (width ? width : 0);
  const top = (_y - (height ? height / 2 : 0)) + (height ? height : 0);
  const closest: {
    x: [boolean] | [boolean, number, [number, number]]
    y: [boolean] | [boolean, number, [number, number]]
    xy: [boolean] | [boolean, number, [number, number]]
  } = {
    x: [true],
    y: [true],
    xy: [true]
  };
  /*for (let i = 0; i < 1000; i = i + 1) {
    const [x, y] = [
      _x + (containerWidth ? left > containerWidth ? -i : i : i),
      _y + (containerHeight ? top > containerHeight ? -i : i : i)
    ];
    if (closest.x[0] && !closest.x[2]) {
      if (!touching([width, height, x, _y], elementsPositions)) {
        closest.x = [false, i, [x, _y]];
      }
    }
    if (closest.y[0] && !closest.y[2]) {
      if (!touching([width, height, _x, y], elementsPositions)) {
        closest.y = [false, i, [_x, y]];
      }
    }
    if (closest.xy[0] && !closest.xy[2]) {
      if (!touching([width, height, x, y], elementsPositions)) {
        closest.xy = [false, i, [x, y]];
      }
    }
    if (closest.x[2] && closest.y[2] && closest.xy[2]) {
      break;
    }
  }
  const closer = Object.values(closest).reduce<any>((prev, val) => {
    if (!val[2]) {
      return prev;
    }
    if (!prev.length) {
      return val;
    }
    return prev[1] < (val[1] as number) ? prev : val;
  }, []);
  // console.log('closer', closest, closer);
  return closer[2] || xy;*/
  return xy
}, {cacheKey: JSON.stringify});

export const numbers: Numbers = [
  {
    number: '1 735 540',
    size: 28,
    desktopSize: 70,
    top: 21,
    left: 180,
    desktopTop: 15,
    desktopLeft: 1307,
    medianSize: 42,
    medianLeft: 749,
    medianTop: 13
  },
  {
    number: '62 583',
    size: 20,
    desktopSize: 60,
    top: 75,
    left: 70,
    desktopLeft: 1007,
    desktopTop: 154,
    medianSize: 34,
    medianLeft: 633,
    medianTop: 135
  },
  {
    number: '854 713',
    size: 24,
    desktopSize: 70,
    top: 80,
    left: 251,
    desktopLeft: 1477,
    desktopTop: 237,
    medianSize: 42,
    medianLeft: 794,
    medianTop: 165
  },
  {
    number: '18 526',
    size: 14,
    desktopSize: 40,
    desktopLeft: 1171,
    desktopTop: 327,
    top: 112,
    left: 145,
    medianSize: 28,
    medianLeft: 696,
    medianTop: 255
  },
  {
    number: '527 418',
    size: 20,
    desktopSize: 60,
    desktopLeft: 1187,
    desktopTop: 551,
    top: 173,
    left: 60,
    medianSize: 34,
    medianLeft: 691,
    medianTop: 404
  },
  {
    number: '35 631',
    size: 20,
    desktopSize: 60,
    desktopLeft: 1514,
    desktopTop: 418,
    top: 158,
    left: 248,
    medianSize: 34,
    medianLeft: 830,
    medianTop: 329
  },
  {
    number: '285 934',
    size: 18,
    desktopSize: 60,
    desktopLeft: 1481,
    desktopTop: 713,
    top: 218,
    left: 169,
    medianSize: 34,
    medianLeft: 832,
    medianTop: 494
  },
  {
    number: '41 247 853',
    size: 42,
    desktopSize: 70,
    desktopLeft: 797,
    desktopTop: 302,
    left: 160,
    top: 278,
    medianSize: 42,
    medianLeft: 460,
    medianTop: 332
  },
  {
    number: '50 416',
    size: 14,
    desktopSize: 40,
    desktopLeft: 468,
    desktopTop: 144,
    top: 355,
    left: 48,
    medianSize: 28,
    medianLeft: 381,
    medianTop: 143
  },
  {
    number: '408 204',
    size: 28,
    desktopSize: 60,
    desktopLeft: 192,
    desktopTop: 137,
    top: 390,
    left: 148,
    medianSize: 40,
    medianLeft: 180,
    medianTop: 140
  },
  {
    number: '105 872',
    size: 14,
    desktopSize: 40,
    desktopLeft: 815,
    desktopTop: 500,
    top: 360,
    left: 246,
    medianSize: 28,
    medianLeft: 484,
    medianTop: 446
  },
  {
    number: '54 719',
    size: 28,
    desktopSize: 40,
    desktopLeft: 327,
    desktopTop: 333,
    top: 446,
    left: 48,
    medianSize: 50,
    medianLeft: 193,
    medianTop: 333
  },
  {
    number: '54 719',
    size: 14,
    desktopSize: 70,
    desktopLeft: 38,
    desktopTop: 440,
    top: 402,
    left: 252,
    medianSize: 28,
    medianLeft: 311,
    medianTop: 259
  },
  {
    number: '216 634',
    size: 20,
    desktopSize: 50,
    desktopTop: 540,
    desktopLeft: 421,
    top: 461,
    left: 178,
    medianSize: 28,
    medianLeft: 311,
    medianTop: 402
  },
  {
    number: '365 417',
    size: 18,
    desktopSize: 50,
    desktopTop: 700,
    desktopLeft: 94,
    top: 512,
    left: 74,
    medianSize: 28,
    medianLeft: 230,
    medianTop: 476
  },
  {
    number: '12 874',
    size: 14,
    desktopSize: 70,
    desktopTop: 55,
    desktopLeft: 640,
    top: 512,
    left: 250,
    medianSize: 42,
    medianLeft: 502,
    medianTop: 62
  },
  {
    number: '12 874',
    size: 14,
    desktopSize: 40,
    desktopTop: 700,
    desktopLeft: 475,
    top: 512,
    left: 75,
    medianSize: 14,
    medianLeft: 75,
    medianTop: 512,
    opacity: 0,
    opacityDesktop: 1
  }
];

type RefsElements = {
  [k: string]: HTMLParagraphElement | HTMLButtonElement
}
const SecondStubFloatNumbers = memo<SecondStubFloatNumbers>(({
                                                               mainColor,
                                                               refsElementsContainer,
                                                               refsElements,
                                                               setRefsElements
                                                             }) => {
  const {isDesktop, width, isMobile,} = useSizes();
  const widthRange = useMemo(() => {
    return Math.max(Math.min(width, 1920), 320); // only in range {320 to 1900}
  }, [width]);
  return numbers.map((number, i) => {
    const lastNumber = number.number.split('').pop();
    const cacheKey = `float-number-${i}`;
    const [position, positions] = Object.entries(refsElements)
      .reduce<[[number, number, number, number] | [], [number, number, number, number][]]>((prev, [key, element]) => {
        const [width, height, top, left] = [
          element.offsetWidth,
          element.offsetHeight,
          element.offsetLeft,
          element.offsetTop
        ];
        if (
          key === cacheKey
          && Number.isInteger(width)
          && Number.isInteger(height)
          && Number.isInteger(top)
          && Number.isInteger(left)
        ) {
          return [[width, height, top, left], prev[1]];
        }
        return (
          !element
          || !Number.isInteger(width)
          || !Number.isInteger(height)
          || !Number.isInteger(top)
          || !Number.isInteger(left)
          || !(
            element.offsetWidth
            || element.offsetHeight
            || element?.getClientRects()?.length
          )
          || parseFloat(element?.style.opacity) === 0
        )
          ? prev
          : [prev[0], [...prev[1], [width, height, top, left]]];
      }, [[], []]);
    const containerWidth = refsElementsContainer.current?.offsetWidth;
    const containerHeight = refsElementsContainer.current?.offsetHeight;
    const [left, top] = deBounce(
      [containerWidth, containerHeight],
      [
        convertRange(widthRange, [
          isMobile ? 320 : (isDesktop ? 1120 : 320),
          isMobile ? 1120 : (isDesktop ? 1920 : 1120)
        ], [
          isMobile ? number.left : (isDesktop ? number.medianLeft : number.left),
          isMobile ? number.medianLeft : (isDesktop ? number.desktopLeft + 56 : number.medianLeft)
        ]),
        convertRange(widthRange, [
          isMobile ? 320 : (isDesktop ? 1120 : 320),
          isMobile ? 1120 : (isDesktop ? 1920 : 1120)
        ], [
          isMobile ? number.top : (isDesktop ? number.medianTop : number.top),
          isMobile ? number.medianTop : (isDesktop ? number.desktopTop : number.medianTop)
        ])
      ],
      position,
      positions
    );
    const opacity = (
      Number.isInteger(number.opacity)
      && Number.isInteger(number.opacityDesktop)
    )
      ? (isDesktop ? number.opacityDesktop : number.opacity)
      : undefined;
    return (
      <p
        ref={(ref) => {
          if (!ref || refsElements[cacheKey]) {
            return;
          }
          setRefsElements(refs => ({
            ...refs,
            [cacheKey]: ref
          }));
        }}
        data-end={lastNumber}
        style={{
          fontSize: `${isMobile
            ? number.size
            : (!isDesktop ? number.medianSize : number.desktopSize)}px`,
          top: `${top}px`,
          left: `${left}px`,
          opacity
        }}
        className={`${i === 7 && mainColor === 'yellow' ? 'numbers-yellow' : 'numbers-blue'}  font-bold absolute w-fit float-numbers text-nowrap -translate-x-1/2 -translate-y-1/2`}
        key={i}
      >{number.number.slice(0, number.number.length - 1)}</p>
    );
  });
});
export const SecondStub = memo<SecondStubProps>(({mainColor = 'blue', description}) => {
  const {isMobile} = useSizes();
  const [refsElements, setRefsElements] = useState<RefsElements>({});
  const refsElementsContainer = useRef<HTMLDivElement>(null);
  const styles = useMemo(() => {
    return Array.from({length: numbers.length}).map((_, i) => {
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
  }, [numbers.length]);
  /*useEffect(() => {
    const onClick = (e: MouseEvent) => {
      alert(`${e.pageX - 90}:${e.pageY - 90}`);
    };
    document?.addEventListener('click', onClick);
    return () => {
      document?.removeEventListener('click', onClick);
    };
  }, []);*/
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Helmet>
        <style type="text/css">{styles}</style>
      </Helmet>
      <div
        className="py-8 px-2 mb-[30px] md:py-[30px] md:px-[120px] flex flex-col  justify-between items-center w-full h-full flex-grow max-w-[1900px]">
        <div className="w-full flex justify-start grow-0 ">
          <img src={logo} alt="logo" className="w-[76px] md:w-[152px]"/>
        </div>
        {
          description ? (
            <span
              className='text-center uppercase text-gray text-[14px] xl:text-[32px] font-bold xl:text-nowrap absolute top-[370px] xl:top-[50%] -translate-y-[50%]'>прослушиваний beyonce в день релиза</span>
          ) : null
        }
        <div className="w-full h-full  py-7 px-6 lg:pb-[108px] relative  mx-auto flex items-end"
             ref={refsElementsContainer}>
          <SecondStubFloatNumbers
            refsElements={refsElements}
            setRefsElements={setRefsElements}
            refsElementsContainer={refsElementsContainer}
            mainColor={mainColor}
          />
          {
            !isMobile
              ? <div className="w-full flex justify-center relative">
                <PrimaryButton
                  ref={(ref) => {
                    const cacheKey = 'button-desktop';
                    if (!ref || refsElements[cacheKey]) {
                      return;
                    }
                    setRefsElements(refs => ({
                      ...refs,
                      [cacheKey]: ref
                    }));
                  }}
                  title="Найди себя" icon={telegramLogo}
                  className="rounded-2 md:rounded-4 py-4 3xl:py-5 rounded-[8px] md:rounded-[16px] -mb-[28px] md:max-w-[312px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 hover:scale-105 transition-all duration-300"/>
              </div>
              : null
          }
        </div>
        {
          isMobile
            ? <div className="w-full flex justify-center">
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
                className="rounded-2 md:rounded-4 py-4 3xl:py-5 rounded-[8px] md:rounded-[16px] -mb-[28px] md:max-w-[312px]"/>
            </div>
            : null
        }
      </div>
      <SvgBgVector
        className={`absolute -left-[50%] -translate-y-1/2 -z-10 h-[40%] xs:h-[60%] xs:-left-[62%] sm:h-[90%]  md:h-[100%] md:-left-[45%]  xs2:h-[100%] lg:h-[120%] top-[50%] xl:-left-[40%] 2xl:h-[137%] 2xl:-left-[12%]`}
        // height='auto'
        color="#191919"
      />
    </div>
  );
});

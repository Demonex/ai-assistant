/*
import React, {Fragment, memo, RefObject, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Matter, {Engine, Render, Bodies, World, Composite, MouseConstraint, Runner, Constraint} from 'matter-js';
import './scene.css';
import {Helmet} from 'react-helmet';
import useDimensions from 'use-element-dimensions';
import logo from '../assets/svg/Logo.svg';
import PrimaryButton from '../components/PrimaryButton.js';
import telegramLogo from '../assets/svg/telegramLogo.svg';
import {SvgBgVector} from '../assets/svg/bgVector.js';
import {useSizes} from '../hooks/useSizes.js';
import {convertRange, randomInt} from '../utils.js';

type SecondStubProps = {
  mainColor?: 'yellow' | 'blue'
  description?: boolean
}
type SecondStubFloatNumbers = Pick<SecondStubProps, 'mainColor'> & {
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
const numbers: Numbers = [
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
const styles = Array.from({length: numbers.length}).map((_, i) => {
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
        transform: translate(${percent25[0]}px, ${percent25[1]}px);
      }
      50% {
        transform: translate(${percent50[0]}px, ${percent50[1]}px);
      }
      75% {
        transform: translate(${percent75[0]}px, ${percent75[1]}px);
      }
    }
    @keyframes animate${i} {
      25% {
        transform: translate(${percent25[0]}px, ${percent25[1]}px);
      }
      50% {
        transform: translate(${percent50[0]}px, ${percent50[1]}px);
      }
      75% {
        transform: translate(${percent75[0]}px, ${percent75[1]}px);
      }
    }
    `;
}).join('\n');

type RefsElements = {
  [k: string]: HTMLParagraphElement | HTMLButtonElement
}
const SecondStubFloatNumbers = memo<SecondStubFloatNumbers>(({
                                                               mainColor,
                                                               refsElements,
                                                               setRefsElements
                                                             }) => {
  const {isDesktop, width, isMobile} = useSizes();
  const widthRange = useMemo(() => {
    return Math.max(Math.min(width, 1920), 320); // only in range {320 to 1900}
  }, [width]);
  return numbers.map((number, i) => {
    const lastNumber = number.number.split('').pop();
    const cacheKey = `float-number-${i}`;
    const [left, top] = [
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
    ];
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
        className={`${i === 7 && mainColor === 'yellow' ? 'numbers-yellow' : 'numbers-blue'}  font-bold absolute w-fit float-numbers text-nowrap`}
        key={i}
      >{number.number.slice(0, number.number.length - 1)}</p>
    );
  });
});
type PlaygroundProps = {
  width: number
  height: number
  refsElements: RefsElements
}
const Playground = memo<PlaygroundProps>(({
                                            width,
                                            height,
                                            refsElements
                                          }) => {
  const requestRef = useRef<number>();
  const refWallsTop = useRef<HTMLDivElement>();
  const refWallsRight = useRef<HTMLDivElement>();
  const refWallsBottom = useRef<HTMLDivElement>();
  const refWallsLeft = useRef<HTMLDivElement>();
  const engineRef = useRef<Engine>();
  const {isDesktop, width: w, isMobile} = useSizes();
  const widthRange = useMemo(() => {
    return Math.max(Math.min(w, 1920), 320); // only in range {320 to 1900}
  }, [w]);
  const container = {
    width: width-40,
    height: height-40
  };

  const animate = () => {
    const elements = Object.entries(refsElements).map(([cacheKey, element]) => {
      const {
        offsetWidth: width,
        offsetHeight: height,
        // offsetLeft: x,
        // offsetTop: y,
        style
      } = element;
      const number = numbers.find((_, i) => {
        return i === Number(cacheKey.split('-').pop());
      });
      const [left, top] = number ? [
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
      ] : [
        parseFloat(style.left),
        parseFloat(style.top)
      ];
      const body = Bodies.rectangle(left, top, width, height, {
        isStatic: !cacheKey.startsWith('float-number')
      });
      return {
        body: body,
        constraint: Constraint.create({
          pointA: {x: left, y: top},
          bodyB: body,
          pointB: {x: -80, y: -30},
          stiffness: 0.05,
          damping: 0.01
        }),
        elem: element,
        render() {
          const {x, y} = this.body.position;
          this.elem.style.left = `${x - width / 2}px`;
          this.elem.style.top = `${y - height / 2}px`;
          // this.elem.style.transform = `rotate(${this.body.angle}rad)`;
        }
      };
    });
    const engine = engineRef.current = Engine.create({
      gravity: {
        x: 0,
        y: 0,
        scale: 0
      }
    });
    const world = engine.world;
    /!*const render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width,
        height,
        showAngleIndicator: false
      }
    });
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);*!/
    const walls = {
      top: {
        body: Bodies.rectangle(0, -1, container.width * 2, .5 * 2, {
          isStatic: true
        }),
        elem: refWallsTop.current,
        render() {
          const {x, y} = this.body.position;
          this.elem.style.top = `${y - .5}px`;
          this.elem.style.left = `${x - .5}px`;
          this.elem.style.transform = `rotate(${this.body.angle}rad)`;
        }
      },
      right: {
        body: Bodies.rectangle(container.width, 0, .5 * 2, container.height * 2, {
          isStatic: true
        }),
        elem: refWallsRight.current,
        render() {
          const {x, y} = this.body.position;
          this.elem.style.top = `${y - .5}px`;
          this.elem.style.left = `${x - .5}px`;
          this.elem.style.transform = `rotate(${this.body.angle}rad)`;
        }
      },
      bottom: {
        body: Bodies.rectangle(0, container.height, container.width * 2, .5 * 2, {
          isStatic: true
        }),
        elem: refWallsBottom.current,
        render() {
          const {x, y} = this.body.position;
          this.elem.style.top = `${y - .5}px`;
          this.elem.style.left = `${x - .5}px`;
          this.elem.style.transform = `rotate(${this.body.angle}rad)`;
        }
      },
      left: {
        body: Bodies.rectangle(-1, 0, .5 * 2, container.height * 2, {
          isStatic: true
        }),
        elem: refWallsLeft.current,
        render() {
          const {x, y} = this.body.position;
          this.elem.style.top = `${y - .5}px`;
          this.elem.style.left = `${x - .5}px`;
          this.elem.style.transform = `rotate(${this.body.angle}rad)`;
        }
      }
    };
    Composite.add(world, [
      walls.top.body,
      walls.right.body,
      walls.bottom.body,
      walls.left.body,
      ...elements.reduce((prev, {body, constraint}) => ([
        ...prev, body, constraint
      ]), [])
      /!*MouseConstraint.create(
        engine,
        {element: document.body}
      )*!/
    ]);
    (function rerender() {
      console.log('rerender');
      elements.forEach(elem => elem.render());
      Engine.update(engine);
      requestRef.current = requestAnimationFrame(rerender);
    })();
  };

  useEffect(() => {
    if (!width || !height) {
      return;
    }
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    }
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
      engineRef.current = undefined;
    }
    animate();
    const stopTimeout = setTimeout(() => {
      if (requestRef.current) {
        console.log('z');
        cancelAnimationFrame(requestRef.current);
        requestRef.current = undefined;
      }
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
        engineRef.current = undefined;
      }
    }, 500);
    return () => {
      console.log('x');
      clearTimeout(stopTimeout);
    };
  }, [width, height]);
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = undefined;
      }
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
        engineRef.current = undefined;
      }
    };
  }, []);
  return null;
});
export const Scene = memo<SecondStubProps>(({mainColor = 'blue', description}) => {
  const [{width: containerWidth, height: containerHeight}, refContainer] = useDimensions();
  const {isMobile} = useSizes();
  const [refsElements, setRefsElements] = useState<RefsElements>({});
  const refsElementsContainer = useRef<HTMLDivElement>(null);
  /!*useEffect(() => {
    const onClick = (e: MouseEvent) => {
      alert(`${e.pageX}:${e.pageY}`);
    };
    document?.addEventListener('click', onClick);
    return () => {
      document?.removeEventListener('click', onClick);
    };
  }, []);*!/
  return (
    <Fragment>
      <Playground
        width={containerWidth}
        height={containerHeight}
        refsElements={refsElements}
      />
      <div className="w-full h-full flex justify-center items-center">
        <Helmet>
          <style type="text/css">{styles}</style>
        </Helmet>
        <div
          className="py-8 px-2 mb-[30px] md:py-[30px] md:px-[120px] flex flex-col  justify-between items-center w-full h-full flex-grow max-w-[1900px]"
          ref={refContainer}>
          <div className="w-full flex justify-start grow-0 ">
            <img src={logo} alt="logo" className="w-[76px] md:w-[152px]"/>
          </div>
          {
            description ? (
              <span
                className="text-center uppercase text-gray text-[14px] xl:text-[32px] font-bold xl:text-nowrap absolute top-[370px] xl:top-[50%] -translate-y-[50%]">прослушиваний beyonce в день релиза</span>
            ) : null
          }
          <div className="w-full h-full  py-7 px-6 lg:pb-[108px] relative  mx-auto flex items-end"
               ref={refsElementsContainer}>
            <SecondStubFloatNumbers
              refsElements={refsElements}
              setRefsElements={setRefsElements}
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
                    className="rounded-2 md:rounded-4 py-4 3xl:py-5 rounded-[8px] md:rounded-[16px] -mb-[28px] md:max-w-[312px] absolute hover:scale-105 transition-all duration-300"/>
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
    </Fragment>
  );
});
*/

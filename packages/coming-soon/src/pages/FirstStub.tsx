import logo from '../assets/svg/Logo.svg';
import comingSoon from '../assets/svg/comingSoon.svg';
import telegramLogo from '../assets/svg/telegramLogo.svg';
import pik1 from '../assets/png/Rectangle 10.png';
import pik2 from '../assets/png/Rectangle 11.png';
import pik3 from '../assets/png/Rectangle 12.png';
import pik4 from '../assets/png/Rectangle 13.png';
import pik5 from '../assets/png/Rectangle 14.png';
import pik6 from '../assets/png/Rectangle 15.png';
import pik7 from '../assets/png/Rectangle 16.png';
import {memo, useEffect, useRef, useState} from 'react';
import {Marker} from '../assets/svg/marker.js';
import {useSizes} from '../hooks/useSizes.js';
import {SvgBgVector} from '../assets/svg/bgVector.js';
import Slider from './components/Slider.js';
import PrimaryButton from '../components/PrimaryButton.js';
import {convertRange} from '../utils.js';

export const sliders = [
  [
    pik1,
    pik2,
    pik3,
    pik4,
    pik5,
    pik6,
    pik7,
    pik1,
    pik2,
    pik3,
    pik4,
    pik5,
    pik6,
    pik7
  ],
  [
    pik4,
    pik5,
    pik6,
    pik7,
    pik1,
    pik2,
    pik3,
    pik4,
    pik5,
    pik6,
    pik7,
    pik1,
    pik2,
    pik3
  ]
];

export const FirstStub = memo(() => {
  const refElement = useRef<HTMLDivElement>();
  const {is1600, width, isMobile, widthRange} = useSizes({range: [620, 1920]});
  const [leftElementHeight, setLeftElementHeight] = useState<number>();
  const logoWidth = convertRange(widthRange, [620, 1920], [76, 152]);
  const comingSoonWidth = convertRange(widthRange, [620, 1920], [155, 253]);
  const markWidth = convertRange(widthRange, [620, 1920], [114, 252]);
  const h1Size = convertRange(widthRange, [620, 1920], [23, 52]);
  const h1LineHeight = convertRange(widthRange, [620, 1920], [25.3, 57.2]);
  const pSize = convertRange(widthRange, [620, 1920], [16, 32]);
  const pLineHeight = convertRange(widthRange, [620, 1920], [19.2, 38.4]);
  const textGap = convertRange(widthRange, [620, 1920], [20, 30.26]);
  const paddingXGlobal = convertRange(widthRange, [620, 1920], [10, 120]);
  const paddingYGlobal = convertRange(widthRange, [620, 1920], [30, 50]);
  const btnMgTop = convertRange(widthRange, [620, 1920], [30, 50]);
  const comingSoonMgTop = convertRange(widthRange, [620, 1920], [49, 80]);
  const comingSoonMgBottom = convertRange(widthRange, [620, 1920], [18, 49]);
  const SvgBgVectorWidth = convertRange(widthRange, [620, 1920], [150, 150]);
  const SvgBgVectorScale = convertRange(widthRange, [620, 1920], [1.2, 1.5]);

  useEffect(() => {
    if (!refElement.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setLeftElementHeight(refElement.current?.offsetHeight);
    });
    resizeObserver.observe(refElement.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="x-auto w-full flex lg:flex-row flex-col max-w-[1680px] ">
        <div
          className="2lg:pt-[3.125rem] pt-[30px] w-full lg:w-[65%]"
          ref={refElement}
          style={{
            padding: `${paddingYGlobal}px ${paddingXGlobal}px`
          }}
        >
          <div className="w-full h-full">
            <img src={logo} alt="logo" style={{
              width: `${logoWidth}px`
            }}/>
            <div className="flex flex-col">
              <img src={comingSoon} alt="" style={{
                width: `${comingSoonWidth}px`,
                marginTop: `${comingSoonMgTop}px`,
                marginBottom: `${comingSoonMgBottom}px`
              }}/>
              <div className="flex flex-col">
                <h1 className="font-black" style={{
                  fontSize: `${h1Size}px`,
                  lineHeight: `${h1LineHeight}px`,
                  paddingBottom: `${textGap}px`
                }}>
                  Стань одним из&nbsp;
                  <span
                    className="relative inline font-black"
                    style={{fontSize: `${h1Size}px`}}>
                      первых
                      <Marker
                        className={`absolute ${is1600 ? '-left-[16%] -top-[21%]' : '-left-[14%] -top-[20%]'} `}
                        width={markWidth}/>
                    </span>
                  <br/> пользователей сервиса аналитики{' '}
                  <span className="text-gray font-black" style={{fontSize: `${h1Size}px`}}>
                      для&nbsp;музыкантов, менеджеров и&nbsp;музыкальных лейблов
                    </span>
                </h1>
                <p className="font-normal" style={{
                  fontSize: `${pSize}px`,
                  lineHeight: `${pLineHeight}px`
                }}>Узнай все&nbsp;подробности. Подключайся
                  к&nbsp;нашему
                  сообществу
                  представителей музыкальной индустрии</p>
              </div>
              <a href="https://t.me/rififymedia" target="_blank" style={{
                marginTop: `${btnMgTop}px`
              }}>
                <PrimaryButton
                  title="Присоединиться"
                  icon={telegramLogo}
                  className="md:max-w-[330px] py-4 3xl:py-5 rounded-[8px] md:rounded-[16px]"/>
              </a>
            </div>
          </div>
        </div>
        <Slider
          leftElementHeight={leftElementHeight}
        />
      </div>
      <SvgBgVector
        className="fixed -z-10 2xl:h-full"
        style={{
          width: `calc(${SvgBgVectorWidth}vw)`,
          scale: `${SvgBgVectorScale}`
        }}
        color="#191919"
      />
    </div>
  );
});

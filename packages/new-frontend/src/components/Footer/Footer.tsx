import logo from '/assets/imgs/noun-music-6327733.svg';
import appstore from '/assets/imgs/app-store-badge.svg';
import googleplay from '/assets/imgs/google-play-badge.svg';
import macos from '/assets/imgs/macos-badge.svg';
import windows from '/assets/imgs/windows-badge.svg';
import linux from '/assets/imgs/linux-badge.svg';
import {footer} from '../../data/consts/navbar.js';
import {memo, useMemo} from 'react';
import get from 'lodash.get';
import chunk from 'lodash.chunk';
import {ShowOnLaptopToDesktop} from '../Sizes/ShowOnLaptopToDesktop/ShowOnLaptopToDesktop.js';

type FooterNavBarItem = typeof footer[number]
type FooterNavBarItems = typeof footer[number]['content'][number]['options']
export const Footer = memo(() => {
  const MenuItemPlatforms: FooterNavBarItem = useMemo<any>(() => {
    return get(footer, 0, {});
  }, []);
  const MenuItemUseCases: FooterNavBarItem = useMemo<any>(() => {
    return get(footer, 1, {});
  }, []);
  const MenuItemResources: FooterNavBarItem = useMemo<any>(() => {
    return get(footer, 2, {});
  }, []);
  const MenuItemPlatformsOptions: [FooterNavBarItems, FooterNavBarItems] = useMemo<any>(() => {
    return chunk(get<any, any>(MenuItemPlatforms, 'content', []).reduce((prev, next) => [...prev, ...get(next, 'options')], []), 10);
  }, []);
  const MenuItemUseCasesOptions: [FooterNavBarItems] = useMemo<any>(() => {
    return chunk(get<any, any>(MenuItemUseCases, 'content', []).reduce((prev, next) => [...prev, ...get(next, 'options')], []), 10);
  }, []);
  const MenuItemResourcesOptions: [FooterNavBarItems] = useMemo<any>(() => {
    return chunk(get<any, any>(MenuItemResources, 'content', []).reduce((prev, next) => [...prev, ...get(next, 'options')], []), 10);
  }, []);

  return (
    <footer className="relative border-t bg-gray-900 border-white/5 w-full">
      <svg className="absolute blur-3xl right-0 opacity-50" width="50%" height="100%" viewBox="0 0 400 400"
           fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_17_60)">
          <g filter="url(#filter0_f_17_60)">
            <path d="M128.6 0H0V322.2L332.5 211.5L128.6 0Z" fill="#4D07E3"></path>
            <path d="M0 322.2V400H240H320L332.5 211.5L0 322.2Z" fill="#4C00FF"></path>
            <path d="M320 400H400V78.75L332.5 211.5L320 400Z" fill="#7fcef3"></path>
            <path d="M400 0H128.6L332.5 211.5L400 78.75V0Z" fill="#7fcef3"></path>
          </g>
        </g>
        <defs>
          <filter id="filter0_f_17_60" x="-159.933" y="-159.933" width="719.867" height="719.867"
                  filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
            <feGaussianBlur stdDeviation="79.9667" result="effect1_foregroundBlur_17_60"></feGaussianBlur>
          </filter>
        </defs>
      </svg>
      <div className={`
            flex justify-center laptop:block
            relative py-12 w-full md:px-12 lg:px-32 lg:py-24 backdrop-blur-3xl`}>
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="text-white xl:col-span-1 w-full text-center laptop:w-auto laptop:text-start">
            <div className="flex flex-col items-start gap-6 w-full">
              <div
                className="flex flex-row items-center cursor-pointer gap-x-0.5 w-full justify-center laptop:w-auto laptop:justify-normal">
                <img src={logo} alt="logo" className="w-[30px] h-[30px]"/>
                <h2 className="text-white font-bold text-[20px]">MusicStats</h2>
              </div>
              <div
                className="flex flex-col gap-2 w-full justify-center laptop:w-auto laptop:justify-normal">
                <h1 className="text-gray-400/50">GET THE MOBILE APP</h1>
                <div className="flex gap-2 w-full justify-center">
                  <img src={appstore} alt="" className="h-[30px]"/>
                  <img src={googleplay} alt="" className="h-[30px]"/>
                </div>
              </div>
              <div
                className="flex flex-col gap-2 w-full justify-center laptop:w-auto laptop:justify-normal">
                <h1 className="text-gray-400/50">GET THE DESKTOP APP</h1>
                <div className="flex gap-2 w-full justify-center">
                  <img src={macos} alt="" className="h-[30px]"/>
                  <img src={windows} alt="" className="h-[30px]"/>
                  <img src={linux} alt="" className="h-[30px]"/>
                </div>
              </div>
            </div>
          </div>
          <ShowOnLaptopToDesktop>
            <div className="grid grid-cols-2 gap-8 mt-12 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {

                  MenuItemPlatformsOptions.map((items, index) => (
                    <div key={index}>
                      <h3
                        className={`uppercase text-white ${index > 0 ? 'opacity-0 select-none' : ''}`}>{MenuItemPlatforms.title}</h3>
                      {
                        items.map((item, index) => (
                          <ul role="list" className="mt-4 space-y-2" key={index}>
                            {
                              <li className="flex items-center gap-x-4">
                                <img src={item.logo} alt="" className="w-[16px]"/>
                                <a
                                  className="inline-flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">{item.name}</a>
                              </li>
                            }
                          </ul>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {

                  MenuItemUseCasesOptions.map((items, index) => (
                    <div key={index}>
                      <h3
                        className={`uppercase text-white ${index > 0 ? 'opacity-0 unselectable' : ''}`}>{MenuItemUseCases.title}</h3>
                      {
                        items.map((item, index) => (
                          <ul role="list" className="mt-4 space-y-2" key={index}>
                            {
                              <li className="flex">
                                <a
                                  className="inline-flex items-center text-sm text-gray-300 hover:text-white cursor-pointer capitalize">{item.name}</a>
                              </li>
                            }
                          </ul>
                        ))
                      }
                    </div>
                  ))
                }
                {

                  MenuItemResourcesOptions.map((items, index) => (
                    <div key={index}>
                      <h3
                        className={`uppercase text-white ${index > 0 ? 'opacity-0 unselectable' : ''}`}>{MenuItemResources.title}</h3>
                      {
                        items.map((item, index) => (
                          <ul role="list" className="mt-4 space-y-2" key={index}>
                            {
                              <li className="flex">
                                <a
                                  className="inline-flex items-center text-sm text-gray-300 hover:text-white cursor-pointer capitalize">{item.name}</a>
                              </li>
                            }
                          </ul>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            </div>
          </ShowOnLaptopToDesktop>
        </div>
      </div>
      <div
        className="px-5 py-12 mx-auto border-t border-gray-800 sm:px-6 md:flex md:items-center md:justify-between lg:px-20 backdrop-blur-3xl">
        <div className="flex justify-center mb-8 space-x-6 md:order-last md:mb-0">
                    <span className="inline-flex justify-center w-full gap-4 lg:ml-auto md:justify-start md:w-auto">
                      <a
                        className="w-[16px] h-[16px] fill-gray-600 hover:fill-white transition fill 0.2s ease-in-out cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path
                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                      </a>

                      <a
                        className="w-[16px] h-[16px] fill-gray-600 hover:fill-white transition fill 0.2s ease-in-out cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                              d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 0 0 1.384 2.126A5.868 5.868 0 0 0 4.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384 5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126A5.847 5.847 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"
                              fill="#currento"/>
                        </svg>
                      </a>
                            <a
                              className="w-[16px] h-[16px] fill-gray-600 hover:fill-white transition fill 0.2s ease-in-out cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path
                                  d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                                </svg>
                            </a>
                        <a
                          className="w-[16px] h-[16px] fill-gray-600 hover:fill-white transition fill 0.2s ease-in-out cursor-pointer">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path
                               d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                            </a>
                        <a
                          className="w-[16px] h-[16px] fill-gray-600 hover:fill-white transition fill 0.2s ease-in-out cursor-pointer">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path
                               d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>
                            </a>
                    </span>
        </div>
        <div className="mt-8 md:mt-0 md:order-1 text-center tablet:text-start">
                    <span className="mt-2 text-sm font-light text-gray-600">
                      Copyright © {new Date().getFullYear()}
                    </span>
        </div>
      </div>
    </footer>
  );
});

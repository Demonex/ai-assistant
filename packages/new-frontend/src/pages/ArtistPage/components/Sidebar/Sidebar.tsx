import {Link} from 'wouter';
import React, {memo} from 'react';
import {useArtistProfile} from '../../hooks/useArtistProfile.js';
import {socials} from '../../../../data/consts/socials.js';
import {useArtist} from '../../hooks/useArtist.js';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import {useMobileMenu} from '../../../../components/Header/components/MobileMenu/hooks/useMobileMenu.js';


type Navigation = {
  title: string
  svg: (active: boolean) => React.ReactElement
  component?: 'feed' | 'analytics' | 'audience' | 'marketing' | 'catalogue'
}[]

const navigations: Navigation = [
  {
    title: 'Activity Feed',
    svg: (active) => (
      <div
        className={`mr-4 rounded-md ring-slate-900/5  group-hover:ring-slate-900/10  group-hover:highlight-white/10 group-hover:shadow-indigo-200 group-hover:bg-indigo-500 ${active ? 'bg-indigo-600 ring-slate-900/10 highlight-white/10 shadow-indigo-200' : 'bg-slate-800 '} highlight-white/5`}>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
          <path fillRule="evenodd" clipRule="evenodd"
                d="M7.154 6C6.516 6 6 6.517 6 7.154v8.077a1.846 1.846 0 0 0 1.846 1.846h9.23a1.846 1.846 0 0 1-1.845-1.846V7.154c0-.638-.517-1.154-1.154-1.154H7.154ZM12 10.154a.462.462 0 0 0 0 .923h.923a.461.461 0 1 0 0-.923H12Zm-.461-1.385A.462.462 0 0 1 12 8.308h.923a.461.461 0 1 1 0 .923H12a.462.462 0 0 1-.461-.462ZM8.308 12a.461.461 0 1 0 0 .923h4.615a.461.461 0 1 0 0-.923H8.308Zm-.462 2.308a.462.462 0 0 1 .462-.462h4.615a.461.461 0 1 1 0 .923H8.308a.461.461 0 0 1-.462-.461Zm.462-6a.462.462 0 0 0-.462.461v1.846c0 .255.207.462.462.462h1.846a.461.461 0 0 0 .461-.462V8.77a.461.461 0 0 0-.461-.461H8.308Z"
                className={` group-hover:fill-indigo-300 ${active ? 'fill-indigo-300' : 'fill-slate-500'}`}
          />
          <path d="M16.154 8.308h1.154c.382 0 .692.31.692.692v6.23a.923.923 0 0 1-1.846 0V8.309Z"
                className={` group-hover:fill-indigo-400 ${active ? 'fill-indigo-400' : 'fill-slate-700'}`}/>
        </svg>
      </div>
    ),
    component: 'feed'
  },
  {
    title: 'Analytics',
    svg: (active) => (
      <div
        className={`mr-4 rounded-md  group-hover:ring-slate-900/10  group-hover:highlight-white/10 group-hover:shadow-sky-200 group-hover:bg-sky-500 ${active ? 'bg-sky-600 ring-slate-900/10 highlight-white/10 shadow-sky-200' : 'bg-slate-800 '}`}>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
          <path
            d="M6 12.923a5.077 5.077 0 0 1 5.077-5.077.462.462 0 0 1 .462.462v4.154h4.153a.462.462 0 0 1 .462.461 5.076 5.076 0 1 1-10.154 0Z"
            className={`group-hover:fill-sky-200 ${active ? 'fill-sky-200' : 'fill-slate-500'}`}
          />
          <path
            d="M12.461 6.462A.462.462 0 0 1 12.923 6 5.077 5.077 0 0 1 18 11.077a.462.462 0 0 1-.462.462h-4.615a.462.462 0 0 1-.462-.462V6.462Z"
            className={` group-hover:fill-sky-400 ${active ? 'fill-sky-400' : 'fill-slate-600'}`}
          />
        </svg>
      </div>
    ),
    component: 'analytics'
  },
  {
    title: 'Audience',
    svg: (active) => (
      <div
        className={`mr-4 rounded-md group-hover:ring-slate-900/10  group-hover:highlight-white/10 group-hover:shadow-purple-200 group-hover:bg-purple-500 ${active ? 'bg-purple-600 ring-slate-900/5 highlight-white/10 shadow-purple-200' : 'bg-slate-800 '}`}>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
          <path
            d="M10.35 17.713c-2.4 0-4.513-.422-4.34-1.478.46-2.765 1.9-4.377 4.34-4.377 2.438 0 3.877 1.631 4.338 4.377.173 1.056-1.939 1.479-4.339 1.479ZM10.35 11.378A2.189 2.189 0 1 0 10.348 7a2.189 2.189 0 0 0 0 4.378Z"
            className={`group-hover:fill-purple-300 ${active ? 'fill-purple-300' : 'fill-slate-500'}`}/>
          <path
            d="M15.264 11.32a1.632 1.632 0 1 0 0-3.264 1.632 1.632 0 0 0 0 3.264ZM18.51 15.18c-.327-2.055-1.402-3.284-3.246-3.284-.71 0-1.286.173-1.766.518.058.058.115.116.192.173.787.826 1.325 2.016 1.574 3.533 0 .058.02.115.02.154 1.785.019 3.36-.288 3.225-1.095Z"
            className={`group-hover:fill-purple-400 ${active ? 'fill-purple-400' : 'fill-slate-600'}`}/>
        </svg>
      </div>
    ),
    component: 'audience'
  },
  {
    title: 'Marketing',
    svg: (active) => (
      <div
        className={`mr-4 rounded-md group-hover:ring-slate-900/10  group-hover:highlight-white/10 group-hover:shadow-blue-200 group-hover:bg-blue-500 ${active ? 'bg-blue-600 ring-slate-900/5 highlight-white/10 shadow-purple-200' : 'bg-slate-800 '}`}>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
          <path fillRule="evenodd" clipRule="evenodd"
                d="M10.466 9.477A8.985 8.985 0 0 1 17.57 6a.429.429 0 0 1 .429.429c0 2.889-1.362 5.46-3.477 7.106A3.857 3.857 0 0 1 10.714 18a.429.429 0 0 1-.428-.429v-2.36a9.055 9.055 0 0 1-1.496-1.497H6.429A.429.429 0 0 1 6 13.286a3.857 3.857 0 0 1 4.466-3.81ZM13.714 9a1.286 1.286 0 1 0 0 2.572 1.286 1.286 0 0 0 0-2.572Z"
                className={` group-hover:fill-blue-300 ${active ? 'fill-blue-300' : 'fill-slate-600'}`}
          />
          <path
            d="M8.149 14.995a.43.43 0 0 0-.513-.687 2.996 2.996 0 0 0-1.171 2.87.429.429 0 0 0 .357.358 2.996 2.996 0 0 0 2.87-1.172.429.429 0 1 0-.687-.513 2.139 2.139 0 0 1-1.72.863c0-.703.339-1.327.864-1.719Z"
            className={`group-hover:fill-blue-100 ${active ? 'fill-blue-100' : 'fill-slate-600'}`}/>
        </svg>
      </div>
    ),
    component: 'marketing'
  },
  {
    title: 'Catalogue',
    svg: (active) => (
      <div
        className={`mr-4 rounded-md ring-slate-900/5  group-hover:ring-slate-900/10  group-hover:highlight-white/10 group-hover:shadow-fuchsia-200 group-hover:bg-fuchsia-500 ${active ? 'bg-fuchsia-600 ring-slate-900/5 highlight-white/10 shadow-fuchsia-200' : 'bg-slate-800 '}`}>
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
            className={`group-hover:fill-fuchsia-300 fill-fuchsia-300 ${active ? 'fill-fuchsia-300' : 'fill-slate-600'}`}></path>
          <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                className={`group-hover:fill-white ${active ? 'fill-white' : 'fill-slate-400'}`}></path>
          <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                className={`group-hover:fill-fuchsia-300 fill-fuchsia-300 ${active ? 'fill-fuchsia-300' : 'fill-slate-600'}`}></path>
        </svg>
      </div>
    ),
    component: 'catalogue'
  }
];

export const NavigationItems = memo(() => {
  const {id, navigation, name} = useArtist();
  console.log('navigation',navigation)
  const {setIsOpen} = useMobileMenu();
  return (
    <>
      {
        navigations.map((nav, index) => (
          <Link to={`/artist/${id}/${name}${nav.component ? `/${nav.component}` : ''}`}
                className={`group flex items-center text-md mb-4 font-medium ${nav.component === navigation ? 'text-slate-300' : 'text-slate-400 '}  hover:text-slate-300`}
                key={index}
                onClick={() => setIsOpen(false)}
          >
            {nav.svg(nav.component === navigation)}
            {nav.title}
          </Link>
        ))
      }
    </>
  );
});

const SkeletonSideBar = memo(() => (
  <SkeletonTheme baseColor="#C7D2FE0D"
                 highlightColor="#C7D2FE12">
    <div className="flex flex-col items-center gap-6">
      <Skeleton width={180} height={180} circle={true}/>
      <div className="flex flex-col items-center">
        <Skeleton width="5rem" height="1.5rem"/>
        <Skeleton width="3rem" height="1.5rem"/>
      </div>
      <div
        className="flex justify-center flex-wrap lg:text-center gap-2 list-none ">
        {
          Array.from({length: 10}).map((option, index) => (
            <Link
              key={index}
              to=""
            >
              <Skeleton
                className="rounded-xl inline-flex items-center border border-indigo-500/30"
                width={34} height={34}>
              </Skeleton>
            </Link>
          ))
        }
      </div>
      <div className="relative button-wrapper w-[155px] h-[36px] mt-5">
        <Skeleton height={36}/>
      </div>

    </div>
  </SkeletonTheme>
));
export const Sidebar = memo(() => {
  const profile = useArtistProfile();

  const {data: artistProfile, loading: artistProfileLoading} = profile || {};
  const artistProfileFiltered = artistProfile?.account.links.map((social, _) => {
    return (
      {
        source: social.source,
        link: social.link
      }
    );
  });
  const socialsFiltered = artistProfileFiltered?.reduce((prev, item) => {
    const result = socials.find((elem) => elem.slug === item.source);
    return result ? [...prev, {
      link: item.link,
      logo: result?.logo
    }] : prev;
  }, []);
  return (
    <>
      <div
        className="hidden lg:block fixed z-20 inset-0 top-[9.43rem] right-auto w-[18rem] mb-10 pl-6 pr-5 overflow-y-auto">
        <nav id="nav" className="lg:text-sm lg:leading-6 relative flex flex-col h-full items-start">
          <div className="sticky pointer-events-none">
            <div className="h-10"></div>
            <div className="relative pointer-events-auto">
              {
                artistProfileLoading === true
                  ? <SkeletonSideBar/>
                  : <div className="flex flex-col items-center gap-6">
                    <div className="w-[180px] h-[180px] bg-cover bg-center bg-no-repeat rounded-full"
                         style={{
                           backgroundImage: `url(${artistProfile?.account.imageUrl})`
                         }}/>
                    <div className="flex flex-col items-center">
                      <h1 className="text-xl text-white font-bold tracking-wider block">{artistProfile?.account.name}</h1>
                      <span
                        className="text-gray-400 font-light text-sm block uppercase">{artistProfile?.account.country}</span>
                    </div>
                    <div
                      className="flex justify-center flex-wrap lg:text-center gap-2 list-none ">
                      {
                        socialsFiltered?.map((option, index) => (
                          <Link
                            key={index}
                            to={option.link}
                            target="_blank"
                          >
                            <div
                              className="bg-indigo-200/5 hover:bg-indigo-200/10 p-[10px] h-full w-full rounded-xl inline-flex items-center border border-indigo-500/30">
                              <img
                                src={option.logo} alt="" className="w-[12px] h-[12px]"/>
                            </div>
                          </Link>
                        ))
                      }
                    </div>
                    <div className="relative button-wrapper w-[155px] h-[36px] mt-5">
                      <button type="button"
                              className="w-full text-white block text-[16px] font-normal p-1.5 bg-[#111827] rounded-[10px] cursor-pointer">
                        Subscribe
                      </button>
                      <div className="button-bg "/>
                    </div>

                  </div>
              }
            </div>
          </div>
          <div className="mt-[25%] gap-[19px] flex flex-col">
            <NavigationItems/>
          </div>
          <div className="flex-1"></div>

          <div className="flex flex-wrap items-center w-full gap-[0.5rem] mt-10 sticky bottom-0">
            <button
              className="flex items-center justify-center w-[calc(50%-0.25rem) gap-2 px-3 py-2 text-[12px] font-semibold text-white transition-all border border-gray-700 rounded-lg h-10 bg-gray-900 hover:text-indigo-400 "
              type="button">
              <svg className="w-4 h-4" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_ii_1303_2191)">
                  <path
                    d="M1.4359 0.538027C1.1449 0.846027 0.9729 1.32403 0.9729 1.94303V24.059C0.9729 24.679 1.1449 25.156 1.4359 25.464L1.5099 25.536L13.8989 13.147V13.001V12.855L1.5099 0.465027L1.4359 0.538027Z"
                    fill="url(#paint0_linear_1303_2191)"></path>
                  <path
                    d="M18.0279 17.278L13.8989 13.147V13.001V12.855L18.0289 8.72498L18.1219 8.77798L23.0149 11.558C24.4119 12.352 24.4119 13.651 23.0149 14.446L18.1219 17.226L18.0279 17.278Z"
                    fill="url(#paint1_linear_1303_2191)"></path>
                  <g filter="url(#filter1_i_1303_2191)">
                    <path
                      d="M18.1218 17.225L13.8978 13.001L1.43579 25.464C1.89579 25.952 2.65679 26.012 3.51379 25.526L18.1218 17.225Z"
                      fill="url(#paint2_linear_1303_2191)"></path>
                  </g>
                  <path
                    d="M18.1218 8.77701L3.51379 0.477005C2.65679 -0.0099946 1.89579 0.0510057 1.43579 0.539006L13.8988 13.002L18.1218 8.77701Z"
                    fill="url(#paint3_linear_1303_2191)"></path>
                </g>
                <defs>
                  <filter id="filter0_ii_1303_2191" x="0.9729" y="0.14093" width="23.0898"
                          height="25.7207" filterUnits="userSpaceOnUse"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix"
                             result="shape"></feBlend>
                    <feColorMatrix in="SourceAlpha" type="matrix"
                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                   result="hardAlpha"></feColorMatrix>
                    <feOffset dy="-0.15"></feOffset>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                    <feColorMatrix type="matrix"
                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
                    <feBlend mode="normal" in2="shape"
                             result="effect1_innerShadow_1303_2191"></feBlend>
                    <feColorMatrix in="SourceAlpha" type="matrix"
                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                   result="hardAlpha"></feColorMatrix>
                    <feOffset dy="0.15"></feOffset>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                    <feColorMatrix type="matrix"
                                   values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"></feColorMatrix>
                    <feBlend mode="normal" in2="effect1_innerShadow_1303_2191"
                             result="effect2_innerShadow_1303_2191"></feBlend>
                  </filter>
                  <filter id="filter1_i_1303_2191" x="1.43579" y="13.001" width="16.686"
                          height="12.8607" filterUnits="userSpaceOnUse">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix"
                             result="shape"></feBlend>
                    <feColorMatrix in="SourceAlpha" type="matrix"
                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                   result="hardAlpha"></feColorMatrix>
                    <feOffset dy="-0.15"></feOffset>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                    <feColorMatrix type="matrix"
                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix>
                    <feBlend mode="normal" in2="shape"
                             result="effect1_innerShadow_1303_2191"></feBlend>
                  </filter>
                  <linearGradient id="paint0_linear_1303_2191" x1="12.8007" y1="1.70903" x2="-3.9813"
                                  y2="18.491" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00A0FF"></stop>
                    <stop offset="0.0066" stopColor="#00A1FF"></stop>
                    <stop offset="0.2601" stopColor="#00BEFF"></stop>
                    <stop offset="0.5122" stopColor="#00D2FF"></stop>
                    <stop offset="0.7604" stopColor="#00DFFF"></stop>
                    <stop offset="1" stopColor="#00E3FF"></stop>
                  </linearGradient>
                  <linearGradient id="paint1_linear_1303_2191" x1="24.8334" y1="13.001" x2="0.637527"
                                  y2="13.001" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFE000"></stop>
                    <stop offset="0.4087" stopColor="#FFBD00"></stop>
                    <stop offset="0.7754" stopColor="#FFA500"></stop>
                    <stop offset="1" stopColor="#FF9C00"></stop>
                  </linearGradient>
                  <linearGradient id="paint2_linear_1303_2191" x1="15.8279" y1="15.2949" x2="-6.93061"
                                  y2="38.0534" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF3A44"></stop>
                    <stop offset="1" stopColor="#C31162"></stop>
                  </linearGradient>
                  <linearGradient id="paint3_linear_1303_2191" x1="-1.70281" y1="-6.82319"
                                  x2="8.45949" y2="3.33911" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#32A071"></stop>
                    <stop offset="0.0685" stopColor="#2DA771"></stop>
                    <stop offset="0.4762" stopColor="#15CF74"></stop>
                    <stop offset="0.8009" stopColor="#06E775"></stop>
                    <stop offset="1" stopColor="#00F076"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <div className="flex flex-col items-start gap-1 leading-none">
                <span className="font-medium">Google Play</span>
              </div>
            </button>
            <button
              className="flex items-center justify-center w-[calc(50%-0.25rem) gap-2 px-3 py-2 text-[12px] font-semibold text-white transition-all border border-gray-700 rounded-lg h-10 bg-gray-900 hover:text-indigo-400 "
              type="button">
              <svg className="w-4 h-4" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.769 12.3008C15.7907 10.6198 16.6934 9.02922 18.1256 8.14876C17.2221 6.85844 15.7088 6.04034 14.1344 5.99108C12.4552 5.81482 10.8272 6.99591 9.97149 6.99591C9.09922 6.99591 7.78172 6.00858 6.36299 6.03777C4.51374 6.09751 2.78977 7.1489 1.89007 8.76564C-0.0439277 12.1141 1.39866 17.0351 3.25127 19.7417C4.17817 21.0671 5.26145 22.5475 6.6789 22.495C8.06596 22.4375 8.584 21.6105 10.2583 21.6105C11.9171 21.6105 12.4031 22.495 13.8493 22.4616C15.3377 22.4375 16.2754 21.1304 17.1698 19.7925C17.8358 18.8481 18.3483 17.8044 18.6882 16.7C16.9391 15.9602 15.771 14.2 15.769 12.3008Z"
                  fill="white"></path>
                <path
                  d="M13.0373 4.21108C13.8489 3.23687 14.2487 1.98469 14.1518 0.720459C12.912 0.850679 11.7668 1.44324 10.9443 2.38007C10.14 3.2954 9.72143 4.52555 9.80056 5.74146C11.0408 5.75423 12.2601 5.17773 13.0373 4.21108Z"
                  fill="white"></path>
              </svg>
              <div
                className="flex flex-col items-start gap-1 leading-none">
                <span className="font-medium">App Store</span>
              </div>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
});

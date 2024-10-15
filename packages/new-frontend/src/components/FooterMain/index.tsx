import logo from '/assets/svg/Logo.svg';
import {useSizes} from '../../hooks/useSizes.js';
import {useElementRangeSize} from '../../hooks/useElementRangeSize.js';
import {memo} from 'react';
import {ShowOnLaptopToDesktop} from '../SowOnLaptopToDeckTop/index.js';
import YoutubeSmm from '../../assets/YoutubeSmm.js';
import VkSmm from '../../assets/VkSmm.js';
import ZenSmm from '../../assets/ZenSmm.js';
import TGSmm from '../../assets/TGSmm.js';
import AppleBtn from '../../assets/AppleBtn.js';
import RustoreBtn from '../../assets/RustoreBtn.js';
import GoogleBtn from '../../assets/GoogleBtn.js';
import {Link, useLocation} from 'wouter';
import RutubeSmm from "../../assets/RutubeSmm.js";

const platforms = [
  {
    title: 'Платформы',
    list: [
      {
        name: 'Spotify',
        link: '/platform/spotify'
      },
      {
        name: 'Apple Music',
        link: '/platform/applemusic'
      },
      {
        name: 'Shazam',
        link: '/platform/shazam'
      },
      {
        name: 'SoundCloud',
        link: '/platform/soundcloud'
      }
    ]
  }
];
const customers = [
  {
    title: 'Для кого',
    list: [

      {
        name: 'лейблы',
        link: '/customer/labels'
      },
      {
        name: 'дестрибьюторы',
        link: '/customer/distributors'

      },
      {
        name: 'менеджеры',
        link: '/customer/managers'

      },
      {
        name: 'Фанаты',
        link: '/customer/fans'

      }

    ]
  }
];
const footerInfo = [
  {
    name: 'Тарифы',
    link: '#tariffes'
  },
  {
    name: 'Обратная связь',
    link: '/feedback'
  },
  {
    name: 'Реквизиты',
    link: '/documents/requisite'
  },
  {
    name: 'Попробовать бесплатно',
    link: '/auth/sign-up'
  }
];
const icons = [
  {
    name: 'vk',
    icon: <VkSmm className="hover:fill-primary_blue"/>,
    link: 'https://vk.com/rifify'
  },
  {
    name: 'zen',
    icon: <ZenSmm className="hover:fill-primary_blue"/>,
    link: 'https://dzen.ru/rifify'
  },
  {
    name: 'tg',
    icon: <TGSmm className="hover:fill-primary_blue"/>,
    link: 'https://t.me/rififymedia'
  },
  {
    name: 'yt',
    icon: <YoutubeSmm className="hover:fill-primary_blue"/>,
    link: 'https://www.youtube.com/channel/UCGTSwF24I3guLlSl3tvwV6w'
  },
  {
    name: 'rt',
    icon: <RutubeSmm className="hover:fill-primary_blue"/>,
    link: 'https://rutube.ru/channel/39844042/'
  },
];


const Footer = memo(() => {
  const {isTablet, isMobile} = useSizes();
  const {elementRange: elementRangeLaptop} = useSizes(1024, 1920);
  const {paddingHorizontal} = useElementRangeSize();
  const appBtnWidth = elementRangeLaptop(10.25, 12.25);
  const scrollToTop = () => {
    document.getElementById('app').scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const apps = [
    {
      name: 'apple',
      img: <AppleBtn
        style={{
          width: isMobile || isTablet ? '12.25rem' : `${appBtnWidth}rem`
        }}
        className="group-hover:fill-primary_blue max-h-[58px]"
      />
    },
    {
      name: 'rustore',
      img: <RustoreBtn
        style={{
          width: isMobile || isTablet ? '12.25rem' : `${appBtnWidth}rem`
        }}
        className="group-hover:fill-primary_blue max-h-[58px]"/>
    },
    {
      name: 'google',
      img: <GoogleBtn
        style={{
          width: isMobile || isTablet ? '12.25rem' : `${appBtnWidth}rem`
        }}
        className="group-hover:fill-primary_blue max-h-[58px]"/>
    }
  ];
  const [, navigate] = useLocation();

  return (
    <footer
      className="w-full bg-[#060708] flex flex-col relative py-8 md:pb-[3.125rem] lg:pt-[5rem] lg:pb-10  lg:gap-2.5"
      style={{
        paddingRight: `${paddingHorizontal}px`,
        paddingLeft: `${paddingHorizontal}px`
      }}>
      <div
        className="min-w-full flex flex-col md:flex-row  pb-8 justify-between md:gap-[3.25rem] lg:gap-[2.25rem]">
        <div className="flex flex-col md:gap-11 lg:gap-6 pb-5 md:pb-[unset] border-b border-dark_grey md:border-none">
          <div className="flex flex-row justify-between md:justify-start md:flex-col md:gap-6 lg:gap-2">
            <img src={logo} className="max-w-[120px] md:max-w-[152px]"/>
            <p className="text-t2Regular">Сервис аналитики<br/> для музыкантов</p>
          </div>
          {
            isMobile
              ? null
              : <div className="flex flex-col gap-0.5">
                <Link to='/documents/privacy-policy' className="text-caption_m_desk text-light_grey hover:text-medium_grey cursor-pointer" onClick={scrollToTop}>Политика
                  конфеденциальности</Link>
                <Link to='/documents/user-agreement' className="text-caption_m_desk text-light_grey hover:text-medium_grey cursor-pointer" onClick={scrollToTop}>Пользовательское
                  соглашение</Link>
                <Link to='/documents/public-offer' className="text-caption_m_desk text-light_grey  hover:text-medium_grey" onClick={scrollToTop}>Публичная оферта</Link>
              </div>
          }

        </div>
        {
          !isMobile
            ? null
            : <div className="flex justify-between py-5 md:py-[unset] border-b border-dark_grey md:border-[unset]">
              {
                icons.map((icon, i) => (
                  <a
                    className="w-10 h-10"
                    key={i} href={icon.link} target='_blank'>{icon.icon}</a>
                ))
              }
            </div>
        }
        <ShowOnLaptopToDesktop>
          <div>
            {
              platforms.map((platform, index) => (
                <div key={index} className="flex flex-col gap-5">
                  <h2 className=" text-btnText text-medium_grey">{platform.title}</h2>
                  {
                    platform.list.map((item, i) => (
                      <Link to={item.link} key={i} onClick={scrollToTop}>
                        <p className="capitalize text-t2Regular hover:text-medium_grey cursor-pointer"
                        > {item.name}</p>
                      </Link>

                    ))
                  }
                </div>
              ))
            }
          </div>
          <div>
            {
              customers.map((customer, index) => (
                <div key={index} className="flex flex-col gap-5">
                  <h2 className=" text-btnText text-medium_grey">{customer.title}</h2>
                  {
                    customer.list.map((item, i) => (
                      <Link to={item.link} key={i} onClick={scrollToTop}>
                        <p className="capitalize text-t2Regular hover:text-medium_grey cursor-pointer"
                        > {item.name}</p>
                      </Link>

                    ))
                  }
                </div>
              ))
            }
          </div>
        </ShowOnLaptopToDesktop>

        <div className="flex flex-col gap-5 py-5 md:py-[unset] border-b border-dark_grey md:border-none">
          {
            isMobile
              ? null
              : <div className="flex gap-3">
                {
                  icons.map((icon, i) => (
                    <a className=" w-10 h-10 cursor-pointer " key={i} href={icon.link} target='_blank'>
                      {icon.icon}
                    </a>
                  ))
                }
              </div>
          }
          <div className="flex flex-col gap-5">
            {
              footerInfo.map((item, i) => (
                <p
                  className={` text-t2Regular hover:text-medium_grey cursor-pointer ${i === footerInfo.length - 1 ? 'underline underline-offset-4 decoration-[#125BFF]' : ''}`}
                  key={i} onClick={() => {
                    if(item.link){
                      navigate(item.link);
                      scrollToTop()
                    }
                     return
                }}>{item.name}</p>
              ))
            }
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-3 mt-5 md:mt-[unset] ">
          {
            apps.map((app, i) => (
              <div
                key={i}
                className="group cursor-pointer "
              >
                {app.img}
              </div>
            ))
          }
        </div>
        {
          !isMobile
            ? null
            : <div className="flex flex-col gap-1 mt-6">
              <Link to='/documents/privacy-policy' className="text-caption_m_desk text-light_grey  hover:text-primary_blue" onClick={scrollToTop}>Политика
                конфеденциальности</Link>
              <Link to='/documents/user-agreement' className="text-caption_m_desk text-light_grey  hover:text-medium_grey" onClick={scrollToTop}>Пользовательское
                соглашение</Link>
              <Link to='/documents/public-offer' className="text-caption_m_desk text-light_grey  hover:text-medium_grey" onClick={scrollToTop}>Публичная оферта</Link>
            </div>
        }
      </div>
    </footer>
  );
});
export default Footer;

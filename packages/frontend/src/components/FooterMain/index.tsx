import logo from "../../assets/svg/Logo.svg";
import yellow from "../../assets/png/yellowLogo@3x.png";
import apple from "../../assets/png/appple@3x.png";
import rustore from "../../assets/png/rustore@3x.png";
import google from "../../assets/png/google@3x.png";
import {useSizes} from "../../hooks/useSizes.js";
import {useElementRangeSize} from "../../hooks/useElementRangeSize.js";
import bottomImg from '../../assets/png/bottomImg@3x.png'
import bottomImgMob from '../../assets/png/bottom-mob@3x.png'
import {memo} from "react";

const footerItems = [
  {
    title: 'платформы',
    list: [
      {
        name: 'Apple Music'
      },
      {
        name: 'Instagram'
      },
      {
        name: 'TikTok'
      },
      {
        name: 'YouTube'
      },
      {
        name: 'Shazam'
      },
      {
        name: 'Traxsource'
      },
      {
        name: 'iTunes'
      },
      {
        name: 'SoundCloud'
      },
      {
        name: 'Facebook'
      },
    ]
  },
  {
    title: 'кейсы',
    list: [
      {
        name: 'исполнители'
      },
      {
        name: 'лейблы'
      },
      {
        name: 'дестрибьюторы'
      },
      {
        name: 'промоутеры'
      },
      {
        name: 'менеджеры'
      },
      {
        name: 'пресс-агенты'
      },
      {
        name: 'A&Rs'
      },
      {
        name: 'разроботчики'
      },
      {
        name: 'букинг-агенты'
      },
    ]
  },
]
const footerInfo = [
  {
    name: 'Тарифы'
  },
  {
    name: 'Контакты'
  },
  {
    name: "Политика конфиденциальности"
  },
  {
    name: 'Пользовательское соглашение'
  },
  {
    name: 'Реквизиты'
  },
  {
    name: 'API'
  },
  {
    name: 'Попробовать бесплатно'
  },
]
const apps = [
  {
    name: 'apple',
    img: apple
  },
  {
    name: 'rustore',
    img: rustore
  },
  {
    name: 'google',
    img: google
  },
]
const Footer = memo(() => {
  const {elementRange, isTablet, isMobile} = useSizes();
  const {elementRange: elementRangeLaptop} = useSizes(1024, 2560);
  const {elementRange: elementRangeMobile} = useSizes(320, 1023);
  const logoWidth = elementRangeLaptop(135 / 2, 227);
  const yellowWidth = elementRange(35, 84);
  const appWidth = elementRangeLaptop(110, 218);
  const paddingTopFooter = elementRangeLaptop(47, 125);
  const paddingBottomFooter = elementRange(54, 225);
  const gapFooterHorizontal = elementRangeLaptop(50, 230);
  const gapFooterVertical = elementRangeLaptop(20, 40);
  const gapFooterGridMobile = elementRangeMobile(32, 63);
  const gapFooterMobile = elementRangeMobile(32, 77);
  const textFooter = elementRangeLaptop(14, 28);
  const textFooterMobile = elementRangeLaptop(14, 28);
  const topPositionImage = elementRangeLaptop(63, 87);
  const topPositionImageMobile = elementRangeMobile(32, 88);
  const marginLeftYellowText = elementRangeMobile(7, 231);
  const {paddingHorizontal} = useElementRangeSize()


  return (
    <footer className='w-full  bg-[#060708] flex flex-col lg:flex-row relative'
            style={{
              paddingRight: `${paddingHorizontal}px`,
              paddingLeft: `${paddingHorizontal}px`,
              paddingBottom: `${paddingBottomFooter}px`,
              paddingTop: `${paddingTopFooter}px`,
              gap: isMobile || isTablet ? `${gapFooterMobile}px` : '0px',
            }}>
      <div
        className='w-full lg:w-1/4  flex lg:flex-col items-center lg:items-start'
        style={{gap: isMobile || isTablet ? `${gapFooterGridMobile}px` : `${gapFooterVertical}px`,}}>
        <img src={logo} alt='logo' style={{
          width: `${logoWidth}px`,
        }}/>
        <div className='flex items-center justify-center'>
          <img src={yellow} style={{width: `${yellowWidth}px`}}/>

        </div>
        <p className='text-[#e4fd44] ' style={{
          fontSize: isMobile || isTablet ? `${textFooterMobile}px` : `${textFooter}px`,
          marginLeft: isTablet || isMobile ? `${marginLeftYellowText}px` : '0px'
        }}>Сервис аналитики<br/> для музыкантов</p>
      </div>
      <div
        style={{
          marginRight: isMobile || isTablet ? '0px' : `${paddingHorizontal}px`,
          marginLeft: isMobile || isTablet ? '0px' : `${paddingHorizontal}px`,
          gap: `${gapFooterHorizontal}px`
        }}
        className='grid grid-cols-2 grid-rows-2 lg:flex w-full lg:justify-center'>
        {
          footerItems.map((itemList, iList) => (
            <ul key={iList} className='flex flex-col' style={{
              gap: `${gapFooterVertical}px`,
            }}>
              <p className='font-bold text-[#a1a4ad] capitalize'
                 style={{fontSize: `${textFooter}px`}}>{itemList.title}</p>
              {
                itemList.list.map((item, i) => (
                  <p key={i} className='text-[#5d6674] text-[28px] capitalize'
                     style={{fontSize: `${textFooter}px`}}>{item.name}</p>
                ))
              }
            </ul>
          ))
        }
        <ul className='flex flex-col max-w-[250px]' style={{gap: `${gapFooterVertical}px`}}>
          {
            footerInfo.map((item, i) => (
              <li key={i}
                  className={`font-bold  cursor-pointer ${i === footerInfo.length - 1 ? 'text-[white] underline underline-offset-4 decoration-blue mt-[20px]' : 'text-[#a1a4ad]'}`}
                  style={{fontSize: isMobile || isTablet ? `${textFooterMobile}px` : `${textFooter}px`}}>{item.name}</li>
            ))
          }
        </ul>
        <ul className='flex flex-col' style={{gap: `${gapFooterVertical}px`}}>
          {
            apps.map((app, i) => (
              <img
                key={i}
                style={{
                  width: `${appWidth}px`,
                }}
                src={app.img}
                alt={app.name}
              />
            ))
          }
        </ul>
      </div>
      <img src={isMobile || isTablet ? bottomImgMob : bottomImg} className='absolute w-full left-0 -z-20 '
           style={{top: isMobile || isTablet ? `-${topPositionImageMobile}%` : `-${topPositionImage}%`}}/>
    </footer>
  )
})
export default Footer

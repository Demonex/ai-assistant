import imgSocials from '/assets/png/SOCIALZ_2@3x.png'
import redMarker from '/assets/png/redMarker.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {memo} from "react";

const Socials = memo(() => {
  const {h1Size, h1SizeMobile, marginVertical, paddingHorizontal} = useElementRangeSize();
  const {elementRange, isTablet, isMobile} = useSizes();
  const imgSocialsSize = elementRange(280, 602);

  return (
    <div
        style={{
            marginBottom: `${marginVertical}px`,
            marginTop: `${marginVertical}px`,
            paddingLeft:`${paddingHorizontal}px`,
            paddingRight:`${paddingHorizontal}px`,
        }}
        className='flex flex-col lg:flex-row-reverse lg:justify-between lg:items-center w-full gap-[3.125rem]'>
      <div className='w-full'>
        <h1
          style={{
            fontSize: isTablet || isMobile ? `${h1SizeMobile}px`: `${h1Size}px`,
          }}
          className='font-bold lg:font-black text-h2Desctop'>Вся
            <span className='relative'>
                &nbsp;информация &nbsp;
                <img src={redMarker} className='absolute right-0 top-2/3 -z-10'/>
            </span>
            {isTablet || isMobile ? null : <br/>}
            по трекам из плейлистов,&nbsp;{isTablet || isMobile ? null : <br/>}чартов, стриминговых&nbsp;{isTablet || isMobile ? null : <br/>}сервисов и&nbsp;соцсетей</h1>
      </div>
      <div className=' flex flex-col gap-5 w-full'  >
        <img src={imgSocials}
             style={{
               width:  isTablet || isMobile ? '100%' : `${imgSocialsSize}px`
        }}/>
          <span className='text-medium_grey text-xs leading-[19.5px] lg:w-5/6'>*компания Meta Platforms Inc., владеющая Facebook и Instagram, внесена в реестр экстремистских организаций, ее деятельность в России по поддержанию указанных соцсетей признана экстремистской деятельностью</span>
      </div>
    </div>
  )
})
export default Socials

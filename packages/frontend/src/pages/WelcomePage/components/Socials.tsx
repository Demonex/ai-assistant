import imgSocials from '../../../assets/png/SOCIALZ_2@3x.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {memo} from "react";

const Socials = memo(() => {
  const {h1Size, h1SizeMobile} = useElementRangeSize();
  const {elementRange, isTablet, isMobile} = useSizes();
  const imgSocialsSize = elementRange(280, 1200);

  return (
    <div className='flex flex-col lg:flex-row justify-between items-center w-full'>
      <div className='w-full'>
        <h1
          style={{
            fontSize: isTablet || isMobile ? `${h1SizeMobile}px`: `${h1Size}px`,
            lineHeight: '120%'
          }}
          className='font-bold'>Вся информация<br/> по трекам{isTablet || isMobile ? <br/> : null} из плейлистов,<br/> чартов, стриминговых<br/> сервисов и&nbsp;соцсетей</h1>
      </div>
      <div className='w-fit'  >
        <img src={imgSocials}
             style={{
               width:  isTablet || isMobile ? '100%' : `${imgSocialsSize}px`
        }}/>
      </div>
    </div>
  )
})
export default Socials

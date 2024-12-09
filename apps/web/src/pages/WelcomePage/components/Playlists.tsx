import imgPlaylists from '/assets/png/plalistsNew.png'
import greenMarker from '/assets/png/greenMarker.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {memo} from "react";

const Playlists = memo(() => {
  const {h1Size, h1SizeMobile, marginVertical, paddingHorizontal} = useElementRangeSize();
  const {elementRange, isTablet, isMobile} = useSizes();
  const imgSocialsSize = elementRange(280, 960);

  return (
    <div
        style={{
            marginBottom: `${marginVertical}px`,
            marginTop: `${marginVertical}px`,
            paddingLeft:`${paddingHorizontal}px`,
            paddingRight:`${paddingHorizontal}px`,
        }}
        className='flex flex-col lg:flex-row lg:justify-between lg:items-center w-full gap-[2.5rem] md:gap-[3.125rem]'>
      <div className=''>
        <h1
          style={{
            fontSize:  isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
          }}
          className='font-bold lg:font-black text-h2Desctop'>Советы
            <span className='relative'>
                &nbsp;топовых&nbsp;
                <img src={greenMarker} className='absolute right-0 -bottom-1 md:-bottom-3 -z-10'/>
            </span>
            <br/>
            кураторов плейлистов<br/> для твоих треков  </h1>
      </div>
      <div className=' '>
          <img src={imgPlaylists} style={{width: isMobile || isTablet ? '100%' :`${imgSocialsSize}px`}}/>
      </div>
    </div>
  )
})
export default Playlists

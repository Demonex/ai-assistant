import imgPlaylists from '../../../assets/png/plalistsImg.png'
import imgPlaylistsMob from '../../../assets/png/playlists-mob.png'
import {useElementRangeSize} from "../../../hooks/useElementRangeSize.js";
import {useSizes} from "../../../hooks/useSizes.js";
import {memo} from "react";

const Playlists = memo(() => {
  const {h1Size, h1SizeMobile} = useElementRangeSize();
  const {elementRange, isTablet, isMobile} = useSizes();
  const imgSocialsSize = elementRange(280, 994);

  return (
    <div className='flex flex-col lg:flex-row justify-between items-center w-full'>
      <div className=''>
        <h1
          style={{
            fontSize:  isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
            lineHeight: '120%'

          }}
          className='font-bold'>Советы топовых<br/> кураторов плейлистов{ isTablet || isMobile ? null :<br/>} для {isTablet || isMobile ?
          <br/> : null} твоих треков  </h1>
      </div>
      <div className='w-fit mt-12'>
        {
          isTablet || isMobile
            ? <img src={imgPlaylistsMob} style={{width: `100%`}}/>
            : <img src={imgPlaylists} style={{width: `${imgSocialsSize}px`}}/>
        }
      </div>
    </div>
  )
})
export default Playlists

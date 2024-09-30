import {buildStyles, CircularProgressbarWithChildren} from "react-circular-progressbar";
import React, {memo} from "react";
import {useOpenMobileSidebar} from "../hooks/useOpenMobileSidebar.js";
import {useArtistProfile} from "../hooks/useArtistProfile.js";
import reload from "/assets/svg/reload_icon.svg";
import PrimaryButton from "../../../components/PrimaryButton.js";

const ArtistMobileHeader = memo(() => {
  const {setOpenMobileSidebar} = useOpenMobileSidebar();
  const {data: artistProfile} = useArtistProfile();
  return (
    <div className='w-full flex justify-between items-center py-4'>
      <div className='flex items-center gap-4' onClick={() => setOpenMobileSidebar(true)}>
        <CircularProgressbarWithChildren
          value={80}
          strokeWidth={2}
          styles={buildStyles({
            trailColor: '#0c0c0c',
            pathColor: '#E4FF29',
          })} className='w-[3.75rem] h-[3.75rem]'>
          <div
            className="w-[3rem] h-[3rem] bg-cover bg-center bg-no-repeat rounded-full relative"
            style={{
              backgroundImage: `url(${artistProfile?.account?.imageUrl})`
            }}/>
        </CircularProgressbarWithChildren>
        <p className='text-t1Semi_deck'>{artistProfile?.account?.name}</p>
      </div>
      <div>
        <PrimaryButton
          titleClassName='text-caption_m_desk text-light_grey'
          className='px-6 py-4 border border-solid border-medium_grey rounded-xl hidden md:flex'
          title='Обновить'
          isIcon={true}
          icon={reload}/>
        <img src={reload} className='w-10 md:hidden'/>
      </div>
    </div>

  )
})
export default ArtistMobileHeader;
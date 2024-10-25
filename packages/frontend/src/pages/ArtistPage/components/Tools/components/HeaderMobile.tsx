import React, {memo} from "react";
import {buildStyles, CircularProgressbarWithChildren} from "react-circular-progressbar";
import {useOpenMobileSidebar} from "../../../hooks/useOpenMobileSidebar.js";
import {useArtistProfile} from "../../../hooks/useArtistProfile.js";

const HeaderMobileTools = memo(() => {
  const {setOpenMobileSidebar} = useOpenMobileSidebar();
  const {data: artistProfile} = useArtistProfile();
  return (
    <div className='w-full flex justify-between items-center py-4 border-b border-secondary_dark_gray/50 px-4 md:px-8'>
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
    </div>
  )
})
export default HeaderMobileTools

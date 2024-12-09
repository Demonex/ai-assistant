import React, {memo} from "react";
import {useGetTracks} from "../../../hooks/useGetTracks.js";
import SecondaryCloseIcon from "../../../../../assets/SecondaryCloseIcon.js";
import SecondaryButton from "../../../../../components/SecondaryButton.js";

const RequestSent = memo(() => {
  const {selectedTrack, setOpenPopUp, buttonHandling} = useGetTracks();
  return (
    <div className='flex flex-col gap-5'>
      <div>
        <button className='w-full flex justify-end' onClick={() => setOpenPopUp(false)}>
          <SecondaryCloseIcon className='w-7 h-7 stroke-white'/>
        </button>
        <h1 className='text-t1Semi_deck'>{ buttonHandling === 'delete' ? 'Запрос отправлен' : buttonHandling === 'report' ? 'Загрузка завершена' : 'Ссылка добавлена'}</h1>
      </div>
      <ul className='flex flex-col gap-5'>
        {
          selectedTrack.map((track, index) => (
            <>
              <li key={index} className='w-full flex flex-col gap-5'>
                <div className='flex gap-4'>
                  <img src={track?.imageUrl} className='w-11 h-11 rounded-full'/>
                  <div>
                    <h2 className='text-t2Regular'>{track?.trackName}</h2>
                    <p className='text-caption_s_desk text-medium_grey'>
                      {
                        track?.artistLinks.map((artist, indexArtist) => (
                          <span>{indexArtist !== track?.artistLinks - 1 ? `${artist.text}, ` : artist.text}</span>
                        ))
                      }
                    </p>
                  </div>
                </div>
              </li>
            </>
          ))
        }
      </ul>
      <div className=''>
        <SecondaryButton title='Закрыть' className='w-full bg-primary_blue border-none' onClick={() => setOpenPopUp(false)}/>
      </div>
    </div>
  )
})
export default RequestSent
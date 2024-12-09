import React, {memo, useState} from "react";
import {useGetTracks} from "../../../hooks/useGetTracks.js";
import RequestSent from "./RequestSent.js";
import SecondaryCloseIcon from "../../../../../assets/SecondaryCloseIcon.js";
import SecondaryButton from "../../../../../components/SecondaryButton.js";

const DeleteTrackLink = memo(() => {
  const {selectedTrack, setOpenPopUp, isRequestSent,setIsRequestSent} = useGetTracks();
  const [deleteOption, setDeleteOption] = useState('');
  return (
    <>
      {
        isRequestSent
          ? <RequestSent/>
          : <div className='flex flex-col gap-5'>
            <div>
              <button className='w-full flex justify-end' onClick={() => setOpenPopUp(false)}>
                <SecondaryCloseIcon className='w-7 h-7 stroke-white'/>
              </button>
              <h1 className='text-t1Semi_deck'>Запрос на удаление ссылки</h1>
            </div>
            <ul className='flex flex-col gap-5'>
              {
                selectedTrack.map((track, index) => (
                  <li key={index} className='w-full flex flex-col gap-5'>
                    <div className='flex gap-4'>
                      <img src={track?.imageUrl} className='w-11 h-11 rounded-full'/>
                      <div>
                        <h2 className='text-t2Regular'>{track?.trackName}</h2>
                        <p className='text-caption_s_desk text-medium_grey'>
                          {
                            track?.artistLinks.map((artist, indexArtist) => (
                              <span key={index}>{indexArtist !== track?.artistLinks - 1 ? `${artist.text}, ` : artist.text}</span>
                            ))
                          }
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
            <p className='text-caption_r_desk text-medium_grey'>Если ты считаешь, что данный трек или одна из ссылок на
              него
              добавлены ошибочно, ты можешь отправить нам запрос на удаление. Запрос будет рассмотрен в течение 3
              дней.</p>
            <div className='flex flex-col gap-4'>
              <h2 className='text-t2Regular text-light_grey'>Что нужно удалить?<span
                className='text-secondary_red'> *</span>
              </h2>
              <div className='flex flex-col gap-3'>
                <div className='flex gap-2 items-center'>
                  <button
                    onClick={() => setDeleteOption('deleteTrackWithAllLinks')}
                    className='w-[18px] h-[18px] border border-solid border-secondary_dark_gray rounded-full flex justify-center items-center'>
                    <div
                      className={`bg-primary_blue w-2.5 h-2.5 rounded-full ${deleteOption === 'deleteTrackWithAllLinks' ? 'block' : 'hidden'}`}/>
                  </button>
                  <p className='text-caption_r_desk text-light_grey'>Трек со всеми ссылками</p>
                </div>
                <div className='flex gap-2 flex-col'>
                  <div className='flex gap-2 items-center'>
                    <button onClick={() => setDeleteOption('deleteOnlyOneLink')}
                            className='w-[18px] h-[18px] border border-solid border-secondary_dark_gray rounded-full flex justify-center items-center'>
                      <div
                        className={`bg-primary_blue w-2.5 h-2.5 rounded-full ${deleteOption === 'deleteOnlyOneLink' ? 'block' : 'hidden'}`}/>
                    </button>
                    <p className='text-caption_r_desk text-light_grey'>Одну ссылку на трек</p>
                  </div>
                  {
                    deleteOption === 'deleteOnlyOneLink' && (
                      <div>
                        <label className='text-caption_m_desk text-medium_grey'>Ссылка на трек <span
                          className='text-secondary_red'>*</span></label>
                        <input
                          placeholder='https://'
                          className='w-full p-3.5 border border-solid border-secondary_dark_gray rounded-xl placeholder:text-medium_grey mt-1.5 text-caption_r_desk'
                        />
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            <div className='flex  gap-3.5'>
              <SecondaryButton title='Отмена' className='w-full'/>
              <SecondaryButton
                onClick={() => setIsRequestSent(true)}
                title='Удалить'
                className='w-full bg-medium_grey border-none text-white'/>
            </div>
          </div>
      }
    </>

  )
})
export default DeleteTrackLink
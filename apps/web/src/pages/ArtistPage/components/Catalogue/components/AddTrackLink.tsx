import React, {memo, useState} from "react";
import {useGetTracks} from "../../../hooks/useGetTracks.js";
import {useForm} from "react-hook-form";
import RequestSent from "./RequestSent.js";
import SecondaryCloseIcon from "../../../../../assets/SecondaryCloseIcon.js";
import validator from "validator";
import SecondaryButton from "../../../../../components/SecondaryButton.js";

const AddTrackLink = memo(() => {
  const {selectedTrack, setOpenPopUp, isRequestSent, setIsRequestSent} = useGetTracks();
  const [inputValue, setInputValue] = useState('');
  const {
    register,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: {errors}
  } = useForm();
  const onSubmit = (data) => {
    setIsRequestSent(true);
  }
  return (
    <>
      {
        isRequestSent
          ? <RequestSent/>
          : <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <button className='w-full flex justify-end' onClick={() => setOpenPopUp(false)}>
                <SecondaryCloseIcon className='w-7 h-7 stroke-white'/>
              </button>
              <h1 className='text-t1Semi_deck'>Добавить ссылку на трек</h1>
            </div>
            <ul className='flex flex-col gap-5'>
              {
                selectedTrack.map((track, index) => (
                  <div key={index} >
                    <li className='w-full flex flex-col gap-5'>
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
                  </div>
                ))
              }
              <div>
                <label className='text-caption_m_desk text-medium_grey'>Ссылка на трек <span
                  className='text-secondary_red'>*</span></label>
                <input
                  placeholder='https://'
                  className='w-full p-3.5 border border-solid border-secondary_dark_gray rounded-xl placeholder:text-medium_grey mt-1.5 text-caption_r_desk'
                  {...register('addTrackLink', {
                    required: 'Input store URL',
                    validate: (value) => validator.isFQDN(value) || validator.isURL(value) || 'Неверный формат ссылки',
                  })}
                  onChange={({target: {value}}) => {
                    setValue('addTrackLink', value);
                    clearErrors('addTrackLink');
                  }}
                />
                {
                  errors.addTrackLink && (
                    <p className='text-secondary_red text-caption_m_desk mt-1.5'>{String(errors.addTrackLink.message)}</p>
                  )
                }
              </div>
            </ul>
            <div className='flex  gap-3.5'>
              <SecondaryButton title='Отмена' className='w-full'/>
              <SecondaryButton
                type='submit'
                title='Добавить'
                className='w-full bg-primary_blue border-none text-white'/>
            </div>
          </form>
      }
    </>
  )
})
export default AddTrackLink;
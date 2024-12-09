import React, {memo, useState} from "react";
import {useGetTracks} from "../../../hooks/useGetTracks.js";
import RequestSent from "./RequestSent.js";
import SecondaryCloseIcon from "../../../../../assets/SecondaryCloseIcon.js";
import SecondaryButton from "../../../../../components/SecondaryButton.js";

const DownloadReport = memo(() => {
  const {setOpenPopUp, selectedTrack, setIsRequestSent, isRequestSent} = useGetTracks();
  const [reportFormat, setReportFormat] = useState('');
  const [downloading, setIsDownloading] = useState(false);
  const downloadAnimation = () => {
    setIsDownloading(true)
    setTimeout(() => {
      setIsRequestSent(true)
    }, 6000)
  }
  return (
    <>
      {
        isRequestSent
          ? <RequestSent/>
          : <>
            {
              downloading
                ? <div className='flex flex-col'>
                  <div>
                    <button className='w-full flex justify-end' onClick={() => setOpenPopUp(false)}>
                      <SecondaryCloseIcon className='w-7 h-7 stroke-white'/>
                    </button>
                  </div>
                  <div className='flex flex-col gap-4'>
                    <div
                      className='w-full h-[60px] relative animate-[p4_6s_infinite_steps(10)] rounded-[3px] progress_download-report'/>
                    <h1 className='text-t1Semi_deck'>Идет загрузка...</h1>
                    <p className='text-caption_r_desk text-medium_grey'>Это займет не более минуты</p>
                  </div>
                </div>
                : <div className='flex flex-col gap-5'>
                  <div>
                    <button className='w-full flex justify-end' onClick={() => setOpenPopUp(false)}>
                      <SecondaryCloseIcon className='w-7 h-7 stroke-white'/>
                    </button>
                    <h1 className='text-t1Semi_deck'>Скачать отчёт</h1>
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
                                    <span key={indexArtist}>{indexArtist !== track?.artistLinks - 1 ? `${artist.text}, ` : artist.text}</span>
                                  ))
                                }
                              </p>
                            </div>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                  <div className='flex flex-col gap-4'>
                    <h2 className='text-t2Regular text-light_grey'>Предпочитаемый формат<span
                      className='text-secondary_red'> *</span>
                    </h2>
                    <div className='flex flex-col gap-3'>
                      <div className='flex gap-2 items-center'>
                        <button
                          onClick={() => setReportFormat('deleteTrackWithAllLinks')}
                          className='w-[18px] h-[18px] border border-solid border-secondary_dark_gray rounded-full flex justify-center items-center'>
                          <div
                            className={`bg-primary_blue w-2.5 h-2.5 rounded-full ${reportFormat === 'deleteTrackWithAllLinks' ? 'block' : 'hidden'}`}/>
                        </button>
                        <p className='text-caption_r_desk text-light_grey'>PDF</p>
                      </div>
                      <div className='flex gap-2 flex-col'>
                        <div className='flex gap-2 items-center'>
                          <button
                            onClick={() => setReportFormat('deleteOnlyOneLink')}
                            className='w-[18px] h-[18px] border border-solid border-secondary_dark_gray rounded-full flex justify-center items-center'>
                            <div
                              className={`bg-primary_blue w-2.5 h-2.5 rounded-full ${reportFormat === 'deleteOnlyOneLink' ? 'block' : 'hidden'}`}/>
                          </button>
                          <p className='text-caption_r_desk text-light_grey'>CSV</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex  gap-3.5'>
                    <SecondaryButton title='Отмена' className='w-full'/>
                    <SecondaryButton
                      onClick={downloadAnimation}
                      title='Скачать'
                      className='w-full bg-medium_grey border-none text-white'/>
                  </div>
                </div>
            }
          </>
      }
    </>

  )
})
export default DownloadReport;
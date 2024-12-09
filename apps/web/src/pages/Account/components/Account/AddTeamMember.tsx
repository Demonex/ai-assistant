import React, {Fragment, memo, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import SecondaryCloseIcon from "../../../../assets/SecondaryCloseIcon.js";
import SecondaryButton from "../../../../components/SecondaryButton.js";

const AddTeamMember = memo(({openModalAdd, setOpenModalAdd}: any) => {
  const [sendRequest, setSendRequest] = useState(false);
  return (
    <Transition appear show={openModalAdd} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-40 overflow-y-auto" onClose={() => setOpenModalAdd(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/85 w-full h-full flex justify-center items-center "/>
        </Transition.Child>
        <div className="w-full h-full flex justify-center items-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {
              sendRequest
              ? <Dialog.Panel
                  className="h-full md:h-fit bg-popup_gray lg:my-20 p-4 md:py-8 lg:p-10 md:px-8  lg:mx-auto md:rounded-[20px] z-50 relative w-full lg:w-fit md:max-w-[35rem]"
                >
                  <div className='w-full flex justify-end cursor-pointer' onClick={() => setOpenModalAdd(false)}>
                    <SecondaryCloseIcon className='stroke-white'/>
                  </div>
                  <div className='flex flex-col gap-5'>
                    <h1 className='text-t1Semi_deck pb-4'>Приглашение отправлено.</h1>
                    <div className='flex justify-center'>
                      <SecondaryButton title='Хорошо' className='bg-primary_blue border-none text-white w-full md:w-fit' onClick={() => setOpenModalAdd(false)}/>
                    </div>
                  </div>
                </Dialog.Panel>
                : <Dialog.Panel
                  className="h-full md:h-fit bg-popup_gray lg:my-20 p-4 md:py-8 lg:p-10 md:px-8 lg:mx-auto md:rounded-[20px] z-50 relative w-full lg:w-fit md:max-w-[35rem]"
                >
                  <div className='w-full flex justify-end cursor-pointer' onClick={() => setOpenModalAdd(false)}>
                    <SecondaryCloseIcon className='stroke-white'/>
                  </div>
                  <div className='flex flex-col gap-5'>
                    <h1 className='text-t1Semi_deck pb-4'>Добавить участника</h1>
                    <div className='flex flex-col gap-4'>
                      <p className='text-caption_r_desk text-medium_grey'>Укажи email нового участника. Мы вышлем ему
                        приглашение.</p>
                      <div>
                        <label className='text-caption_m_desk text-medium_grey'>Email <span
                          className='text-secondary_red'>*</span></label>
                        <input
                          placeholder='example@gmail.com'
                          className='px-3.5 py-2.5 border border-solid w-full border-secondary_dark_gray rounded-xl placeholder:text-caption_r_desk text-caption_r_desk placeholder:text-medium_grey mt-1.5'/>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <input
                          // onChange={(e) => handleChecked(index, e.target.checked)}
                          type='checkbox'
                          className='min-w-[1.125rem] h-[1.125rem] border border-solid border-secondary_dark_gray rounded-sm bg-popup_gray'/>
                        <p className='text-caption_r_desk text-medium_grey'>Добавить во все подписки</p>
                      </div>
                    </div>
                    <div className='flex gap-4'>
                      <SecondaryButton title='Отмена' className='w-full' onClick={() => setOpenModalAdd(false)}/>
                      <SecondaryButton
                        title='Отправить'
                        onClick={() => setSendRequest(true)}
                        className='w-full bg-primary_blue border-none text-white'/>
                    </div>
                  </div>
                </Dialog.Panel>
            }
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
})
export default AddTeamMember
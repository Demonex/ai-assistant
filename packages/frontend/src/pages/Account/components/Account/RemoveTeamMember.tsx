import React, {Fragment, memo, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import SecondaryCloseIcon from "../../../../assets/SecondaryCloseIcon.js";
import SecondaryButton from "../../../../components/SecondaryButton.js";

const RemoveTeamMember = memo(({openModalRemove, setOpenModalRemove}: any) => {
  const [sendRequestRemoving, setSendRequestRemoving] = useState(false);
  return (
    <Transition appear show={openModalRemove} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-40 overflow-y-auto" onClose={() => setOpenModalRemove(false)}>
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
              sendRequestRemoving
              ? <Dialog.Panel
                  className="h-full md:h-fit bg-popup_gray lg:my-20 p-4 md:py-8 lg:p-10 md:px-8  lg:mx-auto md:rounded-[20px] z-50 relative w-full  md:max-w-[35rem]"
                >
                  <div className='w-full flex justify-end cursor-pointer' onClick={() => setOpenModalRemove(false)}>
                    <SecondaryCloseIcon className='stroke-white'/>
                  </div>
                  <div className='flex flex-col gap-5'>
                    <h1 className='text-t1Semi_deck pb-4'>Участник удалён.</h1>
                    <div className='flex justify-center'>
                      <SecondaryButton title='Хорошо' className='bg-primary_blue border-none text-white w-full' onClick={() => setOpenModalRemove(false)}/>
                    </div>
                  </div>
                </Dialog.Panel>
                : <Dialog.Panel
                  className="h-full md:h-fit bg-popup_gray lg:my-20 p-4 md:py-8 lg:p-10 md:px-8  md:mx-auto md:rounded-[20px] z-50 relative w-full lg:w-fit md:max-w-[35rem]"
                >
                  <div className='w-full flex justify-end cursor-pointer' onClick={() => setOpenModalRemove(false)}>
                    <SecondaryCloseIcon className='stroke-white'/>
                  </div>
                  <div className='flex flex-col gap-5'>
                    <h1 className='text-t1Semi_deck pb-4'>Ты действительно хочешь удалить участника login2?</h1>
                    <div className=' pb-4'>
                      <p className='text-caption_r_desk text-medium_grey'>Он потеряет доступ к данным.</p>
                    </div>
                    <div className='flex gap-4'>
                      <SecondaryButton title='Отмена' className='w-full' onClick={() => setOpenModalRemove(false)}/>
                      <SecondaryButton
                        title='Удалить'
                        onClick={() => setSendRequestRemoving(true)}
                        className='w-full bg-secondary_red border-none text-white'/>
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
export default RemoveTeamMember
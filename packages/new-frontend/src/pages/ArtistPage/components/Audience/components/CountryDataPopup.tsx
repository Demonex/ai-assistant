import React, {Fragment, memo} from "react";
import {Dialog, Transition} from "@headlessui/react";
import SecondaryCloseIcon from "../../../../../assets/SecondaryCloseIcon.js";
import {useManageTable} from "../hooks/useManageTable.js";


const CountryDataPopup = memo(() => {
  const {openModal, setOpenModal, dataPopup} = useManageTable();
  console.log('dataPopup', dataPopup)
  return (
    <Transition appear show={openModal} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-40" onClose={() => setOpenModal(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/85 w-full h-full flex justify-center items-center"/>
        </Transition.Child>
        <div className="">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-popup_gray my-20 p-10 mx-auto rounded-[20px] z-50 relative max-w-fit">
              <div className='w-full flex justify-end'>
                <SecondaryCloseIcon className='stroke-white'/>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
})
export default CountryDataPopup
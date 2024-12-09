import React, {Fragment, memo} from "react";
import {Dialog, Disclosure, Transition} from "@headlessui/react";
import SecondaryCloseIcon from "../../../../assets/SecondaryCloseIcon.js";
import '../style.css'
import SecondaryButton from "../../../../components/SecondaryButton.js";
import {useSubscriptionCalculator} from '../hooks/useSubscriptionCalculator.js';
const subscriptionTitles = [
  {
    title: 'Наименование подписки'
  },
  {
    title: 'Длительность'
  },
  {
    title: 'Дата окончания'
  },
  {
    title: 'Свободные слоты'
  },
]
const subscriptions = [
  {
    name: 'Лейбл (до 10 артистов)',
    period: '12 месяцев',
    endDate: '01.04.2025',
    availableSlots: 7
  },
  {
    name: 'Лейбл (до 5 артистов)',
    period: '6 месяцев',
    endDate: '01.04.2025',
    availableSlots: 1
  },
]
const AddSubscription = memo(() => {
  const {openAddSubscription, setOpenAddSubscription, setOpenModal} = useSubscriptionCalculator();
  return (
    <Transition appear show={openAddSubscription} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-40 overflow-y-auto" onClose={() => setOpenAddSubscription(false)}>
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
            <Dialog.Panel
              className=" bg-popup_gray lg:my-20 p-4 md:py-8 lg:py-10 md:px-8 lg:px-[3.75rem] lg:mx-auto lg:rounded-[20px] z-50 relative w-full lg:w-fit max-w-[53.7rem]"
            >
              <div className='w-full flex justify-end cursor-pointer' onClick={() => setOpenAddSubscription(false)}>
                <SecondaryCloseIcon className='stroke-white'/>
              </div>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                  <h1 className='text-t1Semi_deck'>Подписка на</h1>
                  <p className='text-caption_r_desk text-medium_grey'>У тебя есть свободные слоты в действующих подписках. Можем воспользоваться одним из них либо оформить новую подписку.</p>
                </div>
                <div className='flex flex-col gap-4 '>
                  <div className='w-full rounded-t-[20px] overflow-hidden'>
                    <table className='border-b border-secondary_dark_gray'>
                      <thead>
                      <tr className="bg-[#48484840]/25">
                        <th className="py-5 px-4 text-start  text-btnText"/>
                        {
                          subscriptionTitles.map((title, index) => (
                            <th className="py-5 px-4 text-start  text-btnText" key={index}>
                              {title.title}
                            </th>
                          ))
                        }
                      </tr>
                      </thead>
                      <tbody className="divide-y divide-secondary_dark_gray">
                      {
                        subscriptions.map((item, indexItem) => (
                          <tr className={""} key={indexItem}>
                            <td
                              className={"p-4 text-caption_r_desk "}>
                              <input type='radio' className='bg-popup_gray border border-solid border-secondary_dark_gray' name='subscriptions' />
                            </td>
                            <td className="p-4 text-start flex items-center gap-2.5 min-w-[15rem] text-t2Regular">
                              {item.name}
                            </td>
                            <td
                              className={"p-4 text-caption_r_desk "}>{item.period}</td>
                            <td
                              className={"p-4 text-caption_r_desk "}>{item.endDate}</td>
                            <td
                              className={"p-4 text-caption_r_desk "}>{item.availableSlots}
                            </td>
                          </tr>
                        ))
                      }
                      <tr>
                        <td
                          className={"p-4 text-caption_r_desk "}>
                          <input type='radio' className='bg-popup_gray border border-solid border-secondary_dark_gray' name='subscriptions'/>
                        </td>
                        <td className={"p-4 text-t2Regular "}>Новая подписка</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='mt-6 flex flex-col gap-6'>
                <div className='w-full flex justify-between gap-3.5'>
                  <SecondaryButton title='Отмена' className='w-full' onClick={() => setOpenAddSubscription(false)}/>
                  <SecondaryButton title='Продолжить' className='w-full bg-medium_grey text-white border-none' onClick={() => {
                    setOpenAddSubscription(false);
                    setOpenModal(true)
                  }}/>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
})
export default AddSubscription

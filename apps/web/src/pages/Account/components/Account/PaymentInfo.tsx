import React, {memo} from "react";
import InfoIcon from "../../../../assets/InfoIcon.js";
import SecondaryButton from "../../../../components/SecondaryButton.js";
import {DownloadIcon} from "../../../../assets/DownloadIcon.js";
import {useSubscriptionCalculator} from "../hooks/useSubscriptionCalculator.js";
import SubscriptionsCalculator from "./SubscriptionsCalculator.js";
import {ShowOnMobileOnly} from "../../../../components/Sizes/ShowOnMobileOnly/ShowOnMobileOnly.js";

const tableHeaders = [
  {
    title: 'Дата списания'
  },
  {
    title: 'Наименование подписки'
  },
  {
    title: 'Сумма'
  },
  {
    title: 'Скачать чек'
  },
]
const subscriptions = [
  {
    prolongDate: '22.10.2024',
    name: 'Dua Lipa',
    sum: '690p',

  },
  {
    prolongDate: '22.10.2024',
    name: 'Dua Lipa',
    sum: '690p',

  },
]
const PaymentInfo = memo(() => {
  const {setOpenModal} = useSubscriptionCalculator();
  return (
    <>
      <h1 className='text-t1Semi_ipad lg:hidden'>Данные аккаунта</h1>
      <section className='py-8 flex flex-col gap-6'>
        <SubscriptionsCalculator/>
        <div>
          <p className='text-t2Regular text-light_grey py-1'> Сумма в месяц:2480 ₽ </p>
          <p className='text-t2Regular text-light_grey py-1'> Дата следующего списания: 22.10.2024 </p>
          <p className='text-t2Regular text-light_grey py-1'> Сумма следующего списания: 690 ₽</p>
          <p className='text-t2Regular text-light_grey py-1'> Способ оплаты: Robocassa <span
            className='cursor-pointer hover:text-medium_grey text-white text-btnText'>Изменить</span></p>
        </div>
        <div>
          <div className='px-6 py-4 flex gap-4 rounded-xl border border-secondary_dark_gray w-fit items-center'>
            <InfoIcon className='fill-yellow w-7 h-7'/>
            <div>
              <p className='text-btnText'>Переходи на тариф “Лейбл” и получай выгоду</p>
              <p className='text-t2Regular'>от 2330 ₽ <span className='text-light_grey'>в месяц за 5 артистов</span></p>
            </div>
          </div>
          <SecondaryButton title='Перейти на другой тариф' className='bg-primary_blue border-none text-white mt-5'
                           onClick={() => setOpenModal(true)}/>
        </div>
        <div className='mt-5 flex flex-col gap-6'>
          <h2 className='text-btnText text-light_grey'>История платежей</h2>
          <ShowOnMobileOnly>
            <ul>
              {
                subscriptions.map((item, index) => (
                  <li className='py-4 flex flex-col gap-4 border-b border-secondary_dark_gray' key={index}>
                    <div className='flex gap-4'>
                      <p className='text-caption_r_desk'>{item.prolongDate}</p>
                      <p className='text-caption_r_desk'>{item.name}</p>
                    </div>
                    <div className='flex gap-4 justify-between items-center'>
                      <p className='text-t2Regular text-light_grey'>{item.sum}</p>
                      <DownloadIcon
                        className='fill-white cursor-pointer hover:fill-medium_grey'/>
                    </div>
                  </li>
                ))
              }
            </ul>
          </ShowOnMobileOnly>
          <div className='w-full rounded-t-[20px] overflow-hidden hidden md:block'>
            <div className='overflow-auto'>
              <table className='border-b border-secondary_dark_gray w-full'>
                <thead>
                <tr className="bg-[#48484840]/25">
                  {
                    tableHeaders.map((title, index) => (
                      <th className="py-5 px-4 text-start  text-btnText whitespace-nowrap" key={index}>
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
                        className={"p-4 text-caption_r_desk "}>{item.prolongDate}</td>
                      <td className="p-4 text-start flex items-center gap-2.5 min-w-[15rem] text-t2Regular">
                        {item.name}
                      </td>
                      <td
                        className={"p-4 text-caption_r_desk "}>{item.sum}</td>
                      <td
                        className={"p-4 text-caption_r_desk "}><DownloadIcon
                        className='fill-white cursor-pointer hover:fill-medium_grey'/>
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
})
export default PaymentInfo
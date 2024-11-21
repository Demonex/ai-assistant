import React, {memo} from "react";
import SecondaryButton from "../../../../components/SecondaryButton.js";
import '../style.css'
const ManageNotifications = memo(() => {
  return (
    <>
      <h1 className='text-t1Semi_ipad lg:hidden'>Данные аккаунта</h1>
      <section className='py-6 flex flex-col gap-6'>
        <div className=' flex flex-col gap-4'>
          <div className=' flex gap-2.5 items-center'>
            <div
              className='min-w-[1.125rem] h-[1.125rem] border border-solid border-secondary_dark_gray rounded-sm  bg-medium_grey flex justify-center items-center'>
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 9.4L0 5.4L1.4 4L4 6.6L10.6 0L12 1.4L4 9.4Z" fill="white"/>
              </svg>

            </div>
            <p className='text-t2Regular text-light_grey'>Предупреждения об окончании подписки и ошибках оплаты</p>
          </div>
          <p className='text-caption_r_desk text-medium_grey ml-7'>Уведомим об окончании подписки за 3 дня, а об ошибке
            оплаты – немедленно</p>
        </div>
        <div className=' flex flex-col gap-4'>
          <div className=' flex gap-2.5 items-center'>
            <input
              // onChange={(e) => handleChecked(index, e.target.checked)}
              type='checkbox'
              className='min-w-[1.125rem] h-[1.125rem] border border-solid border-secondary_dark_gray rounded-sm bg-popup_gray'/>
            <p className='text-t2Regular text-light_grey'>Обновления сервиса</p>
          </div>
          <p className='text-caption_r_desk text-medium_grey ml-7'>Письма приходят однократно в день запуска
            обновления</p>
        </div>
        <div className=' flex flex-col gap-4'>
          <div className=' flex gap-2.5 items-center'>
            <input
              // onChange={(e) => handleChecked(index, e.target.checked)}
              type='checkbox'
              className='min-w-[1.125rem] h-[1.125rem] border border-solid border-secondary_dark_gray rounded-sm bg-popup_gray'/>
            <p className='text-t2Regular text-light_grey'>Новости музыкального мира</p>
          </div>
          <p className='text-caption_r_desk text-medium_grey ml-7'>Только самое интересное 1 раз в неделю</p>
        </div>
        <SecondaryButton title='Сохранить изменения' className='bg-medium_grey text-white w-full md:w-fit'/>
      </section>
    </>
  )
})
export default ManageNotifications
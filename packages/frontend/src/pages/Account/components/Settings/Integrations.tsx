import React, {memo, useState} from "react";
import {useSubscriptions} from "../hooks/useSubscriptions.js";
import {ListBox} from "./FavoriteSources.js";
import SecondaryButton from "../../../../components/SecondaryButton.js";
import {navbar} from "../../../../data/consts/navbar.js";
import {StarIcon} from "../../../../assets/StarIcon.js";
import BasketIcon from "../../../../assets/BasketIcon.js";


const Integrations = memo(() => {
  const {artistsFromSubscriptions, userSubscriptions, subscriptions} = useSubscriptions();
  const artists = Object.entries(artistsFromSubscriptions);
  const [selectedSubscription, setSelectedSubscription] = useState(Object.values(artistsFromSubscriptions)[1]);
  const sources = navbar[0].content[0].options
  return (
    <>
      <h1 className='text-t1Semi_ipad lg:hidden'>Интеграция</h1>
      <section className='py-6 flex flex-col gap-6'>
        <div className='w-full flex justify-between items-center gap-10'>
          <div className='w-full max-w-[35rem]'>
            <ListBox/>
          </div>
          <SecondaryButton title='Добавить ссылку'
                           className='bg-primary_blue border-none text-white h-fit hidden lg:flex'/>
        </div>
        <ul className=' grid grid-cols-1 lg:grid-cols-2 gap-x-6'>
          {
            sources.map((source, index) => (
              <li key={index}
                  className='py-4 px-4 flex justify-between items-center border-b border-secondary_dark_gray w-full lg:max-w-[35rem]'>
                <div className='flex items-center gap-2.5'>
                  <img src={source.logo} alt={source.name} className='w-5 h-5'/>
                  <p className='text-t2Regular'>{source.name}</p>
                </div>
                <div className='flex gap-4'>
                  <StarIcon className='fill-white'/>
                  <BasketIcon className='fill-white'/>
                </div>
              </li>
            ))
          }
        </ul>
        <p className='text-caption_s_desk text-medium_grey md:-mt-4 lg:mt-[unset] lg:w-1/2'>*компания Meta Platforms
          Inc., владеющая Facebook и
          Instagram, внесена в реестр экстремистских организаций, ее деятельность в России по поддержанию указанных
          соцсетей признана экстремистской деятельностью</p>
        <SecondaryButton title='Добавить ссылку' className='bg-primary_blue border-none text-white h-fit md:w-fit lg:hidden'/>
      </section>
    </>

  )
})
export default Integrations
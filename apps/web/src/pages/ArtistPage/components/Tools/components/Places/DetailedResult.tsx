import React, {Fragment, memo, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import SecondaryCloseIcon from "../../../../../../assets/SecondaryCloseIcon.js";
import {Link} from "wouter";
import {useGetPlaces} from "../../../../hooks/useGetPlaces.js";


const clickedData = {
  "result": "success",
  "message": "Data retrieved.",
  "venues": [
    {
      "id": 38320,
      "primaryText": "Eventim Apollo",
      "secondaryText": "45 Queen Caroline St",
      "valueText": "Marilyn Manson",
      "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb9420fc7bac8669f61a9f45c3",
      "smallImageUrl": false,
      "countryImageUrl": "https://songstats.com/files/flags/gb.png",
      "website": "http://www.eventimapollo.com",
      "linkText": "View 1 event",
      "capacity": "5,100",
      "description": "The Eventim Apollo – London (previously Hammersmith Apollo) is located on Queen Caroline Street, W6. \r\nThere are two bars in the stalls area as well as one in the circle. The venue is easily accessible from Hammersmith Underground station. \r\n\r\nThe Art Deco style building opened in 1932 as a cinema. The venue continued as a cinema until the early 90s when it was re-branded as The Hammersmith Apollo. The now Grade II* listed building became the Carling Apollo in 2002,  the HMV Hammersmith Apollo from 2009 and has been the London Eventim Apollo from 2013. \r\nMany CDs and DVDs have been taped within the venue, and a host of notable acts have performed, including: The Beatles, Ella Fitzgerald, Johnny Cash, Queen and Pink Floyd.",
      "phone": "0844 249 4300",
      "metadata": [
        {
          "displayText": "London"
        },
        {
          "displayText": "45 Queen Caroline St"
        }
      ],
      "events": [
        {
          "id": 87168658,
          "artistName": "Marilyn Manson",
          "eventDescription": "Marilyn Manson at Eventim Apollo (February 21, 2025)",
          "imageUrl": "https://i.scdn.co/image/ab676161000051749420fc7bac8669f61a9f45c3",
          "startDate": "21 Feb 2025"
        }
      ]
    },
    {
      "id": 40289,
      "primaryText": "O2 Academy Islington",
      "secondaryText": "Angel Central, 16 Parkfield Street",
      "valueText": "Eisbrecher",
      "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebada11014169e26224ec80f0c",
      "smallImageUrl": false,
      "countryImageUrl": "https://songstats.com/files/flags/gb.png",
      "website": "https://academymusicgroup.com/o2academyislington/",
      "linkText": "View 1 event",
      "capacity": "800",
      "description": "Run by the Academy Music Group, the O2 Islington Academy in North London plays host to hundreds of bands each year. The purpose built venue, formerly The Marquee Club, features 3 bars. \r\n\r\nThere is a cloakroom with a fee of £2 per item. Under 14s must be accompanied by an adult and most club nights are 18+. Re-admission is not allowed and sound recording and professional photography equipment is not permitted in the venue. \r\n\r\nThe O2 Academy Islington is a short walk from Angel Underground station. The 800 capacity venue is the smallest of the three London venues (Shepherd's Bush and Brixton being the other two) in the O2 group.",
      "phone": "020 7288 4400",
      "metadata": [
        {
          "displayText": "London"
        },
        {
          "displayText": "Angel Central, 16 Parkfield Street"
        }
      ],
      "events": [
        {
          "id": 9662344,
          "artistName": "Eisbrecher",
          "eventDescription": "Eisbrecher at O2 Academy Islington (May 9, 2023)",
          "imageUrl": "https://i.scdn.co/image/ab67616100005174ada11014169e26224ec80f0c",
          "startDate": "09 May 2023"
        }
      ]
    },
    {
      "id": 37574,
      "primaryText": "The O2",
      "secondaryText": "Peninsula Square",
      "valueText": "Iron Maiden, Slipknot",
      "imageUrl": "https://i.scdn.co/image/ab6761610000e5ebf9978ad4808f6f2723124d19",
      "smallImageUrl": false,
      "countryImageUrl": "https://songstats.com/files/flags/gb.png",
      "website": "http://www.theO2.co.uk",
      "linkText": "View 4 events",
      "capacity": "20,000",
      "description": "The O2 Arena is a large 20,000 capacity venue in Greenwich, South East London located on the Prime Meridian. The venue hosts high profile concerts as well as sporting, comedy and dance events.\r\n\r\nOriginally known as the Millennium Dome, the venue was constructed in the late 90s and opened in 2000 in celebration of the millennium. The space was first used for a variety of exhibitions under the name 'The Millennium Experience', but after disappointing attendance figures, was faced with financial troubles. The site was reconstructed as an arena and opened again in 2007.\r\n\r\nThe re-branded venue was launched on 24th June 2007 with a concert from Bon Jovi. Since then the venue has been visited by millions of attendees and a host of acts from The Eagles to Metallica have performed.",
      "phone": "020 8463 2000",
      "metadata": [
        {
          "displayText": "London"
        },
        {
          "displayText": "Peninsula Square"
        }
      ],
      "events": [
        {
          "id": 58792977,
          "artistName": "Slipknot",
          "eventDescription": "Slipknot with Bleed From Within at The O2 (December 21, 2024)",
          "imageUrl": "https://i.scdn.co/image/ab67616100005174d0cdb283a7384a0edb665182",
          "startDate": "21 Dec 2024"
        },
        {
          "id": 58792975,
          "artistName": "Slipknot",
          "eventDescription": "Slipknot with Bleed From Within at The O2 (December 20, 2024)",
          "imageUrl": "https://i.scdn.co/image/ab67616100005174d0cdb283a7384a0edb665182",
          "startDate": "20 Dec 2024"
        },
        {
          "id": 4100703,
          "artistName": "Iron Maiden",
          "eventDescription": "Iron Maiden and The Raven Age at The O2 (July 8, 2023)",
          "imageUrl": "https://i.scdn.co/image/ab67616100005174f9978ad4808f6f2723124d19",
          "startDate": "08 Jul 2023"
        },
        {
          "id": 4100701,
          "artistName": "Iron Maiden",
          "eventDescription": "Iron Maiden with Lord of the Lost at The O2 (July 7, 2023)",
          "imageUrl": "https://i.scdn.co/image/ab67616100005174f9978ad4808f6f2723124d19",
          "startDate": "07 Jul 2023"
        }
      ]
    }
  ]
}
const DetailedModal = memo(({setOpenModal, openModal, infoAboutVenue}: any) => {

  return (
    <Transition appear show={openModal} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-40 overflow-y-auto" onClose={() => setOpenModal(false)}>
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
        <div className="h-full">
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
              className=" bg-popup_gray lg:my-20 p-4 md:py-8 lg:py-10 md:px-8 lg:px-[3.75rem] lg:mx-auto lg:rounded-[20px] z-50 relative w-full lg:max-w-[53.9rem] mb-[7rem] md:mb-[unset] h-auto md:h-full lg:h-[unset]"
            >
              <div className='w-full flex justify-end cursor-pointer' onClick={() => setOpenModal(false)}>
                <SecondaryCloseIcon className='stroke-white'/>
              </div>
              <div className='flex flex-col gap-6'>
                <div className='pb-2 w-full flex flex-col gap-2 border-b border-secondary_dark_gray'>
                  <h1 className='text-t1Semi_deck'>{infoAboutVenue.primaryText}</h1>
                  <div className='flex gap-2.5 items-center text-t2Regular'>
                    <img src='' alt='' className='w-5 h-5 rounded-full'/> {/*get from url*/}
                    {/*<p>{infoAboutVenue?.metadata[0]?.displayText}</p>*/}
                    <span className={'text-medium_grey'}>|</span>
                    {
                      infoAboutVenue?.metadata?.map((item, index) => (
                        <span className={'text-medium_grey'} key={index}>{item.displayText}</span>
                      ))
                    }
                  </div>
                </div>
                <div className='flex flex-col gap-4'>
                  <h2 className='text-caption_s_desk text-medium_grey uppercase'>О ПЛОЩАДКЕ</h2>
                  <p className='text-caption_r_desk text-light_grey'>{infoAboutVenue.description}</p>
                  <div>
                    <p className='text-caption_m_desk text-light_grey'>
                      Вместимость: {infoAboutVenue.capacity}
                    </p>
                    <p className='text-caption_m_desk text-light_grey'>
                      Контакт: {infoAboutVenue.phone}
                    </p>
                    <p className='text-caption_m_desk text-light_grey'>
                      Сайт:  <Link to={infoAboutVenue.website}>{infoAboutVenue.website}</Link>
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className='text-btnText'>Мероприятия</h2>
                  <ul className='mt-2'>
                    {
                      infoAboutVenue?.events?.map((event, index) => (
                        <li key={index} className='py-2 border-b border-secondary_dark_gray flex gap-4 items-center'>
                          <img src={event.imageUrl} alt='' className='w-11 h-11 rounded-full'/>
                          <div>
                            <h2 className='text-caption_r_desk'>{event.artistName}</h2>
                            <span className='text-caption_s_desk text-medium_grey'>{event.startDate}</span>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
})
const DetailedResult = memo(() => {
  const [openModal, setOpenModal] = useState(false);
  const [infoAboutVenue, setInfoAboutVenue] = useState({});

  return (
    <div className='flex flex-col gap-4 mb-[4.5rem]'>
      <DetailedModal openModal={openModal} setOpenModal={setOpenModal} infoAboutVenue={infoAboutVenue}/>
      <div className='py-4 flex gap-4 items-center'>
        <img src='' alt='' className='w-8 h-8 rounded-lg'/> {/*get src from url*/}
        <h1 className='text-t2Regular text-light_grey'>Москва, Россия: 10 мест</h1>{/*get src from url*/}
      </div>
      <div className='grid grid-cols-6 gap-x-6'>
        {
          clickedData.venues.map((venue, index) => (
            <div className='cursor-pointer p-3 rounded-[0.75rem] bg-[#27272780] flex flex-col gap-4 items-center'
                 key={index}
                 onClick={() => {
                   setOpenModal(true);
                   setInfoAboutVenue(venue);
                 }}>
              <img src={venue.imageUrl} alt='' className='w-[9.25rem] h-[9.25rem] rounded-[0.75rem]'/>
              <div>
                <h2 className='text-caption_r_desk'>{venue.primaryText}</h2>
                <h2 className='text-caption_r_desk text-medium_grey'>{venue.valueText}</h2>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
})
export default DetailedResult
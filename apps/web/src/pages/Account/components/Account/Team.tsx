import {Listbox, Transition} from "@headlessui/react";
import ChevronRight from "../../../../assets/ChevronRight.js";
import React, {useState} from "react";
import {DownloadIcon} from "../../../../assets/DownloadIcon.js";
import SecondaryButton from "../../../../components/SecondaryButton.js";
import AddTeamMember from "./AddTeamMember.js";
import BasketIcon from "../../../../assets/BasketIcon.js";
import RemoveTeamMember from "./RemoveTeamMember.js";
import PrimaryButton from "../../../../components/PrimaryButton.js";

const tableHeaders = [
  {
    title: "Логин",
  },
  {
    title: "Email",
  },
  {
    title: "Статус",
  },
  {
    title: "Роль",
  },
  {
    title: "type",
  },
]
const teamMembers = [
  {
    name: 'Login 1',
    email: 'test1@mail.com',
    status: 'Активен',
    role: 'Администратор',
    type: 'admin'
  },
  {
    name: 'Login 2',
    email: 'test2@mail.com',
    status: 'Активен',
    role: 'Участник',
    type: 'member'
  },
]
const subscriptions = [
  {name: 'Dua Lipa'},
  {name: 'Morgenstern'},
]
const Team = () => {
  const [selectedSubscription, setSelectedSubscription] = useState(subscriptions[0]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalRemove, setOpenModalRemove] = useState(false);
  return (
    <>
      <h1 className='text-t1Semi_ipad lg:hidden'>Команда</h1>
      <section className='py-6 flex flex-col gap-6'>
        <AddTeamMember openModalAdd={openModalAdd} setOpenModalAdd={setOpenModalAdd}/>
        <RemoveTeamMember openModalRemove={openModalRemove} setOpenModalRemove={setOpenModalRemove}/>
        <div className='w-full max-w-[35rem]'>
          <Listbox value={selectedSubscription} onChange={setSelectedSubscription}>
            <Listbox.Label className='text-caption_m_desk text-medium_grey '>Выбери подписку </Listbox.Label>
            <Listbox.Button
              className=' w-full relative mt-1.5'>
              {({open}) => (
                <div
                  className={`flex justify-between items-center w-full text-t2Regular py-2.5 px-3.5  ${open ? ' border border-solid border-b-secondary_dark_gray border-transparent bg-popup_gray rounded-t-xl ' : 'border border-solid border-secondary_dark_gray rounded-xl '}`}>
                  <div className='flex gap-2 items-center'>
                    <p className='text-t2Regular'>{selectedSubscription.name}</p>
                  </div>
                  <ChevronRight color='#7B7B7B'
                                className={` w-5 h-5 transition duration-300 ${open ? '-rotate-90 ' : 'rotate-90 transition'}`}/>
                </div>
              )}
            </Listbox.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options
                className='bg-popup_gray  rounded-b-xl  max-w-[35rem] absolute w-full'
              >
                {subscriptions.map((source, index) => source.name !== selectedSubscription.name ? (
                  <Listbox.Option
                    key={index}
                    value={source}
                    className={`py-2.5 px-3.5 cursor-pointer ${index === subscriptions.length - 1 ? '' : 'border-b border-secondary_dark_gray'}`}>
                    {({active, selected}) => (
                      <div
                        className={`flex gap-2 items-center ${
                          active ? '' : ''
                        }`}
                      >
                        <p className='text-t2Regular'>{source.name}</p>
                      </div>
                    )}
                  </Listbox.Option>
                ) : null)}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
        <div className='w-full rounded-t-[20px] overflow-hidden hidden md:block'>
          <table className='border-b border-secondary_dark_gray w-full'>
            <thead>
            <tr className="bg-[#48484840]/25">
              {
                tableHeaders.map((title, index) => (
                  <th
                    className={`py-5 px-4 text-start  text-btnText ${index === tableHeaders.length - 1 ? 'text-transparent' : ''}`}
                    key={index}>
                    {title.title}
                  </th>
                ))
              }
            </tr>
            </thead>
            <tbody className="divide-y divide-secondary_dark_gray">
            {
              teamMembers.map((item, indexItem) => (
                <tr className={""} key={indexItem}>
                  <td
                    className={"p-4 text-caption_r_desk text-light_grey"}>{item.name}</td>
                  <td className="p-4 text-start flex items-center gap-2.5 text-light_grey text-t2Regular">
                    {item.email}
                  </td>
                  <td
                    className={"p-4 text-caption_r_desk text-light_grey "}>{item.status}</td>
                  <td
                    className={"p-4 text-caption_r_desk text-light_grey"}>{item.role}
                  </td>
                  <td
                    className={" text-caption_r_desk text-light_grey "}>{item.type === 'member' && (
                    <div className='flex justify-end pr-8 items-center' onClick={() => setOpenModalRemove(true)}>
                      <BasketIcon
                        className='fill-white hover:fill-medium_grey cursor-pointer'/>
                    </div>)}
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
        <SecondaryButton title='Добавить участника' className='border-none bg-primary_blue text-white w-fit hidden md:flex'
                         onClick={() => setOpenModalAdd(true)}/>
        <div className='md:hidden'>
          {
            teamMembers.map((member, index) => (
              <div key={index} className='py-4 flex flex-col gap-6 border-b border-secondary_dark_gray/50'>
                <div className='flex gap-2'>
                  <p className='text-btnText'>Логин:</p>
                  <p className='text-t2Regular text-light_grey'>{member.name}</p>
                </div>
                <div className='flex gap-2'>
                  <p className='text-btnText'>E-mail:</p>
                  <p className='text-t2Regular text-light_grey'>{member.email}</p>
                </div>
                <div className='flex gap-2'>
                  <p className='text-btnText'>Статус:</p>
                  <p className='text-t2Regular text-light_grey'>{member.status}</p>
                </div>
                <div className='flex gap-2'>
                  <p className='text-btnText'>Роль:</p>
                  <p className='text-t2Regular text-light_grey'>{member.role}</p>
                </div>
                {
                  member.type === 'member' && (
                    <SecondaryButton
                      onClick={() => setOpenModalRemove(true)}
                      title='Удалить'
                    className='w-full flex-row-reverse gap-2.5'
                    >
                      <BasketIcon
                        className='fill-white hover:fill-medium_grey cursor-pointer w-5 h-5'/>
                    </SecondaryButton>
                  )
                }
              </div>
            ))
          }
        </div>
        <SecondaryButton title='Добавить участника' className='border-none bg-primary_blue text-white w-full md:hidden'
                         onClick={() => setOpenModalAdd(true)}/>
      </section>
    </>
  )
}
export default Team
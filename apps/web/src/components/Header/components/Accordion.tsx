import type React from 'react'
import {useMemo, memo, useState} from 'react'
import type {NavbarTypes} from "../../../data/consts/navbar.js";
import {Link} from "wouter";
import {useMobileMenu} from "./MobileMenu/hooks/useMobileMenu.js";

type AccordionProps = {
    items: NavbarTypes
}
type AccordionItemProps = {
    title: string
    index: number,
    link?: string
    items: NavbarTypes[number]['content']
    activeIndex: number
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>
}

const AccordionItem = memo<AccordionItemProps>(({
                                                    title,
                                                    items,
                                                    index,
                                                    activeIndex,
                                                    setActiveIndex,
                                                    link
                                                }) => {
    const accordionOpen = useMemo(() => index === activeIndex, [index, activeIndex])
    const {setIsOpen: setIsOpenMobileMenu} = useMobileMenu();
    return (
        <div>
            <a href={`${link}`}
               className=' flex flex-row items-center justify-between gap-1.5 cursor-pointer py-4 border-b border-[#7B7B7B80]'
               onClick={(e) => {
                   if (link) {
                       return
                   }
                   e.preventDefault();
                   setActiveIndex(index !== activeIndex ? index : -1);
               }}
               aria-expanded={accordionOpen}
               aria-controls={`accordion-content-${index}`}
            >
                <p className=" text-h3Mobile md:text-h3Desctop ">
                    {title}
                </p>
                {items.length
                    ? <div className={`plusminus_animation w-10 h-10  ${accordionOpen ? 'active' : ''}`}/>
                    : ''
                }
            </a>
            {
                items.length
                    ? (
                        <div
                            id={`accordion-content-${index}`}
                            role="region"
                            aria-labelledby={`accordion-title-${index}`}
                            className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                        >
                            <div className="overflow-hidden">
                                {items.map((itemContent, indexItem) => (
                                    <div key={indexItem}>
                                        <div key={indexItem} className="md:px-8 py-4 grid grid-cols-2 gap-4">
                                            {
                                                itemContent.options.map((option, index) => (
                                                    <div key={index}
                                                         className='flex items-center gap-2.5 cursor-pointer group'>
                                                        {
                                                            option.logo ? (
                                                                <div
                                                                    className="">
                                                                    <img src={option.logo}
                                                                         className='w-6 h-6' alt=""/>
                                                                </div>
                                                            ) : null
                                                        }
                                                        <Link onClick={() => setIsOpenMobileMenu(false)}
                                                              className='text-t1Mobile md:text-t1Regular capitalize text-[white]'
                                                              to={option.link}>
                                                            {option.name}
                                                        </Link>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        {
                                            index === 0
                                                ? <p className='text-captionText text-[0.813rem] text-medium_grey'>*компания Meta Platforms Inc., владеющая Facebook и Instagram, внесена в реестр экстремистских организаций, ее деятельность в России по поддержанию указанных соцсетей признана экстремистской деятельностью</p>
                                                : null
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                    : null
            }
        </div>
    )
})

export const Accordion = memo(({items,}: AccordionProps) => {
    const [accordionActiveIndex, setAccordionActiveIndex] = useState(-1)
    return (
        items.map((item, index) => (
            <AccordionItem
                key={index}
                title={item.title}
                index={index}
                items={item.content}
                activeIndex={accordionActiveIndex}
                link={item.link}
                setActiveIndex={setAccordionActiveIndex}
            />
        ))
    )
});

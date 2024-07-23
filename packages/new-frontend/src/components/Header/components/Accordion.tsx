import React, {useMemo, memo, useState} from 'react'
import {NavbarTypes} from "../../../data/consts/navbar.js";
import {Link} from "wouter";

type AccordionProps = {
    items: NavbarTypes
}
type AccordionItemProps = {
    title: string
    index: number,
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
                                                }) => {
    const accordionOpen = useMemo(() => index === activeIndex, [index, activeIndex])

    return (
        <div>
            <div
                className='px-2 flex flex-row items-center gap-1.5 rounded-lg hover:bg-gray-600/20 cursor-pointer'
                onClick={(e) => {
                    e.preventDefault();
                    setActiveIndex(index !== activeIndex ? index : -1)
                }}
                aria-expanded={accordionOpen}
                aria-controls={`accordion-content-${index}`}
            >
                <p className=" block  py-2 font-normal leading-7 text-gray-100 ">
                    {title}
                </p>
                {items.length
                    ? <svg xmlns="http://www.w3.org/2000/svg"
                           className={`inline h-4 transition-transform duration-200 transform icon icon-tabler icon-tabler-chevron-down ${
                               accordionOpen ? 'rotate-180' : 'rotate-0'
                           }
                           `}
                           viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                           color='white'>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M6 9l6 6l6 -6"></path>
                    </svg>
                    : ''
                }
            </div>
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
                                {items.map((itemContent, index) => (
                                    <div key={index}>
                                        <h1 className='text-gray-400/50 uppercase p-4 ml-4 pb-0 '>{itemContent.deviceOption}</h1>
                                        <div key={index} className="p-4 grid grid-cols-2 gap-2">
                                            {
                                                itemContent.options.map((option, index) => (
                                                    <div key={index}
                                                         className='flex items-center gap-3 p-4 cursor-pointer group'>
                                                        {
                                                            option.logo ? (
                                                                <div
                                                                    className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-gray-900 group-hover:bg-indigo-500 duration-300 text-white ring-1 ring-gray-800 ">

                                                                    <img src={option.logo}
                                                                         className='w-[16px] h-[16px]' alt=""/>
                                                                </div>
                                                            ) : null
                                                        }
                                                        <Link className='font-semibold text-white capitalize '
                                                           to={option.link}>{option.name}</Link>
                                                    </div>
                                                ))
                                            }
                                        </div>
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
                setActiveIndex={setAccordionActiveIndex}
            />
        ))
    )
});

import {memo} from "react";
import {Link} from "wouter";
import {navbar} from "../../../data/consts/navbar.js";

type DropdownDownloadProps = {
    opened?: boolean
}
export const DropdownDownload = memo<DropdownDownloadProps>(({
                                                                 opened,
                                                             }) => {
    return (
        <div
            className={`${opened ? `opacity-1 ${'dropdown-transition_end'}` : (opened === false
                ? `pointer-events-none opacity-0`
                : 'opacity-0 pointer-events-none')} absolute top-[135%] left-[35%] z-10 mt-2 flex w-screen max-w-sm -translate-x-1/2 rounded-3xl bg-gradient-to-b from-indigo-500 via-indigo-500/ ring-1 ring-inset ring-white/5 focus:outline-none p-[0.060rem]`}
            role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
            <div className="w-screen max-w-3xl bg-gray-900 rounded-3xl flex-auto overflow-hidden text-sm shadow-lg">
                {
                    navbar[1].content.map((item, index) => (
                        <div className='p-4' key={index}>
                            {item.options.map((option, index) => (
                                <div className="group relative flex gap-x-6 rounded-lg px-4 py-2 duration-300"
                                     key={index}>
                                    <div
                                        className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 group-hover:bg-indigo-500 duration-300 text-white ring-1 ring-gray-800">
                                        <img src={option.logo} className='w-[16px] h-[16px]'/>
                                    </div>
                                    <div className='flex items-center'><Link to={option.link}
                                                                          className="font-normal text-white">
                                        {option.name}
                                    </Link></div>
                                </div>
                            ))}
                        </div>
                    ))
                }
            </div>
        </div>
    )
})

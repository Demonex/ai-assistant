import {navbar} from "../../../data/consts/navbar.js";
import {memo} from "react";
import {Link} from "wouter";

type DropdownPlatformsProps = {
    opened?: boolean
}
export const DropdownPlatforms = memo<DropdownPlatformsProps>(({
                                                                   opened,
                                                               }) => {
    return (
        <div
            className={`${opened ? `opacity-1 ${true ? 'dropdown-transition_end pointer-events-none opacity-0' : 'dropdown-transition_enter'}` : (opened === false
                ? `pointer-events-none opacity-0`
                : 'opacity-0 pointer-events-none')} absolute top-[135%] left-[100%] z-10 mt-2 origin-top-right flex w-screen max-w-sm md:max-w-3xl -translate-x-1/2 rounded-3xl bg-gradient-to-b from-indigo-500 via-indigo-500/ ring-1 ring-inset ring-white/5 focus:outline-none p-[0.060rem]`}
            role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
            <div
                className="w-screen max-w-3xl bg-gray-900 rounded-3xl flex-auto overflow-hidden text-sm leading-6 shadow-lg">
                {
                    navbar[2].content.map((item, index) => (
                        <div key={index}>
                            <h1 className='text-gray-400/50 uppercase p-4 ml-4 pb-0'>{item.deviceOption}</h1>
                            <div className="p-4 grid md:grid-cols-2 lg:grid-cols-4 gap-2" key={index}>
                                {
                                    item.options.map((option, index) => (
                                        <div className="group relative flex items-center gap-x-6 rounded-lg p-4"
                                             key={index}>
                                            <div
                                                className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-gray-900 group-hover:bg-indigo-500 duration-300 text-white ring-1 ring-gray-800 ">
                                                <img src={option.logo} className='w-[16px] h-[16px]'/>
                                            </div>

                                            <div><Link to={option.link} className="font-semibold text-white capitalize ">
                                                {option.name}
                                            </Link></div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
})

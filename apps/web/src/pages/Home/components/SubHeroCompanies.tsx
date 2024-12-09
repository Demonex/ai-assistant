import {navbar, type NavbarTypes} from "../../../data/consts/navbar.js";
import {memo, useMemo} from "react";
import {Link} from "wouter";

type Options = NavbarTypes[number]["content"][number]["options"]
export const SubHeroCompanies = memo(() => {
    const allOptions: Options = useMemo(() => {
        return navbar[2].content.reduce<Options>((prev, item) => {
            return [...prev, ...item.options]
        }, [])
    }, [])
    return (
        <div
            className="flex justify-center flex-wrap lg:text-center gap-4 md:gap-6  list-none lg:gap-12 max-w-[1024px] p-5">
            {
                allOptions.map((option, index) => (
                    <Link
                        key={index}
                        to={option.link}
                        className="hover:shadow-xl duration-200 items-center bg-gradient-to-b from-indigo-500 via-indigo-500/5 rounded-3xl inline-flex p-[0.060rem] shadow-2xl text-center bg-gray-900 aspect-square">
                        <div
                            className="bg-gray-900 p-[22px] md:px-8 lg:py-8 h-full w-full rounded-3xl inline-flex items-center">
                            <img
                                src={option.logo} alt="" className="w-[19px] h-[19px] md:w-[35px] md:h-[35px]"/>
                        </div>
                    </Link>
                ))
            }

        </div>
    )
})

import React,{memo} from "react";
import {useActiveTabNews} from "../../../hooks/useActiveTabNews.js";
const tabs = [
    {
        title: "Все материалы",
    },
    {
        title: "Обновления сервиса",
    },
    {
        title: "Новости музыкального мира",
    },
    {
        title: "Ещё больше пользы",
    },
]
const NewsTabs = memo(() => {
    const {activeTab, setActiveTab} = useActiveTabNews()
    return (
        <div className='py-5 lg:py-10'>
            <ol className='w-full flex gap-4 flex-wrap '>
                {
                    tabs.map((tab, i) => (
                        <li
                            onClick={() => setActiveTab(i)}
                            key={i}
                            className={` px-8 md:px-11 py-4 cursor-pointer border border-medium_grey rounded-[30px] text-btnText whitespace-nowrap ${activeTab === i ? 'bg-yellow text-[black]' : 'text-medium_grey hover:text-white hover:border-yellow'}`}>
                            <span>{tab.title}</span>
                        </li>
                    ))
                }
            </ol>
        </div>
    )
})
export default NewsTabs;
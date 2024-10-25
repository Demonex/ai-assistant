import {socials} from "../../../data/consts/socials.js";
import {allSources} from "../../../data/consts/favoriteSources.js";
import {useState} from "react";
import {useFavoriteSources} from "./hooks/useFavoriteSources.js";


export const FavoriteSources = () => {
    const filteredSocials = socials.filter((_, index) => {
        return (index > 0)
    });
    const {favoriteSources, addFavoriteSource, removeFavoriteSources} = useFavoriteSources();

    return (
        <div className=' flex flex-col gap-[1rem]'>
            <div className='pb-[4rem] border-b border-slate-200/10 lg:p-[2rem]'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-gray-200 font-medium text-lg xl:text-xl capitalize text-center'>your
                        sources</h1>
                    <p className='text-gray-300 font-light text-md xl:text-[1rem] capitalize py-4 text-center'>These
                        sources will
                        show
                        up in your Overview
                        Activity Feed. Click and drag to reorder.</p>
                    {
                        favoriteSources.map((itemFavorite, index) => {
                           const matchSource = socials.find(item => item.slug === itemFavorite);
                            return (
                                <div className='w-full px-4 py-2 border border-slate-600/50 rounded-[8px] bg-slate-500/5'
                                 key={index}>
                                <div className='w-full flex justify-between'>
                                    <div className='flex gap-2 items-center'>
                                        <img src={matchSource.logo} className='w-6 h-6'/>
                                        <p className='text-gray-200 font-medium text-xs xl:text-sm uppercase py-4 px-4'>{matchSource.name}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFavoriteSources(matchSource.slug)}
                                        className='capitalize text-[12px] lg:text-[16px] leading-6 font-light text-indigo-300/50 hover:text-indigo-200/80 whitespace-nowrap'
                                        type='button'>Remove
                                    </button>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='lg:px-[2rem]'>
                <div className='py-6 flex flex-col gap-3'>
                    <h1 className='text-gray-200 font-medium text-lg xl:text-xl capitalize text-center'>other
                        sources</h1>
                    <p className='text-gray-300 font-light text-md xl:text-[1rem] capitalize py-4 text-center'>These
                        sources will
                        not show up in your Overview Activity Feed, but you can still access them by clicking the Source
                        Setting
                        Icon.</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-5 gap-3 py-3'>
                        {
                            allSources.filter(item => {
                                if (favoriteSources.includes(item.slug)){
                                    return
                                }
                                return item
                            }).map((itemAllSources, indexAllSources) => {
                            const allSocialsWithLogo = socials.find(itemSocials => itemSocials.slug === itemAllSources.slug)
                            return (
                            <div
                            className='w-full px-4 py-2 border border-slate-600/50 rounded-[8px] bg-slate-500/5'
                            key={indexAllSources}>
                        <div className='w-full flex justify-between'>
                            <div className='flex gap-2 items-center'>
                                <img src={allSocialsWithLogo?.logo} className='w-6 h-6'/>
                                <p className='text-gray-200 font-medium text-xs xl:text-sm uppercase py-4 px-4'>{allSocialsWithLogo?.name}</p>
                            </div>
                            <button
                                className='capitalize text-[12px] lg:text-[16px] leading-6 font-light text-indigo-300/50 hover:text-indigo-200/80 whitespace-nowrap'
                                type='button'
                                onClick={() => addFavoriteSource(allSocialsWithLogo.slug)}
                            >Add
                            </button>
                        </div>
                    </div>
                    )})
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

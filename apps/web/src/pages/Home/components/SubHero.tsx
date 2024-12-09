import {SubHeroCompanies} from "./SubHeroCompanies.js";
import {memo} from "react";

export const SubHero = memo(() => {
    return (
        <section className="relative flex flex-col items-center justify-center">
            <div className="relative px-8 pb-4 pt-12 max-w-7xl md:px-12 lg:px-32 lg:pt-24 lg:pb-16">
                <div className="max-w-2xl mx-auto lg:text-center">
                    <div className='text-center'><p
                        className="text-xl font-medium tracking-tight sm:text-2xl laptop:text-3xl desktop:text-3xl text-transparent uppercase bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text">
                        All together now.
                    </p><p
                        className="mt-8 text-xl laptop:text-2xl desktop:text-3xl font-normal tracking-tight text-white">
                        Rifify aggregates all of your music data into one comprehensive analytics platform.
                    </p></div>
                    <ul className="flex px-5 gap-6 mt-12 lg:text-center justify-between lg:gap-12" role="list">
                        <li>
                            <div><p
                                className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-500 lg:text-4xl">
                                1.5M+
                            </p></div>
                            <div className="mt-2 text-base text-gray-300">Artists</div>
                        </li>
                        <li>
                            <div><p
                                className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-500 lg:text-4xl">
                                90M+
                            </p></div>
                            <div className="mt-2 text-base text-gray-300">
                                Playlists
                            </div>
                        </li>
                        <li>
                            <div><p
                                className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-500 lg:text-4xl">
                                50K+
                            </p></div>
                            <div className="mt-2 text-base text-gray-300">
                                Labels
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <SubHeroCompanies/>
        </section>
    )
})

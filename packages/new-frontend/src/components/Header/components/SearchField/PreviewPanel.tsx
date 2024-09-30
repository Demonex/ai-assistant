import React, {memo, useContext, useMemo} from "react";
import {SearchResultsContext} from "./context/SearchResultsContext.js";
import type {Artists} from "./types.js";
import {Link, useParams} from "wouter";
import PrimaryButton from "../../../PrimaryButton.js";
import {useOpenModalSearch} from "../../../../hooks/useOpenModalSearch.js";
import {useMobileMenu} from "../MobileMenu/hooks/useMobileMenu.js";
import {useSearchData} from "../../hooks/useSearchData.js";


export const PreviewPanel = memo(() => {
    // const {data} = useContext(SearchResultsContext);
    const {searchData} = useSearchData();

    const artistSelected = useMemo<Artists[number] | undefined>(() => searchData.reduce<any>((prev, group) => {
        return prev ? prev : group.items.find(item => item.selected)
    }, undefined), [searchData]);
    const {navigation} = useParams<{
        navigation: string
    }>();
    const {setIsOpenSearchModal} = useOpenModalSearch();
    const {setIsOpen} = useMobileMenu();
    const handleClick = () => {
        setIsOpen(false);
        setIsOpenSearchModal(false);
    };
    return (
        <>
            <div className='flex justify-center'>
                <div
                    className="flex justify-center h-[10.3rem] w-[10.3rem] flex-none rounded-full p-1.5 border-2 border-yellow">
                    <div
                        className="block h-full w-full rounded-full bg-cover bg-no-repeat bg-center"
                        style={{
                            backgroundImage: `url(${artistSelected?.photo})`
                        }}
                    />
                </div>
            </div>
            <div className="flex justify-center text-center mt-8">
                <h1 className="text-[24px] font-bold text-white">
                    {artistSelected?.title}
                </h1>
            </div>
            <Link className='flex justify-center mt-6'
                  to={`/artist/${artistSelected?.id}/${artistSelected?.title}${navigation ? `/${navigation}` : '/analytics'}`}
            onClick={handleClick}
            >
                <PrimaryButton isIcon={false} title='Перейти'
                               className=" px-5 py-3.5 text-caption_m_desk bg-primary_blue rounded-xl hover:scale-105 transition duration-300"/>
            </Link>
            {/*<div>
        <div className="w-full mt-4 mb-6 relative">
          <div className='flex flex-col gap-y-[0.5rem] gap-x-[0.65rem] pt-4'>
            <div className='w-1/2 mx-auto border-t border-gray-600 h-4 -mt-4'/>

            {
              tools.map((tool, indexTool) => (
                <div className='flex justify-center gap-y-[0.5rem] gap-x-[0.65rem] ' key={indexTool}>
                  {
                    tool.map((item, index) => (
                      <a key={index} href=''
                         className='flex items-center gap-2 text-grey-500 text-xs transition-colors duration-200 ease-in-out hover:text-gray-300 py-2'>
                        <h2 className="font-sans-alt uppercase font-semibold tracking-wide">{item.name}</h2>
                        <img src={linkOut} className='h-3 w-3' alt=''/>
                      </a>
                    ))
                  }
                </div>
              ))
            }

          </div>
        </div>
      </div>*/}
        </>
    )
})

import React, {memo, useContext, useMemo} from "react";
import {SearchResultsContext} from "./context/SearchResultsContext.js";
import type {Artists} from "./types.js";
import activityField from '/assets/svg/noun-home-6342633.svg'
import analytics from '/assets/svg/noun-analytic-1362479.svg'
import audience from '/assets/svg/noun-group-676782.svg'
import marketing from '/assets/svg/noun-marketing-6337857.svg'
import catalogue from '/assets/svg/noun-category-2408657.svg'
import linkOut from '/assets/svg/linkOut.svg'
import {Link} from "wouter";

const tools = [
  [
    {
      name: 'activity Feed',
      svg: activityField,
      link: '',

    },
  ],
  [
    {
      name: 'analytics',
      svg: analytics,
      link: '',

    },
    {
      name: 'audience',
      svg: audience,
      link: '',

    },
  ],
  [
    {
      name: 'marketing',
      svg: marketing,
      link: '',

    },
    {
      name: 'catalogue',
      svg: catalogue,
      link: '',

    },
  ]

]

export const PreviewPanel = memo(() => {
  const {data} = useContext(SearchResultsContext);
  const artistSelected = useMemo<Artists[number] | undefined>(() => data.reduce<any>((prev, group) => {
    return prev ? prev : group.items.find(item => item.selected)
  }, undefined), [data]);

  return (
    <>
      <div className='flex justify-center'>
        <div
          className="flex justify-center h-[150px] w-[150px] mr-[16px] mt-[4px] flex-none transition-colors duration-75 ease-out text-grey-400">
          <Link to="/account" className='w-full h-full'>
            <div
              className="block h-full w-full rounded-full bg-cover bg-no-repeat bg-center"
              style={{
                backgroundImage: `url(${artistSelected?.photo})`
              }}
            />
          </Link>

        </div>
      </div>
      <div className="flex justify-center text-center py-[8px] m-auto">
        <h1 className="text-[24px] font-bold text-white">
          {artistSelected?.title}
        </h1>
      </div>
      <div className="leading-normal text-left text-grey-800 mt-[16px] m-auto break-words mb-[16px] text-[14px]">
        <div className='flex justify-center gap-5'>
          {/*{*/}
          {/*  artistSelected?.socialMedia?.map((social, index) => (*/}
          {/*    <img src={social.logo} alt='' className='w-5 h-5 fill-black' key={index}/>*/}
          {/*  ))*/}
          {/*}*/}
        </div>
      </div>
      <div className='flex justify-center py-4'>
        <button type="button"
                className="flex items-center justify-center h-10 px-6 py-2 text-sm font-semibold text-white transition-all rounded-lg hover:to-indigo-600 bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-500">Subscribe
        </button>
      </div>
      <div>
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
      </div>
    </>
  )
})

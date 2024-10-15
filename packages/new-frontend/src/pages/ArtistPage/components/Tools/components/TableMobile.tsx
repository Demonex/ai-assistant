import React, {memo} from "react";
import ChevronRight from "../../../../../assets/ChevronRight.js";
import {useOpenMobileSidebar} from "../../../hooks/useOpenMobileSidebar.js";

const TableMobile = memo(({data,setOpenTrackInfoModal}: any) => {
  return (
    <div className='md:hidden  px-2'>
      {
        data.tableData.map((item, index) => {
          return (
            <div key={index}>
              {
                item.data.rows.map((row, indexRows) => (
                  <div className='py-4 border-b border-secondary_dark_gray/50 flex flex-col gap-4' key={indexRows} onClick={()=>setOpenTrackInfoModal(true)}>
                    {
                      row.cells.filter((_,index) => index === 0).map((cell, cellIndex) => (
                        <div key={cellIndex} className='flex items-center gap-4'>
                          {
                            cell.avatar && (
                              <img src={cell.avatar} alt='' className='w-11 h-11 rounded-[4px]'/>
                            )
                          }
                          <div className='w-full flex items-center justify-between gap-5'>
                            <div>
                              <h1 className='text-t2Regular'>{cell.displayText}</h1>
                              <div className='flex flex-wrap'>
                                {
                                  cell.artistLinks.map((link: any, indexLink: number) => (
                                    <p className='text-caption_s_desk text-medium_grey'
                                       key={indexLink}>{indexLink === cell.artistLinks.length - 1 ? link.text : link.text + ','}</p>
                                  ))
                                }
                              </div>
                            </div>
                            <ChevronRight color='white' width={20} height={20} className='min-w-5'/>
                          </div>
                        </div>
                      ))
                    }
                    <div className='grid grid-cols-3'>
                      {
                        item.data.columns.filter((_,filterIndex) => filterIndex !==0 && filterIndex !== item.data.columns.length-1).map((columnTitle: any, indexTitle: number) => (
                          <div key={indexTitle}>
                            <p key={indexTitle} className='text-caption_r_desk text-light_grey whitespace-nowrap'>{columnTitle.name}</p>
                          </div>
                        ))
                      }
                    </div>
                    <div className='grid grid-cols-3 '>
                      {
                        row.cells.filter((_, index) => (index !== 0 && index !== row.cells.length - 1)).map((cell, cellIndex) => (
                            <p className='text-caption_r_desk text-light_grey -mt-2' key={cellIndex}>{cell.displayText}</p>
                        ))
                      }
                    </div>
                  </div>
                ))
              }

            </div>
          )
        })
      }
    </div>
  )
})
export default TableMobile;

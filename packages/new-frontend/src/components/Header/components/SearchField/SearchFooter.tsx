import {memo} from "react";
import {ShowOnLaptopToDesktop} from "../../../Sizes/ShowOnLaptopToDesktop/ShowOnLaptopToDesktop.js";

export const SearchFooter = memo(() => {
  return (
    <ShowOnLaptopToDesktop>
      <footer
        className="flex items-center justify-end flex-none p-[16px] border-t laptop:justify-between border-[#e2e8f00d] select-none">
        <div className="hidden text-sm laptop:flex text-gray-600">
          <div className="flex items-center mr-[16px]">
            <div className="mr-[8px]">
              <kbd
                className="block rounded w-[24px] bg-gradient-to-tl from-gray-600 to-gray-400/50 border-gray-600 border-b-2 shadow-darker text-gray-600">
              <span
                className="flex items-center justify-center w-full py-[2px] rounded border-t border-l border-r border-gray-600 leading-none">
              <span className="block h-[16px] text-gray-300/75">↵</span>
            </span>
              </kbd>
            </div>
            <span className='text-[11px] font-light text-gray-400/75'>to select</span>
          </div>
          <div className="flex items-center mr-[16px]">
            <div className="flex mr-[8px]">
              <div className="mr-[4px]">
                <kbd
                  className="block rounded w-[24px] bg-gradient-to-tl from-gray-600 to-gray-400/50 border-gray-600 border-b-2 shadow-darker text-gray-600">
              <span
                className="flex items-center justify-center w-full py-[2px] rounded border-t border-l border-r border-gray-600 leading-none">
                <span className="block h-[16px] text-gray-300/75">↓</span></span>
                </kbd>
              </div>
              <kbd
                className="block rounded w-[24px] bg-gradient-to-tl from-gray-600 to-gray-400/50 border-gray-600 border-b-2 shadow-darker text-gray-600">
              <span
                className="flex items-center justify-center w-full py-[2px] rounded border-t border-l border-r border-gray-600 leading-none">
                <span className="block h-[16px] text-gray-300/75">↑</span>
              </span>
              </kbd>
            </div>
            <span className='text-[11px] font-light text-gray-400/75'>to navigate</span>
          </div>
          <div className="flex items-center">
            <div className="mr-[8px]"><kbd
              className="block rounded w-[24px] bg-gradient-to-tl from-gray-600 to-gray-400/50 border-gray-600 border-b-2 shadow-darker text-gray-600"><span
              className="flex items-center justify-center w-full py-[2px] rounded border-t border-l border-r border-gray-600 leading-none"><span
              className="block h-[16px]"><span
              className="text-[10px] -tracking-[1px] text-gray-300/75">esc</span></span></span></kbd></div>
            <span className='text-[11px] font-light text-gray-400/75'>to close</span>
          </div>
        </div>
      </footer>
    </ShowOnLaptopToDesktop>
  )
})

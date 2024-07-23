import {memo, useCallback} from "react";
import {generate} from "random-words";

type SkeletonListProps = {
  items?: number
}
type SkeletonListItemsProps = {
  items?: string | string[]
}

export const SkeletonListItems = memo<SkeletonListItemsProps>(({items = []}) => {
  if (!Array.isArray(items)) {
    return
  }
  return (
    <div aria-hidden="true" className="-m-[2px] opacity-25 leading-none">
      {
        (items as string[]).map(((text, index) => (
          <span className="inline-block rounded-sm m-[2px] bg-grey-400" key={index}>
            <span className="text-transparent">{text}</span>
          </span>
        )))
      }
    </div>
  )
})
const SkeletonList = memo<SkeletonListProps>(({items = 0}) => {
  return (
    <>
      <div className="py-[4px] px-[16px] bg-[#e2e8f00d] text-sm text-grey-600 font-semibold tracking-loose uppercase">
        <span className="block py-[2px] text-smaller">
          <div aria-hidden="true" className="-m-[2px] opacity-25 leading-none">
            <span className="inline-block rounded-sm m-[2px] bg-grey-400">
              <span className="text-transparent">best</span></span>
            <span className="inline-block rounded-sm m-[2px] bg-grey-400">
              <span className="text-transparent">match</span>
            </span>
          </div>
        </span>
      </div>
      <ul role="listbox" aria-labelledby="search-label" id="search-list">
        {
          Array.from({length: items}).map((_, index) => (
            <li role="option" className="relative border-b border-[#e2e8f00d]" key={index}>
              <a
                className="flex justify-between items-center leading-normal py-[4px] px-[16px] transition-colors duration-75 ease-out overflow-hidden text-grey-900 bg-transparent"
                href="">
                <div className="flex items-start overflow-hidden">
                  <div
                    className="flex justify-center h-[24px] w-[16px] pb-[4px] mr-[16px] mt-[4px] flex-none transition-colors duration-75 ease-out text-grey-400">
                    <div className="block h-[16px] w-[16px] bg-grey-400 opacity-25"></div>
                  </div>
                  <div className="flex flex-col truncate py-[4px]">
                    <div
                      className="flex items-center truncate text-sm leading-tight mt-[4px] xl:mt-[2px] mb-[2px] xl:order-2 text-grey-600">
                      <div className="flex-grow-0 truncate min-w-0">
                        <SkeletonListItems items={generate({
                          minLength: 5, maxLength: 9, exactly: 3
                        })}/>
                      </div>
                      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"
                           className="block w-[16px] h-[16px] py-[2px] stroke-current stroke-2 flex-none text-grey-400-opacity-60">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                      <div className="flex-grow-0 truncate min-w-0">
                        <SkeletonListItems items={generate({
                          minLength: 4, maxLength: 5, exactly: 3
                        })}/>
                      </div>
                    </div>
                    <div className="xl:order-1 truncate min-w-0 font-semibold mb-[4px]">
                      <SkeletonListItems items={
                        generate({
                          minLength: 5, maxLength: 8, exactly: 3
                        })}/>
                    </div>
                    <div className="xl:order-3 xl:hidden">
                      <SkeletonListItems
                        items={
                          generate({
                            minLength: 5, maxLength: 11, exactly: 12
                          })}/>
                    </div>
                  </div>
                </div>
                <div hidden={true} className="w-[24px] ml-[8px] p-[2px] flex-none"></div>
              </a>
            </li>
          ))
        }
        <li role="option" className="relative border-grey-200">
          <a
            className="flex justify-between items-center leading-normal py-[4px] px-[16px] transition-colors duration-75 ease-out overflow-hidden text-grey-900 bg-transparent"
            href="">
            <div className="flex items-start overflow-hidden">
              <div
                className="flex justify-center h-[24px] w-[16px] pb-[4px] mr-[16px] mt-[4px] flex-none transition-colors duration-75 ease-out text-grey-400">
                <div className="block h-[16px] w-[16px] bg-grey-400 opacity-25"/>
              </div>
              <div className="flex flex-col truncate py-[4px]">
                <div
                  className="flex items-center truncate text-sm leading-tight mt-[4px] xl:mt-[2px] mb-[2px] xl:order-2 text-grey-600">
                  <div className="flex-grow-0 truncate min-w-0">
                    <SkeletonListItems items={generate({
                      minLength: 3, maxLength: 7, exactly: 3
                    })}/>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"
                       className="block w-[16px] h-[16px] py-[2px] stroke-current stroke-2 flex-none text-grey-400-opacity-60">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                  <div className="flex-grow-0 truncate min-w-0">
                    <SkeletonListItems items={generate({
                      minLength: 4, maxLength: 5, exactly: 3
                    })}/>
                  </div>
                </div>
                <div className="xl:order-1 truncate min-w-0 font-semibold mb-4">
                  <SkeletonListItems items={generate({
                    minLength: 5, maxLength: 8, exactly: 3
                  })}/>
                </div>
                <div className="xl:order-3 xl:hidden">
                  <SkeletonListItems
                    items={generate({
                      minLength: 5, maxLength: 11, exactly: 12
                    })}/>
                </div>
              </div>
            </div>
            <div hidden={true} className="w-[24px] ml-[8px] p-[2px] flex-none"></div>
          </a>
        </li>
      </ul>
    </>
  )
})

export const Skeleton = memo(() => {
  return (
    <>
      <SkeletonList items={0}/>
      <SkeletonList items={5}/>
      <SkeletonList items={5}/>
      <SkeletonList items={3}/>
    </>
  )
})

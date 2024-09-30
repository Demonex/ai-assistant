import React, {memo, useCallback, useRef, useState} from 'react';
import {SearchBar} from './SearchField/index.js';
import {useResizeObserver} from 'usehooks-ts';


type SearchProps = {
  placeholder?: string
  type?: 'small'
}
export const Search = memo<SearchProps>(({
                                           placeholder = 'Найти артиста, лейбл или песню',
                                           type
                                         }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const {width = 0, height = 0} = useResizeObserver<HTMLDivElement>({
    ref: buttonRef
  });
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      {
        type === 'small'
          ? (
            <>
              <div className="h-2"></div>
              <div className="relative pointer-events-auto">
                <button type="button" onClick={openModal}
                        className="hidden min-w-[250px] lg:flex items-center text-sm text-slate-400 rounded-md py-1.5 pl-2 pr-3 bg-transparent border-slate-400/10 border">
                  <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-3 flex-none">
                    <path d="m19 19-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"></path>
                    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round"></circle>
                  </svg>
                  Search<span className="ml-auto pl-3 flex-none text-xs font-semibold">⌘K</span>
                </button>
              </div>
            </>
          )
          : (
            <div
              className={`flex-1 sm:w-full md:w-1/2 lg:max-w-[600px] h-10 px-4 py-2 text-sm text-indigo-300 bg-transparent border rounded-lg border-slate-400/20 sm:text-sm flex flex-row items-center relative`}
            >
              <div
                className="w-full flex justify-between cursor-pointer "
                ref={buttonRef}
              >
                <button
                  className="w-full bg-transparent focus:bg-transparent active:bg-transparent text-gray-400 text-start"
                  onClick={openModal}
                >
                                    <span className="block truncate"
                                          style={{maxWidth: `${width - 45}px`}}>{placeholder}</span>
                </button>
                <div className="cursor-pointer">
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="0 0 1024 1024"
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      padding: '0px 8px'
                    }}
                  >
                    <g transform="scale(1) translate(0, 0)">
                      <path
                        d="M230.606 138.046c175.915-184.059 464.274-184.059 641.509 0s177.246 483.497 0 666.194c-170.631 177.191-444.434 184.057-622.994 19.232l-185.184 192.297c-10.587 10.983-26.459 10.983-37.031 0s-10.587-27.479 0-38.462l185.184-192.297c-158.727-185.438-153.44-469.76 18.523-646.949zM267.637 765.771c156.075 162.080 411.36 162.080 567.451 0s156.078-427.177 0-589.257-411.36-162.080-567.451 0-156.075 427.177 0 589.257z"
                        style={{fill: 'rgb(136, 136, 136)', fillOpacity: 1}}
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          )
      }
      <SearchBar/>
    </>
  );
});

import React, {ChangeEvent, Fragment, memo, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import './styles.css';
import {Skeleton} from './Skeleton.js';
import {SearchResultsPanel} from './SearchResultsPanel.js';
import {PreviewPanel} from './PreviewPanel.js';
import {SearchResultsContext, SearchResultsContextProvider} from './context/SearchResultsContext.js';
import {SearchFooter} from './SearchFooter.js';
import {ShowOnLaptopToDesktop} from '../../../Sizes/ShowOnLaptopToDesktop/ShowOnLaptopToDesktop.js';
import {useLazyFetch} from '../../../../hooks/useFetch.js';
import {BACKEND_URL} from '../../../../constants/index.js';


type SearchFieldProps = {
  isOpen: boolean
  closeModal: () => void
}
type SearchBarProps = SearchFieldProps


const SearchField = memo<SearchFieldProps>(({isOpen, closeModal}) => {
  const {
    data,
    setData
  } = useContext(SearchResultsContext);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const onFocus = useCallback(() => setFocused(true), []);
  const onBlur = useCallback(() => setFocused(false), []);
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const [{data: apiData, loading, error}, fetchResults] = useLazyFetch({
    url: `${BACKEND_URL}/proxy/api/v1/search/search_all`
  });

  useEffect(() => {
    if(!value && data) {
      setData([]);
      return;
    }
    fetchResults({
      params: {
        q: value
      }
    }).catch(console.error);
  }, [value]);

  useEffect(() => {
    if(!apiData) {
      return;
    }
    setData(Object.entries(apiData.groupedResults).map(([k, v]: [string, any[]], ig) => {
      return (
        {
          title: k,
          items: v.map((item, ii) => (
            {
              title: item.name,
              photo: item.imageUrl,
              description: item.type,
              id: item.idUnique,
              selected: ig === 0 && ii === 0
            }
          ))
        }
      );
    }));
  }, [apiData]);

  const onReset = useCallback(() => {
    inputRef.current?.focus();
    setValue('');
  }, []);
  const isLoading = useMemo(() => Boolean(value && loading), [value, loading]);
  useEffect(() => {
    if(!isOpen) {
      return;
    }
    inputRef.current?.focus();
  }, [isOpen]);


  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25"/>
          </Transition.Child>

          <div className="fixed inset-0 bg-[#0f172acc] search-portal-shadow backdrop-blur-[10px]"/>
          <div className="fixed inset-0 overflow-y-auto">
            <div
              className="flex min-h-full items-start justify-center p-4 text-center laptop:pt-[40px] laptop:pb-[32px] laptop:px-[40px]">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="laptop:max-w-[1040px] transition-all w-full flex flex-col justify-between transform align-middle">
                  <div
                    className={`w-full flex flex-col justify-between bg-[#1e293b] shadow-md rounded-md laptop:rounded-lg h-full align-middle transform transition-all text-left search ${value ? 'laptop:max-h-[832px] min-h-[320px]' : ''}`}>
                    <div
                      className="flex items-center flex-none h-[72px] border-b border-[#e2e8f00d]">
                      <div className="w-full h-full">
                        <form
                          className="flex items-center w-full h-full outline-none rounded-tl-lg"
                          action=""
                          noValidate={true}
                          role="search"
                          onReset={onReset}
                          onSubmit={(event) => event.preventDefault()}
                        >
                          <label htmlFor="search-input" id="search-label"
                                 className={`h-full w-[56px] mt-[1px] px-[16px] flex items-center justify-center transition-colors duration-200 ease-in-out ${focused ? 'text-indigo-400' : 'text-gray-400'}`}>
                            {
                              isLoading
                                ? (
                                  <svg viewBox="0 0 100 100" className="flex-none h-[24px]">
                                    <circle cx="50" cy="50" fill="none" r="35" stroke="currentColor"
                                            strokeDasharray="164.93361431346415 56.97787143782138" strokeWidth="4">
                                      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite"
                                                        dur="1s" values="0 50 50;90 50 50;180 50 50;360 50 50"
                                                        keyTimes="0;0.40;0.65;1"/>
                                    </circle>
                                  </svg>
                                )
                                : (
                                  <svg viewBox="0 0 20 20" fill="currentColor"
                                       className="flex-none h-[24px] py-[1px]">
                                    <path
                                      d="M19.71,18.29,16,14.61A9,9,0,1,0,14.61,16l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,19.71,18.29ZM2,9a7,7,0,1,1,12,4.93h0s0,0,0,0A7,7,0,0,1,2,9Z"/>
                                  </svg>
                                )
                            }
                          </label>
                          <div className="relative flex-1">
                            <input
                              ref={inputRef}
                              value={value}
                              onFocus={onFocus}
                              onBlur={onBlur}
                              onChange={onChange}
                              className="flex-1 h-full bg-transparent focus:text-gray-200 text-gray-400 placeholder-gray-400 shadow-none outline-none truncate text-lg sm:text-3xl caret-color-xenon-400 leading-normalized w-full appearance-none rounded-none transition-colors duration-200 ease-in-out font-extralight border-0 focus:ring-0"
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="off"
                              spellCheck="false"
                              placeholder="Search for Artists, Labels or Songs..."
                              maxLength={512}
                              type="search"
                              enterKeyHint="go"
                            />
                          </div>
                          <button type="reset"
                                  className={`items-center justify-center h-full w-[56px] px-[16px] text-gray-400 hover:text-gray-300 opacity-75 fill-current cursor-pointer transition-fast-out flex ${value ? '' : 'hidden'}`}>
                            <svg viewBox="0 0 14 14" className="h-[8px]">
                              <path
                                d="M8.41,7l5.3-5.29A1,1,0,1,0,12.29.29L7,5.59,1.71.29A1,1,0,0,0,.29,1.71L5.59,7,.29,12.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L7,8.41l5.29,5.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/>
                            </svg>
                          </button>
                        </form>
                      </div>
                      <div className="flex-none w-[1px] h-[32px] bg-[#e2e8f00d]"/>
                      <button
                        onClick={closeModal}
                        className="h-full px-[16px] text-gray-400 hover:text-gray-300 transition-fast-out font-extralight">
                        Cancel
                      </button>
                    </div>
                    {
                      value
                        ? (
                          <>
                            <div
                              className={`flex flex-grow overflow-hidden ${isLoading ? 'animate-pulse cursor-wait' : ''}`}>
                              <div className="relative w-full flex-none overflow-y-auto laptop:w-1/2">
                                <div className={isLoading ? 'pointer-events-none' : ''}>
                                  {
                                    isLoading
                                      ? (
                                        <Skeleton/>
                                      )
                                      : (
                                        <SearchResultsPanel
                                          closeModal={closeModal}
                                        />
                                      )
                                  }
                                </div>
                                <div
                                  className="bg-gradient-to-b from-white-opacity-0 to-white w-full h-[32px] sticky bottom-0"/>
                              </div>
                              <ShowOnLaptopToDesktop>
                                <div
                                  className="preview-panel bg-gray-200-opacity-60 hidden laptop:block w-1/2 flex-none overflow-y-auto leading-normal">
                                  <div className="w-full py-[16px] px-[56px]">
                                    <PreviewPanel/>
                                  </div>
                                </div>
                              </ShowOnLaptopToDesktop>
                            </div>
                            <SearchFooter/>
                          </>
                        )
                        : null
                    }
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});
export const SearchBar = memo<SearchBarProps>(({closeModal, isOpen}) => (
  <SearchResultsContextProvider>
    <SearchField closeModal={closeModal} isOpen={isOpen}/>
  </SearchResultsContextProvider>
));


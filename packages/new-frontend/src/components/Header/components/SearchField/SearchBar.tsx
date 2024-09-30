import React, {ChangeEvent, Fragment, memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import './styles.css';
import {Skeleton} from './Skeleton.js';
import {SearchResultsPanel} from './SearchResultsPanel.js';
import {PreviewPanel} from './PreviewPanel.js';
import {SearchResultsContextProvider} from './context/SearchResultsContext.js';
import {useLazyFetch} from '../../../../hooks/useFetch.js';
import {BACKEND_URL} from '../../../../constants/index.js';
import {useOpenModalSearch} from '../../../../hooks/useOpenModalSearch.js';
import LogoNew from '../../../../assets/LogoNew.js';
import SearchIcon from '../../../../assets/SearchIcon.js';
import SecondaryCloseIcon from '../../../../assets/SecondaryCloseIcon.js';
import chevronRight from '/assets/svg/chevronRight_search.svg';
import {Link} from 'wouter';
import debounce from 'lodash.debounce';
import {useSearchData} from '../../hooks/useSearchData.js';

const SearchField = memo(() => {

  const {setSearchData, searchData, setSearchValue} = useSearchData();
  const [fakeLoading, setFakeLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const onFocus = useCallback(() => setFocused(true), []);
  const onBlur = useCallback(() => setFocused(false), []);
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);
  const {isOpenSearchModal, setIsOpenSearchModal} = useOpenModalSearch();
  const [{data: apiData, loading}, fetchResults] = useLazyFetch({
    url: `${BACKEND_URL}/proxy/api/v1/search/search_all`
  });
  const handleDebounceFn = useCallback((value: string) => {
    setFakeLoading(false);
    fetchResults({
      params: {
        q: value,
        excludedModels: 'RadioStation'
      }
    }).catch(console.error);
  }, []);
  const debounceFn = useCallback(debounce(handleDebounceFn, 3 * 1000), []);
  useEffect(() => {
    if(!value && searchData) {
      setFakeLoading(false);
      setSearchData([]);
      return;
    }
    setFakeLoading(true);
    debounceFn(value);
    setSearchValue(value);
  }, [value]);

  useEffect(() => {
    if(!apiData?.groupedResults) {
      return;
    }
    setSearchData(Object.entries(apiData.groupedResults).map(([k, v]: [string, any[]], ig) => {
      return (
        {
          title: k,
          items: v.map((item, ii) => (
            {
              title: item.name,
              photo: item.imageUrl,
              description: item.type,
              id: item.idUnique,
              selected: ig === 0 && ii === 0,
              secondaryText: item.secondaryText
            }
          ))
        }
      );
    }));

  }, [apiData]);
// console.log('apiData',apiData)
  const onReset = useCallback(() => {
    inputRef.current?.focus();
    setValue('');
  }, []);
  const isLoading = useMemo(() => Boolean(value && (loading || fakeLoading)), [value, loading, fakeLoading]);
  useEffect(() => {
    if(!isOpenSearchModal) {
      return;
    }
    inputRef.current?.focus();
  }, [isOpenSearchModal]);
  return (
    <>
      <Transition appear show={isOpenSearchModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpenSearchModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[black]/25"/>
          </Transition.Child>
          <div className="fixed inset-0 bg-[#0C0C0CD9] search-portal-shadow backdrop-blur-[8px]"/>
          <div className="fixed inset-0 overflow-y-auto">
            <div
              className="flex flex-col min-h-full px-4 md:px-8 py-5 gap-5 md:gap-6 lg:px-[10.5rem] text-center laptop:pt-16">
              <div className="flex justify-between items-center">
                <Link to='/'>
                  <LogoNew width={80} className=" lg:hidden"/>
                </Link>
                <button
                  onClick={() => setIsOpenSearchModal(false)}
                  className=" md:hidden text-light_grey text-t2Regular hover:text-gray-300 transition-fast-out ">
                  Отмена
                </button>
              </div>

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
                  className=" transition-all w-full flex gap-10 transform items-start justify-center ">
                  <div
                    className={`w-full laptop:max-w-[1040px] flex flex-col justify-between md:bg-popup_gray  rounded-[.875rem] h-full align-middle transform transition-all text-left search relative ${value ? '' : ''}`}>
                    <Link to='/'>
                      <LogoNew width={105}
                               className="hidden lg:block lg:absolute lg:-left-[9rem] lg:top-3"/>
                    </Link>

                    <div
                      className="flex items-center px-3.5 md:px-6 py-3 bg-popup_gray md:bg-[unset] rounded-xl">
                      <div className="w-full h-full">
                        <form
                          className="flex items-center w-full h-full "
                          action=""
                          noValidate={true}
                          role="search"
                          onReset={onReset}
                          onSubmit={(event) => event.preventDefault()}
                        >
                          <label htmlFor="search-input" id="search-label"
                                 className={`h-full w-10 flex items-center justify-center transition-colors duration-200 ease-in-out ${focused ? 'text-primary_blue' : 'text-gray-400'}`}>
                            {
                              isLoading
                                ? (
                                  <svg viewBox="0 0 100 100"
                                       className="flex-none h-8">
                                    <circle cx="50" cy="50" fill="none" r="35"
                                            stroke="currentColor"
                                            strokeDasharray="164.93361431346415 56.97787143782138"
                                            strokeWidth="4">
                                      <animateTransform attributeName="transform"
                                                        type="rotate"
                                                        repeatCount="indefinite"
                                                        dur="1s"
                                                        values="0 50 50;90 50 50;180 50 50;360 50 50"
                                                        keyTimes="0;0.40;0.65;1"/>
                                    </circle>
                                  </svg>
                                )
                                : (
                                  <SearchIcon className={'fill-medium_grey '} width={30}/>
                                )
                            }
                          </label>
                          <div
                            className="relative flex w-full items-center md:border-r border-dark_grey">
                            <input
                              ref={inputRef}
                              value={value}
                              onFocus={onFocus}
                              onBlur={onBlur}
                              onChange={onChange}
                              className=" h-full bg-transparent focus:text-[white] placeholder-medium_grey outline-none truncate text-t2Regular  w-full transition-colors duration-200 ease-in-out border-0 focus:ring-0 px-6 py-2"
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="off"
                              spellCheck="false"
                              placeholder="Найти артиста, лейбл или песню"
                              maxLength={512}
                              type="search"
                              enterKeyHint="go"
                            />
                            <button type="reset"
                                    className={`items-center justify-center h-full md:mr-6 text-medium_grey hover:text-[white] cursor-pointer transition-fast-out fill-medium_grey flex ${value ? '' : 'hidden'}`}>
                              <SecondaryCloseIcon
                                className="stroke-medium_grey hover:stroke-[white]"/>
                            </button>
                          </div>

                        </form>
                      </div>
                      <button
                        onClick={() => setIsOpenSearchModal(false)}
                        className=" hidden md:block h-full pl-8 pr-2 text-light_grey text-t2Regular hover:text-gray-300 transition-fast-out ">
                        Отмена
                      </button>
                    </div>
                    {
                      value
                        ? (
                          <>
                            <div
                              className={`flex w-full overflow-hidden ${isLoading ? 'animate-pulse cursor-wait' : ''}`}>
                              <div
                                className={`flex flex-col justify-between relative w-full flex-none  md:border-t border-secondary_dark_gray ${searchData?.length === 0 ? 'laptop:w-[100%]' : 'md:w-[60%]'}`}>
                                <div
                                  className={isLoading ? 'pointer-events-none' : 'wrapper'}>
                                  {
                                    isLoading
                                      ? (
                                        <Skeleton/>
                                      )
                                      : (
                                        searchData?.length > 0
                                          ? <SearchResultsPanel
                                            closeModal={() => setIsOpenSearchModal(false)}
                                          />
                                          : <div
                                            className="px-5 pt-4 pb-20 mb:border-b border-b-secondary_dark_gray">
                                            <p className="text-medium_grey text-t2Regular">По
                                              твоему запросу ничего не найдено.</p>
                                          </div>
                                      )
                                  }
                                </div>
                                <Link to={`/all_search_results?q=${value}`}
                                      onClick={() => setIsOpenSearchModal(false)}>
                                  <div
                                    className="w-full px-1 py-5 md:p-5 sticky bottom-0  justify-between items-center cursor-pointer hidden md:flex">
                                    <p className="text-btnText">Смотреть все
                                      результаты</p>
                                    <img src={chevronRight}/>
                                  </div>
                                </Link>
                              </div>
                              {
                                searchData?.length === 0
                                  ? null
                                  : <div
                                    className="border-t border-l border-secondary_dark_gray hidden md:block w-[40%] flex-none overflow-y-auto ">
                                    <div className="w-full py-8 px-5">
                                      <PreviewPanel/>
                                    </div>
                                  </div>
                              }

                            </div>
                            {/*<SearchFooter/>*/}

                          </>
                        )
                        : null
                    }
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
            {
              searchData?.length === 0
                ? null
                : <Link
                  to={`/all_search_results?q=${value}`}
                  onClick={() => setIsOpenSearchModal(false)}
                >
                  <div
                    className="w-full p-5 sticky bottom-0 border-t border-secondary_dark_gray justify-between items-center cursor-pointer flex md:hidden bg-[#0C0C0C]">
                    <p className="text-btnText">Смотреть все результаты</p>
                    <img src={chevronRight}/>
                  </div>
                </Link>
            }

          </div>
        </Dialog>
      </Transition>
    </>
  );
});
export const SearchBar = memo(() => (
  <SearchResultsContextProvider>
    <SearchField/>
  </SearchResultsContextProvider>
));


import {useArtistAudienceMap} from '../../../hooks/useArtistAudienceMap.js';
import chunk from 'lodash.chunk';
import {memo, useCallback, useEffect, useRef, useState} from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import humanNumber from 'human-number';
import {useSizes} from "../../../../../hooks/useSizes.js";
import ArrowDropdown from "../../../../../assets/ArrowDropdown.js";
import {useManageTable} from "../hooks/useManageTable.js";


const SkeletonCountriesTable = memo(() => (
  <SkeletonTheme baseColor="#C7D2FE0D"
                 highlightColor="#C7D2FE12">
    <div className="w-full border-t border-slate-600/40 mt-20 flex flex-col items-center">
      <Skeleton width="10rem" className="my-4"/>
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="items-center inline-flex space-x-2">
          <Skeleton height="2.375rem" width="2.375rem"/>
          <Skeleton width="3rem"></Skeleton>
          <Skeleton height="2.375rem" width="2.375rem"/>
        </div>
        <Skeleton
          className=" min-w-[100px] rounded-md py-1.5 pl-2 pr-3"
          width="18.75rem"/>
        <Skeleton width="7rem"/>
      </div>
      <div className="w-full py-4 ">
        <div className="overflow-x-auto">
          <div
            className="inline-block w-full align-middle border border-gray-800 rounded-xl overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700 w-full">
              <thead>
              <tr>
                {
                  Array.from({length: 4}).map((headerTitle, indexHeaderTitle) => (
                    <th scope="col"
                        className={` p-5 text-left uppercase text-xs font-medium cursor-pointer basis-1`}
                        key={indexHeaderTitle}>
                      <div className="flex items-center">
                        <Skeleton width="7rem"></Skeleton>
                      </div>
                    </th>
                  ))
                }
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 bg-gray-900/40">
              {
                Array.from({length: 24}).map((_, i) => {
                  return (
                    <tr key={i}>
                      <td className="whitespace-nowrap p-5 text-xs uppercase text-gray-300">
                        <div className="flex items-center gap-x-4">
                          <Skeleton width="3rem" height="2rem"/>
                          <Skeleton width={100}></Skeleton>
                        </div>
                      </td>
                      {
                        Array.from({length: 3}).map((data, indexData) => {
                          return (
                            <td className="whitespace-nowrap p-5 text-xs text-gray-300"
                                key={indexData}>{<Skeleton width="2rem"/>}</td>
                          );
                        })
                      }
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </SkeletonTheme>
));
export const CountriesTable = memo(() => {

  const {data: dataMap, mapTabSelected, loading} = useArtistAudienceMap();
  const {searchValue, setSearchValue, setOpenModal, searchRef, setCountryID} = useManageTable();
  const [activeSort, setActiveSort] = useState(1);
  const countriesQty = dataMap?.mapStats[mapTabSelected]?.data.rows;
  const columnTitle = dataMap?.mapStats[mapTabSelected]?.data.columns.map((col) => col.name);
  const [page, setPage] = useState(1);
  const tableKey = dataMap?.mapStats[mapTabSelected]?.data.columns[activeSort]?.name;
  const countryObject: Record<string, unknown>[] = countriesQty?.map((item) => {
    const country = item.countryRow;
    return columnTitle?.reduce((acc, elem, i) => {
      return {
        ...acc,
        [elem]: country[i],
        countryCode: item.countryCode
      };
    }, {});
  }, {}).sort((a, b) => {
    return String(b[tableKey].order).localeCompare(
      String(a[tableKey].order), undefined, {numeric: true}
    );
  }).filter((item: {
    displayText: string
  }[]) => {
    return searchValue !== ''
      ? String(Object.values(item)[0]?.displayText).toLowerCase().startsWith(searchValue.toLowerCase())
      : true;
  });
  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const elementsOnPage = 6;
  const countriesQtyChunk = chunk(countryObject, elementsOnPage);
  const elementsOnPageQtyFrom = page * elementsOnPage - elementsOnPage + 1;
  const elementsOnPageQtyTo = (elementsOnPageQtyFrom - 1) + countriesQtyChunk[page - 1]?.length;
  const handleClickTableHeader = (indexHeaderTitle) => {
    setActiveSort(indexHeaderTitle);
  };
  const clickNext = () => {
    const result = page + 1;
    if (result > countriesQtyChunk?.length) {
      return;
    }
    setPage(result);
  };

  const clickBack = () => {
    const result = page - 1;
    if (page == 1) {
      return;
    }
    setPage(result);
  };
  const handleClickOutside = (e) => {
    if (!searchRef.current?.contains(e.target)) {
      setSearchValue('');
    }
  };
  document.addEventListener('mousedown', handleClickOutside);

  const numbersFormatter = useCallback((value: any) => {
    return value >= 1000 ? humanNumber(value, n => n.toFixed(1)) : value;
  }, []);
  return (
    <>
      {
        !countriesQty
          ? <p className='w-full text-center'>Оформите подписку, чтобы увидкть больше информации</p>
          : <>{
            loading === true
              ? <SkeletonCountriesTable/>
              : <div className="w-full flex flex-col justify-center items-center">
                {
                  dataMap?.mapStats.map((mapStat, index) => {
                    if (mapTabSelected !== index) {
                      return null;
                    }
                    return (
                      <div key={index}
                           className="w-full flex flex-col items-center  lg:px-8">
                        <div className="w-full ">
                          <div className="overflow-x-auto">
                            <div
                              className="inline-block w-full align-middle rounded-xl overflow-hidden overflow-x-auto relative">
                              <table className="min-w-[40rem] m_grey w-full ">
                                <thead className='bg-dark_grey/50'>
                                <tr>
                                  {
                                    mapStat?.data.columns.map((headerTitle, indexHeaderTitle) => (
                                      <th scope="col"
                                          className={`px-2 py-4 md:p-5 text-left text-caption_r_desk md:text-btnText font-medium cursor-pointer basis-1 ${activeSort === indexHeaderTitle ? 'text-medium_grey' : 'text-white'} ${indexHeaderTitle === 0 ? 'w-[38%]' : 'w-auto'}`}
                                          key={indexHeaderTitle}
                                          onClick={() => handleClickTableHeader(indexHeaderTitle)}>
                                        <div className="flex items-center">
                                <span
                                  className=""
                                >{headerTitle.name}</span>
                                          <ArrowDropdown
                                            className={`${activeSort === indexHeaderTitle ? 'fill-white' : 'opacity-0'}`}/>
                                        </div>
                                      </th>
                                    ))
                                  }
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-dark_grey ">
                                {
                                  countriesQtyChunk?.map((countries, indexCountries) => {
                                    if (page - 1 !== indexCountries) {
                                      return;
                                    }
                                    return (
                                      countries.map((item, i) => {
                                        return (
                                          <tr
                                            onClick={() => {
                                              setCountryID(item?.countryCode)
                                              setOpenModal(true)
                                            }}
                                            key={i}>
                                            {
                                              Object.values(item).map((itemObjVal, indexObjVal) => (
                                                <td className="whitespace-nowrap px-2 py-4 md:p-5 text-xs  text-gray-300"
                                                    key={indexObjVal}>
                                                  <div className={`flex items-center  gap-x-4 ${indexObjVal === 0 ? '' : 'justify-center'}`}>
                                                    {
                                                      itemObjVal['avatar']
                                                        ? <img src={itemObjVal['avatar']} alt=""
                                                               className="h-6 w-6"/>
                                                        : null
                                                    }
                                                    <span
                                                      className="block text-white text-caption_r_desk">{numbersFormatter(itemObjVal['displayText'])}</span>
                                                  </div>
                                                </td>
                                              ))
                                            }
                                          </tr>
                                        );
                                      })
                                    );
                                  })
                                }
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className='w-full flex justify-between items-center'>
                            <div className="items-center inline-flex space-x-2">
                              <button
                                className=" cursor-pointer"
                                onClick={clickBack}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="icon icon-tabler icon-tabler-chevron-left stroke-medium_grey"
                                     width="20" height="20" viewBox="0 0 24 24" fill="none">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                  <path d="M15 6l-6 6l6 6"></path>
                                </svg>
                              </button>
                              <p className="whitespace-nowrap px-5 py-3 text-xs text-medium_grey">Страница {page}</p>
                              <button
                                className="cursor-pointer"
                                onClick={clickNext}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="icon icon-tabler icon-tabler-chevron-right stroke-medium_grey"
                                     width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                  <path d="M9 6l6 6l-6 6"></path>
                                </svg>
                              </button>
                            </div>
                            <span
                              className="whitespace-nowrap px-5 py-3  text-xs text-medium_grey">Страницы {elementsOnPageQtyFrom} - {elementsOnPageQtyTo} из {countriesQty?.length || '0'}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
          }</>
      }
    </>
  );
});

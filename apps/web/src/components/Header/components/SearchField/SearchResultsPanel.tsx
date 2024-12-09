import React, {memo, useCallback, useMemo, useState} from 'react';
import useKey from 'react-use/lib/useKey.js';
import type {Artists} from './types.js';
import {Link, useParams} from 'wouter';
import {useMobileMenu} from '../MobileMenu/hooks/useMobileMenu.js';
import {useSearchData} from '../../hooks/useSearchData.js';

type SearchResultsPanelProps = {
  closeModal: () => void
}
export const SearchResultsPanel = memo<SearchResultsPanelProps>(({closeModal}) => {
  const {setIsOpen} = useMobileMenu();
  const [selectedTab, setSelectedTab] = useState(0);
  /* const {
       data,
       setData
   } = useContext(SearchResultsContext);*/
  const {setSearchData, searchData} = useSearchData();

  const onHover = useCallback((indexGroupSelected: number, indexItemSElected: number) => {
    setSearchData(searchData => searchData.map((group, indexGroup) => {
      group.items.forEach((item, indexItem) => {
        item.selected = indexItem === indexItemSElected && indexGroup === indexGroupSelected;
      });
      return group;
    }));
  }, []);

  const artistSelected = useMemo<Artists[number] | undefined>(() => searchData.reduce<any>((prev, group) => {
    return prev ? prev : group.items.find(item => item.selected);
  }, undefined), [searchData]);

  const [prevIndexGroup, prevIndexItem] = useMemo<[number, number]>(() => searchData.reduce<any>((prev, group, _indexGroup, array) => {
    const isSelectedGroup = group.items.find(item => item.selected);
    if (!isSelectedGroup) {
      return prev;
    }
    const indexItem = group.items.findIndex(item => item.selected) - 1;
    const indexGroup = indexItem === -1 ? (_indexGroup - 1 === -1 ? array.length - 1 : _indexGroup - 1) : _indexGroup;
    return [indexGroup, indexItem === -1 ? array[indexGroup].items.length - 1 : indexItem];
  }, []), [searchData]);

  const [nextIndexGroup, nextIndexItem] = useMemo<[number, number]>(() => searchData.reduce<any>((prev, group, _indexGroup, array) => {
    const isSelectedGroup = group.items.find(item => item.selected);
    if (!isSelectedGroup) {
      return prev;
    }
    let indexItem = group.items.findIndex(item => item.selected) + 1;
    const indexGroup = array[_indexGroup].items[indexItem] ? _indexGroup : (_indexGroup + 1 === array.length ? (() => {
      indexItem = 0;
      return 0;
    })() : (() => {
      indexItem = 0;
      return _indexGroup + 1;
    })());
    return [indexGroup, indexItem];
  }, []), [searchData]);

  const onArrowUp = useCallback(() => {
    onHover(prevIndexGroup, prevIndexItem);
  }, [prevIndexGroup, prevIndexItem]);

  const onArrowDown = useCallback(() => {
    onHover(nextIndexGroup, nextIndexItem);
  }, [nextIndexGroup, nextIndexItem]);

  const onEnter = useCallback(() => {
  }, [artistSelected]);

  // @ts-ignore
  useKey('ArrowUp', onArrowUp, {}, [onArrowUp]);
  // @ts-ignore
  useKey('ArrowDown', onArrowDown, {}, [onArrowDown]);
  // @ts-ignore
  useKey('Enter', onEnter, {}, [onEnter]);

  const {navigation} = useParams<{
    navigation: string
  }>();

  const handleClick = useCallback(() => {
    setIsOpen(false);
    closeModal();
  }, []);
  return (
    <>
      <div className="px-5 py-4 flex items-center justify-start gap-2 mt-2.5 md:mt-0 flex-wrap">
        {
          searchData?.map(({title}, indexGroup) => {
            return (
              <button
                key={indexGroup}
                className={`px-6 py-2 rounded-[30px] border border-solid border-secondary_dark_gray ${selectedTab === indexGroup ? 'bg-yellow' : 'hover:border-yellow text-medium_grey hover:text-white'}`}
                onClick={() => setSelectedTab(indexGroup)}
              >
                <h2
                  className={`capitalize text-caption_m_desk  ${selectedTab === indexGroup ? 'text-[black]' : ' '}`}>{title}</h2>
              </button>
            );
          })
        }
      </div>
      {
        Object.entries(searchData[selectedTab] ?? {}).map(([, value], index) => {
          return (
            <div key={index}>
              {
                Array.isArray(value) && value.filter(_ => _).map((item, indexItem) => (
                  <div className="py-3 px-5 border-b border-secondary_dark_gray hover:bg-gradient-to-r from-[#3272FB] to-[#5A31FF] group"
                       onMouseEnter={() => onHover(selectedTab, indexItem)}
                       key={indexItem}
                  >
                    <Link
                      to={`/artist/${item.id}/${item.title}${navigation ? `/${navigation}` : '/analytics'}`}
                      onClick={handleClick}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full overflow-hidden">
                          <img src={item.photo}/>
                        </div>
                        <div className="">
                          <h3 className="text-t2Regular truncate">{item.title}</h3>
                          <p className="text-caption_s_desk text-medium_grey capitalize  group-hover:text-light_grey">{item.secondaryText}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              }
            </div>

          );
        })
      }
      {/*{data.map(({items, title}, indexGroup) => (
        <div key={indexGroup}>
          <div
            className="py-[4px] px-[16px] bg-[#e2e8f00d] text-sm text-grey-600 font-semibold tracking-loose uppercase">
            <span className="block py-[2px] text-[11px]">
              <div className="my-[1px]">{title}</div>
            </span>
          </div>
          <ul role="listbox">
            {
              items.map((item, indexItem) => (
                <li role="option" className="relative border-b border-[#e2e8f00d]" key={indexItem}
                    onMouseEnter={() => onHover(indexGroup, indexItem)}>
                  <Link to={`/artist/${item.id}/${item.title}${navigation ? `/${navigation}` : '/analytics'}`}
                        className={`flex justify-between items-center leading-normal py-[4px] px-[16px] transition-colors duration-75 ease-out overflow-hidden ${item.selected ? 'text-white bg-indigo-600 shadow' : 'text-gray-900 bg-transparent '}`}
                        onClick={handleClick}
                  >
                    <div className="flex items-start overflow-hidden">
                      <div
                        className="flex justify-center h-[24px] w-[24px] mr-[16px] mt-[4px] flex-none transition-colors duration-75 ease-out text-grey-400">
                        <div
                          className="block h-full w-full rounded-full bg-cover bg-no-repeat bg-center"
                          style={{
                            backgroundImage: `url(${item.photo})`
                          }}
                        />
                      </div>
                      <div className="flex flex-col truncate">
                        <div
                          className={`flex items-center truncate text-sm leading-tight mt-[4px] xl:mt-[2px] mb-[2px] xl:order-2  ${item.selected ? 'text-gray-300' : 'text-gray-500'}`}>
                          <div className={`flex-grow-0 truncate min-w-0 capitalize text-[12px]`}>
                            <div className="truncate">{item.description}</div>
                          </div>
                        </div>
                        <div
                          className={`xl:order-1 truncate min-w-0 font-semibold text-[14px] ${item.selected ? 'text-white' : 'text-gray-400'}`}>
                          <div className="truncate">{item.title}</div>
                        </div>
                      </div>
                    </div>
                    <div className={`w-[24px] ml-[8px] p-[2px] flex-none ${item.selected ? '' : 'hidden'}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                           strokeLinecap="round" strokeLinejoin="round" className="block h-auto w-[16px]">
                        <polyline points="9 10 4 15 9 20"></polyline>
                        <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                      </svg>
                    </div>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      ))}*/}
    </>
  );
});

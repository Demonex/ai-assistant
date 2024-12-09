import React, {memo, useState} from 'react';
import '../../../index.css';
import ChevronRight from '../../../assets/ChevronRight.js';
import SearchIcon from '../../../assets/SearchIcon.js';
import ShareIcon from '../../../assets/ShareIcon.js';
import PlusIcon from '../../../assets/PlusIcon.js';
import chunk from 'lodash.chunk';
import {ShowOnMobileToTablet} from '../../../components/showFromMobileToTablet/index.js';

const tableData = {
  'result': 'success',
  'message': 'Data Retrieved.',
  'tableData': [
    {
      'name': 'Playlists',
      'id': 'apple_playlists',
      'data': {
        'columns': [],
        'rows': [],
        'sortedById': 'apple_music_days_in',
        'canFilterByTime': true
      },
      'action': 'add_playlist'
    },
    {
      'name': 'Track Charts',
      'id': 'apple_charts',
      'data': {
        'columns': [],
        'rows': [],
        'sortedById': 'apple_music_chart_days_in',
        'canFilterByTime': true
      }
    },
    {
      'name': 'Album Charts',
      'id': 'apple_album_charts',
      'data': {
        'columns': [],
        'rows': [],
        'sortedById': 'apple_music_chart_days_in',
        'canFilterByTime': true
      }
    }
  ],
  'sourceId': 'apple_music',
  'accountIdUnique': 'zgrqvky5',
  'trackId': 497989,
  'trackIdUnique': 'kvqtrzbx',
  'isRestricted': false,
  'hasAccess': true
};
const filter = [
  {title: 'Все'},
  {title: 'Текущие'},
  {title: 'Предыдущие'}
];

const TableItem = memo<{
  value: any
  rowsLength: number
}>(({value, rowsLength}) => {
  return value.cells.map((cell, index) => cell.displayText && (
    <td className={`p-4  ${index === 0 ? 'pl-8 ' : ''}  ${index === rowsLength - 1 ? 'pr-8' : ''}`} key={index}>
      <div className="flex gap-4 items-center">
        {
          cell.avatar && (
            <img src={cell.avatar} alt={cell.title} className="w-8 h-8 rounded-lg"/>
          )
        }
        <p
          className={`text-caption_r_desk truncate ${index === 0 ? 'text-white' : 'text-light_grey'}`}>{cell.displayText}</p>
      </div>
    </td>
  ));
});
const TableItemMobile = memo<{
  value: any
  titles: any
}>(({value, titles}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-7 gap-4">
        {
          titles.filter((_, index) => index > 0 && index !== value.cells.length - 1).map((title, index) => (
            <p className="text-caption_r_desk text-light_grey" key={index}>{title.name}</p>
          ))
        }
      </div>
      <div className="grid grid-cols-7 gap-4">
        {
          value.cells.filter((_, index) => index > 0).map((cell, index) => cell.displayText && (
            <div className={'   '} key={index}>
              <div className="flex gap-4 items-center ">
                {
                  cell.avatar && (
                    <img src={cell.avatar} alt={cell.title} className="w-8 h-8 rounded-lg"/>
                  )
                }
                <p
                  className={`text-t2Regular truncate ${index === 0 ? 'text-white' : 'text-light_grey'}`}>{cell.displayText}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>

  );
});
const TrackTable = memo(() => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');


  const [chunkedRowsIndex, setChunkedRowsIndex] = useState(0);
  const [dataType, setDataType] = useState('table');
  const [dataTrackType, setDataTrackType] = useState(0);
  const [filterType, setFilterType] = useState(0);


  const titles = tableData.tableData[dataTrackType].data.columns;
  const rows: typeof tableData['tableData'][number]['data']['rows'][number][] = tableData.tableData[dataTrackType].data.rows.filter(item => {
    if(!searchValue) {
      return true;
    }
    return item.cells.filter(val => {
      return String(val.displayText).toLowerCase().includes(searchValue.toLowerCase());
    }).length;
  });
  const elementsOnPage = 10;
  const chunkedRows = chunk(rows, elementsOnPage);
  const clickNext = () => {
    const result = page + 1;
    const resultIndex = chunkedRowsIndex + 1;
    if(result > chunkedRows?.length) {
      return;
    }
    setPage(result);
    if(resultIndex > chunkedRows?.length - 1) {
      return;
    }
    setChunkedRowsIndex(resultIndex);
  };

  const clickBack = () => {
    const result = page - 1;
    const resultIndex = chunkedRowsIndex - 1;
    if(page === 1) {
      return;
    }
    setPage(result);
    if(page === 1) {
      return;
    }
    setChunkedRowsIndex(resultIndex);
  };
  return (
    <div
      className="w-full flex flex-col gap-4 justify-center relative mb-[100px]  py-8 lg:p-8 lg:bg-popup_gray/50 rounded-[20px]">
      <div className="w-full pb-4 border-secondary_dark_gray border-b">
        <h1 className="text-btnText text-light_grey">Детали и локации</h1>
      </div>
      <div className="py-2 flex justify-between gap-4 lg:gap-10 flex-wrap">
        <div className=" flex justify-between border border-yellow rounded-[30px] overflow-hidden text-caption_m_desk">
          <button
            onClick={() => setDataType('table')}
            className={`w-full py-2 px-6 transition-all  ${dataType === 'table' ? 'bg-yellow text-black' : ''}`}>
            <span>Детали</span>
          </button>
          <button
            onClick={() => setDataType('map')}
            className={`w-full py-2 px-6 ${dataType === 'map' ? 'bg-yellow text-black' : ''}`}>
            <span>Локации</span>
          </button>
        </div>
        <ul className="flex gap-4 flex-wrap">
          {
            tableData.tableData.map((type, index) => (
              <li
                onClick={() => setDataTrackType(index)}
                className={`cursor-pointer p-2 text-caption_m_desk transition-all ${dataTrackType === index ? 'text-medium_grey' : 'text-white'}`}
                key={index}>{type.name}</li>
            ))
          }
        </ul>
        <ul className="flex gap-2 flex-wrap">
          {
            filter.map((type, index) => (
              <li
                onClick={() => setFilterType(index)}
                className={`cursor-pointer py-2 px-6 border border-secondary_dark_gray rounded-[30px] transition-all duration-200 text-caption_m_desk ${filterType === index ? 'bg-yellow text-black' : 'text-medium_grey hover:border-yellow hover:text-white'}`}
                key={index}>{type.title}</li>
            ))
          }
        </ul>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex gap-2 items-center">
          <button onClick={clickBack}>
            <ChevronRight className={` w-5 h-5 rotate-180 ${page === 1 ? 'fill-medium_grey' : 'fill-white'}`}/>
          </button>
          <div className="py-2 px-4 text-caption_r_desk text-medium_grey">
            <span>{page}/{chunkedRows.length}</span>
          </div>
          <button onClick={clickNext}>
            <ChevronRight className={` w-5 h-5 ${page === chunkedRows.length ? 'fill-medium_grey' : 'fill-white'}`}/>
          </button>
        </div>
        <div className="flex items-center gap-10 w-1/2 justify-end">
          <div
            className="hidden md:flex py-2.5 px-3.5 border border-solid border-secondary_dark_gray rounded-xl gap-2 items-center w-full max-w-[20rem]">
            <SearchIcon className="w-5 h-5 fill-medium_grey"/>
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              placeholder="Поиск"
              className="placeholder:text-medium_grey text-caption_r_desk"/>
          </div>
          <div className="flex items-center gap-8 ">
            <PlusIcon className="stroke-white cursor-pointer "/>
            <ShareIcon className="fill-white cursor-pointer "/>
          </div>
        </div>

      </div>
      <div>
        <div
          className="py-2.5 px-3.5 border border-solid border-secondary_dark_gray rounded-xl flex gap-2 items-center w-full max-w-[20rem]">
          <SearchIcon className="w-5 h-5 fill-medium_grey"/>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder="Поиск"
            className="placeholder:text-medium_grey text-caption_r_desk"/>
        </div>
      </div>
      <div className="w-full rounded-t-[20px] overflow-hidden mt-2 hidden lg:block">
        <div className="w-full overflow-auto">
          <table className=" w-full">
            <thead>
            <tr className="bg-[#27272780]">
              {
                titles.filter((_, index) => index !== titles.length - 1).map((title, index) => (
                  <th
                    className={`py-8 px-3 text-btnText whitespace-nowrap text-start  ${index === 0 ? 'min-w-[15rem] pl-8' : ''} ${index === titles.length - 1 ? ' pr-8' : ''}`}
                    key={index}>{title.name}</th>
                ))
              }
            </tr>
            </thead>
            <tbody className="divide-y divide-secondary_dark_gray">
            {
              chunkedRows[chunkedRowsIndex].map((value, index) => (
                <tr
                  className={`py-8 px-3 text-btnText whitespace-nowrap text-start  ${index === 0 ? 'min-w-[15rem]' : ''}`}
                  key={index}>
                  <TableItem value={value} rowsLength={rows.length}/>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>

      </div>
      <ShowOnMobileToTablet>
        <ul>
          {
            chunkedRows[chunkedRowsIndex].map((value, index) => (
              <li
                className={'flex flex-col gap-4 text-btnText whitespace-nowrap text-start py-4 border-b border-secondary_dark_gray/50'}
                key={index}>
                {
                  <div className="flex gap-4 items-center">
                    {
                      value.cells[0].avatar && (
                        <img src={value.cells[0].avatar} alt="" className="w-8 h-8 rounded-lg"/>
                      )
                    }
                    <p
                      className={`text-t2Regular truncate ${index === 0 ? 'text-white' : 'text-light_grey'}`}>{value.cells[0].displayText}</p>
                  </div>
                }
                <TableItemMobile value={value} titles={titles}/>
              </li>
            ))
          }
        </ul>
      </ShowOnMobileToTablet>
    </div>
  );
});
export default TrackTable;

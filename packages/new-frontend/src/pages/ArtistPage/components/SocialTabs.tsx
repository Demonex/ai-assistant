import {memo, useCallback} from 'react';
import {favoriteSources, overviewSources} from '../../../data/consts/favoriteSources.js';
import get from 'lodash.get';
import {useArtist} from '../hooks/useArtist.js';

export const Tabs = memo(() => {
  const {source, setSource} = useArtist();
  const handleClick = useCallback((index: number) => {
    setSource(get(overviewSources, `${index}.slug`));
  }, [source, overviewSources]);
  return (
    <ul
      className="border-b space-x-6 flex whitespace-nowrap border-slate-200/5 mb-px overflow-x-auto overflow-y-hidden">
      {
        overviewSources.map((sourceItem, index) => (
          <li key={index}>
            <button
              className={`pt-3 pb-2.5 capitalize flex text-4 leading-6 font-semibold  border-b  ${source === sourceItem.slug ? 'text-indigo-400 border-indigo-500' : 'border-transparent text-slate-200 hover:border-slate-700'}`}
              onClick={() => handleClick(index)}
            >{sourceItem.name}</button>
          </li>
        ))
      }
    </ul>
  );
});

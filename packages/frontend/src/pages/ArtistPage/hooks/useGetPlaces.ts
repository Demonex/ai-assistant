import useSharedHook from '../../../hooks/useSharedHook.js';
import {useEffect, useState} from "react";
import {useLazyFetch} from "../../../hooks/useFetch.js";
import {BACKEND_URL} from "../../../constants/index.js";

type valueAllResultsType = {
  value?: string,
  length?: number
}
type searchDataType = {
  message?: string,
  q?: string,
  result?: string,
  results?: {
    type: string,
    data: {
      countryCode:string
      createdAt:string
      googleMapsLocation:string
      id:number
      imageUrl:string
      isSquareImage:boolean
      lat:string
      lng:string
      longregion:string
      name:string
      population:number
      region:any
      searchSimilarityScore:number
      type:string
      unaccentedName:string
      updatedAt:string
    }[]
  }[]
}
const _useGetPlaces = () => {
  const [value, setValue] = useState('');
  const [valueAllResults, setValueAllResults] = useState<valueAllResultsType>({});
  const [searchDataAllResults, setSearchDataAllResults] = useState<any>({});
  const [renderResultContent, setRenderResultContent] = useState('');
  const [{data: searchData, loading, error}, fetchData] = useLazyFetch({
    url: `${BACKEND_URL}/proxy/api/v1/search/search_simple`,
    cache: import.meta.env.VITE_CACHE === 'false'
  });
  useEffect(() => {
    fetchData({
      params: {
        q: value,
        type: 'city-artist'
      }
    }).catch(console.error);
  }, [value]);

  return {
    searchData,
    value,
    setValue,
    valueAllResults,
    setValueAllResults,
    searchDataAllResults,
    setSearchDataAllResults,
    renderResultContent,
    setRenderResultContent
  };
};

export const useGetPlaces = () => useSharedHook<ReturnType<typeof _useGetPlaces>>(_useGetPlaces);

import useSharedHook from "../useSharedHook";
import { useEffect, useState } from "react";
import { useLazyFetch } from "../useFetch";
import throttle from "lodash.throttle";

const _useSearch = () => {
  const [value, setValue] = useState<string>();
  const [{ data: apiData, loading, error }, fetchSearch] = useLazyFetch();
  const [data, setData] = useState<any>();
  useEffect(() => {
    if (!apiData) {
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
  useEffect(() => {
    if (!value) {
      return;
    }
    fetchSearch({
      url: `https://backend.musicstats.ru/api/rest/proxy/api/v1/search/search_all?q=${value}`
    });
  }, [value]);

  return {
    data,
    loading,
    error,
    setValue: throttle(setValue, 1000, { leading: false }),
    value
  };
};

export const useSearch = () => useSharedHook<ReturnType<typeof _useSearch>>(_useSearch);

export default {
  useSearch
}
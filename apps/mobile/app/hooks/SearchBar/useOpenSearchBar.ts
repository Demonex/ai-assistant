import useSharedHook from "../useSharedHook";
import {  useState } from "react";


const _useOpenSearchBar = () => {

  const [openSearchBar, setOpenSearchBar] = useState<any>(false);

  return {
    openSearchBar,
    setOpenSearchBar
  };
};

export const useOpenSearchBar = () => useSharedHook<ReturnType<typeof _useOpenSearchBar>>(_useOpenSearchBar);

export default {
  useOpenSearchBar
}
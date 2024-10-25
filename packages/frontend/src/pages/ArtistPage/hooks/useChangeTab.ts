import React, {useState} from 'react';
import useSharedHook from "../../../hooks/useSharedHook.js";

type Props = {
  changeTab: number;
  setChangeTab: React.Dispatch<React.SetStateAction<Props['changeTab']>>;

}
const _useChangeTab = (): Props => {
  const [changeTab, setChangeTab] = useState(0);
  return {
    changeTab,
    setChangeTab,

  };
};
export const useChangeTab = () => useSharedHook<ReturnType<typeof _useChangeTab>>(_useChangeTab);
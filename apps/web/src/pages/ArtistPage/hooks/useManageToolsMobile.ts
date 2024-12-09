import type React from 'react';
import {useState} from 'react';
import useSharedHook from "../../../hooks/useSharedHook.js";

type Props = {
  mobileRender: string;
  setMobileRender: React.Dispatch<React.SetStateAction<Props['mobileRender']>>;

}
const _useManageToolsMobile = (): Props => {
  const [mobileRender, setMobileRender] = useState('public');

  return {
    mobileRender,
    setMobileRender,

  };
};
export const useManageToolsMobile = () => useSharedHook<ReturnType<typeof _useManageToolsMobile>>(_useManageToolsMobile);

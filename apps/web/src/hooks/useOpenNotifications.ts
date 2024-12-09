import React, {useState} from 'react';
import useSharedHook from './useSharedHook.js';

type Props = {
  openNotifications: boolean;
  setOpenNotifications: React.Dispatch<React.SetStateAction<Props['openNotifications']>>;
}
const _useOpenNotifications = (): Props => {
  const [openNotifications, setOpenNotifications] = useState(false);


  return {
    openNotifications,
    setOpenNotifications
  };
};
export const useOpenNotifications = () => useSharedHook<ReturnType<typeof _useOpenNotifications>>(_useOpenNotifications);
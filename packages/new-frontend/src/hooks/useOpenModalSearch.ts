import React, {useState} from 'react';
import useSharedHook from './useSharedHook.js';

type Props = {
  isOpenSearchModal: boolean;
  setIsOpenSearchModal: React.Dispatch<React.SetStateAction<Props['isOpenSearchModal']>>;
}
const _useOpenModalSearch = (): Props => {
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);

  return {
    isOpenSearchModal,
    setIsOpenSearchModal
  };
};
export const useOpenModalSearch = () => useSharedHook<ReturnType<typeof _useOpenModalSearch>>(_useOpenModalSearch);
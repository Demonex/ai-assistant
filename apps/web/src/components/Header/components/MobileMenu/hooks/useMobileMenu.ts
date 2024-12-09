import useSharedHook from "../../../../../hooks/useSharedHook.js";

import type React from 'react';
import {useState} from 'react';


const _useMobileMenu = (): {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
} => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    setIsOpen,
  };
};

export const useMobileMenu = () => useSharedHook<ReturnType<typeof _useMobileMenu>>(_useMobileMenu);

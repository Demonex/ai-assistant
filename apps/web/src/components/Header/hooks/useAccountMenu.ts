import useSharedHook from "../../../hooks/useSharedHook.js";
import { useCallback, useState } from "react";

const _useHeaderAccountMenu = (): {
	opened: boolean;
	openMenu: () => void;
	toggleMenu: () => void;
	closeMenu: () => void;
} => {
	const [opened, setOpened] = useState(false);
	const openMenu = useCallback(() => {
		setOpened(true);
	}, []);
	const toggleMenu = useCallback(() => {
		setOpened((prev) => !prev);
	}, []);
	const closeMenu = useCallback(() => {
		setOpened(false);
	}, []);
	return {
		opened,
		openMenu,
		toggleMenu,
		closeMenu,
	};
};

export const useHeaderAccountMenu = () =>
	useSharedHook<ReturnType<typeof _useHeaderAccountMenu>>(
		_useHeaderAccountMenu,
	);

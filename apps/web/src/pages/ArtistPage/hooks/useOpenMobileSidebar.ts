import type React from "react";
import { useState } from "react";
import useSharedHook from "../../../hooks/useSharedHook.js";

type Props = {
	openMobileSidebar: boolean;
	setOpenMobileSidebar: React.Dispatch<
		React.SetStateAction<Props["openMobileSidebar"]>
	>;
};
const _useOpenMobileSidebar = (): Props => {
	const [openMobileSidebar, setOpenMobileSidebar] = useState(false);

	return {
		openMobileSidebar,
		setOpenMobileSidebar,
	};
};
export const useOpenMobileSidebar = () =>
	useSharedHook<ReturnType<typeof _useOpenMobileSidebar>>(
		_useOpenMobileSidebar,
	);

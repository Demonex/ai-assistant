import type React from "react";
import { useState } from "react";
import useSharedHook from "../../../hooks/useSharedHook.js";
import type { Artists } from "../components/SearchField/types.js";

type Props = {
	searchData: {
		title: string;
		items: (Artists[number] & {
			selected?: boolean;
		})[];
	}[];
	setSearchData: React.Dispatch<React.SetStateAction<Props["searchData"]>>;
};
const _useSearchData = () => {
	const [searchData, setSearchData] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	return {
		searchData,
		setSearchData,
		searchValue,
		setSearchValue,
	};
};
export const useSearchData = () =>
	useSharedHook<ReturnType<typeof _useSearchData>>(_useSearchData);

import type React from "react";
import { useEffect, useRef, useState } from "react";
import useSharedHook from "../../../../../hooks/useSharedHook.js";
import { useLazyFetch } from "../../../../../hooks/useFetch.js";
import { BACKEND_URL } from "../../../../../constants/index.js";
import { useArtist } from "../../../hooks/useArtist.js";

type Props = {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<Props["searchValue"]>>;
	searchRef: any;
	mapType: string;
	setMapType: React.Dispatch<React.SetStateAction<Props["mapType"]>>;
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<Props["openModal"]>>;
	countryID: string | unknown;
	setCountryID: React.Dispatch<React.SetStateAction<Props["countryID"]>>;
	dataPopup: any;
};
const _useManageTable = (): Props => {
	const { source, id } = useArtist();
	const [searchValue, setSearchValue] = useState("");
	const [openModal, setOpenModal] = useState(false);
	const [countryID, setCountryID] = useState("");
	const searchRef = useRef(null);
	const [mapType, setMapType] = useState("map");
	const [{ data: dataPopup, loading, error }, fetchData] = useLazyFetch<any>({
		url: `${BACKEND_URL}/proxy/api/v1/popup_data/popup_data?source=${source}&popupStyle=location&popupType=Country&popupIdUnique=${countryID}&sourceId=${source}&idUnique=${id}`,
	});
	useEffect(() => {
		if (!id || !source || !countryID) {
			return;
		}
		void fetchData();
	}, [id, source, countryID]);
	return {
		searchValue,
		setSearchValue,
		searchRef,
		mapType,
		setMapType,
		openModal,
		setOpenModal,
		countryID,
		setCountryID,
		dataPopup,
	};
};
export const useManageTable = () =>
	useSharedHook<ReturnType<typeof _useManageTable>>(_useManageTable);

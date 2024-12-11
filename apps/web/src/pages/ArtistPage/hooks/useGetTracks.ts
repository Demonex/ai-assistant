import useSharedHook from "../../../hooks/useSharedHook.js";
import { useEffect, useState } from "react";
import { useArtist } from "./useArtist.js";
import { FetchError, useLazyFetch } from "../../../hooks/useFetch.js";
import { TrackDataType } from "../types.js";
import { BACKEND_URL } from "../../../constants/index.js";

const _useGetTracks = () => {
	const { id, source } = useArtist();
	const [search, setSearch] = useState("");
	const [tracks, setTracks] = useState([]);
	const [sortTracks, setSortTracks] = useState(false);
	const [sortDate, setSortDate] = useState(false);
	const [selectedTrack, setSelectedTrack] = useState([]);
	const [openPopUp, setOpenPopUp] = useState(false);
	const [isRequestSent, setIsRequestSent] = useState(false);
	const [buttonHandling, setButtonHandling] = useState("");

	const [{ data, loading, error }, fetchData] = useLazyFetch<any>({
		url: `${BACKEND_URL}/proxy/api/v1/tracks/get_tracks`,
	});

	function dateToNum(d) {
		return new Date(d).getTime();
	}

	useEffect(() => {
		if (!id) {
			return;
		}
		void fetchData({
			params: {
				idUnique: id,
			},
		});
	}, [id]);
	useEffect(() => {
		if (!data?.tracks) {
			return;
		}
		setTracks(data?.tracks);
	}, [data]);
	useEffect(() => {
		const result = data?.tracks?.filter((item) => {
			if (!search) {
				return true;
			}
			const found = item?.trackName
				.toLowerCase()
				.includes(search.toLowerCase().trim());
			return found;
		});
		setTracks(result);
	}, [search, data]);

	useEffect(() => {
		setTracks(() => {
			if (!sortTracks) {
				return tracks?.sort((a, b) => b.trackName.localeCompare(a.trackName));
			}
			return tracks?.sort((a, b) => a.trackName.localeCompare(b.trackName));
		});
	}, [sortTracks]);

	useEffect(() => {
		setTracks(() => {
			if (!sortDate) {
				return tracks?.sort(
					(a, b) => dateToNum(b.createdAt) - dateToNum(a.createdAt),
				);
			}
			return tracks?.sort((a, b) => {
				return dateToNum(a.createdAt) - dateToNum(b.createdAt);
			});
		});
	}, [sortDate]);
	return {
		tracks,
		loading,
		error,
		id,
		search,
		setSearch,
		setSortTracks,
		setSortDate,
		sortTracks,
		sortDate,
		setTracks,
		selectedTrack,
		setSelectedTrack,
		openPopUp,
		setOpenPopUp,
		isRequestSent,
		setIsRequestSent,
		buttonHandling,
		setButtonHandling,
	};
};

export const useGetTracks = () =>
	useSharedHook<ReturnType<typeof _useGetTracks>>(_useGetTracks);

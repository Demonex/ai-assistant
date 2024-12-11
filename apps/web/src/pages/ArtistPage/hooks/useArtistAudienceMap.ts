import useSharedHook from "../../../hooks/useSharedHook.js";
import type React from "react";
import { useEffect, useState } from "react";
import { useArtist } from "./useArtist.js";
import { type FetchError, useLazyFetch } from "../../../hooks/useFetch.js";
import type { ResponseAudienceMapStats } from "../types.js";
import { BACKEND_URL } from "../../../constants/index.js";

const _useArtistAudienceMap = (): {
	mapTabSelected: number;
	setMapTabSelected: React.Dispatch<React.SetStateAction<number>>;
	mapButtonSelected: number;
	setMapButtonSelected: React.Dispatch<React.SetStateAction<number>>;
	data?: ResponseAudienceMapStats;
	loading: boolean;
	error?: FetchError<any>;
} => {
	const { id, source } = useArtist();
	const [mapTabSelected, setMapTabSelected] = useState(0);
	const [mapButtonSelected, setMapButtonSelected] = useState(0);
	const [{ data, loading, error }, fetchMap] =
		useLazyFetch<ResponseAudienceMapStats>({
			url: `${BACKEND_URL}/proxy/api/v1/audience/map_stats`,
		});

	useEffect(() => {
		if (!id || !source) {
			return;
		}

		fetchMap({
			params: {
				idUnique: id,
				source,
			},
		}).catch(console.error);
	}, [id, source]);

	return {
		mapTabSelected,
		setMapTabSelected,
		mapButtonSelected,
		setMapButtonSelected,
		data,
		loading,
		error,
	};
};

export const useArtistAudienceMap = () =>
	useSharedHook<ReturnType<typeof _useArtistAudienceMap>>(
		_useArtistAudienceMap,
	);

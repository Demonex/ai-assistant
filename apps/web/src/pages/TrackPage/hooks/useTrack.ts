import useSharedHook from "../../../hooks/useSharedHook.js";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { useLazyFetch } from "../../../hooks/useFetch.js";
import { BACKEND_URL } from "../../../constants/index.js";
import { useArtist } from "../../ArtistPage/hooks/useArtist.js";
import type { TrackDataType } from "../types.js";
import memoize from "memoizee";
import { useBetween } from "use-between";

type UseTrackReturn = {
	idTrack?: string;
	idArtist?: string;
	source?: string;
	trackData?: TrackDataType;
	setIdTrack: React.Dispatch<React.SetStateAction<string>>;
	trackMapData: {};
};
const _useTrack = ({ trackId }: { trackId?: string }): UseTrackReturn => {
	const { setIdFromTrack, id: idArtist, source, name } = useArtist();
	const [idTrack, setIdTrack] = useState<string>(trackId);
	const [{ data: trackData, loading, error }, fetchData] =
		useLazyFetch<TrackDataType>({
			url: `${BACKEND_URL}/proxy/api/v1/analytics_track/{trackId}/info`,
		});

	const [
		{ data: trackMapData, loading: trackMapLoading, error: trackMapError },
		fetchMap,
	] = useLazyFetch({
		url: `${BACKEND_URL}/proxy/api/v1/analytics_track/{trackId}/map_stats`,
	});

	useEffect(() => {
		if (!trackId || !idArtist || !source) {
			return;
		}
		void fetchMap({
			url: `${BACKEND_URL}/proxy/api/v1/analytics_track/${trackId}/map_stats`,
			params: {
				idUnique: idArtist,
				source,
			},
		});
	}, [trackId, idArtist, source]);

	useEffect(() => {
		if (!trackId) {
			return;
		}
		setIdTrack(trackId);
		void fetchData({
			url: `${BACKEND_URL}/proxy/api/v1/analytics_track/${trackId}/info`,
		});
	}, [trackId]);

	useEffect(() => {
		const artistIds = trackData?.trackInfo?.artistLinks?.map(
			(artist) => artist?.idUnique,
		);
		if (
			!trackData?.trackInfo?.entityIdUnique ||
			!artistIds?.length ||
			artistIds.includes(idArtist)
		) {
			return;
		}
		setIdFromTrack(trackData.trackInfo.entityIdUnique);
	}, [trackData?.trackInfo?.entityIdUnique, idArtist]);

	return {
		idTrack,
		trackData,
		idArtist,
		source,
		setIdTrack,
		trackMapData,
	};
};

const useTrackMemo = memoize((trackId) => {
	return () =>
		_useTrack({
			trackId,
		});
});

export const useTrack = ({ trackId }: { trackId?: string } = {}) => {
	return useBetween<ReturnType<typeof _useTrack>>(useTrackMemo(trackId));
};

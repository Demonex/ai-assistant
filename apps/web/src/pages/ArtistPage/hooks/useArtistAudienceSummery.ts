import useSharedHook from "../../../hooks/useSharedHook.js";
import React, { useEffect, useState } from "react";
import { useArtist } from "./useArtist.js";
import { type FetchError, useLazyFetch } from "../../../hooks/useFetch.js";
import {
	ChartDataType,
	ResponseAudienceMapStats,
	type ResponseAudienceSummery,
} from "../types.js";
import { BACKEND_URL } from "../../../constants/index.js";

const _useArtistAudience = (): {
	data?: ResponseAudienceSummery;
	loading: boolean;
	error?: FetchError<any>;
} => {
	const { id, source } = useArtist();
	const [{ data, loading, error }, fetchSummery] =
		useLazyFetch<ResponseAudienceSummery>({
			url: `${BACKEND_URL}/proxy/api/v1/audience/summary_stats`,
		});

	useEffect(() => {
		if (!id || !source) {
			return;
		}
		void fetchSummery({
			params: {
				idUnique: id,
				source,
			},
		});
	}, [id, source]);

	return {
		data,
		loading,
		error,
	};
};

export const useArtistAudienceSummery = () =>
	useSharedHook<ReturnType<typeof _useArtistAudience>>(_useArtistAudience);

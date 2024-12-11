import useSharedHook from "../../../hooks/useSharedHook.js";
import React, { useEffect, useState } from "react";
import { useArtist } from "./useArtist.js";
import { type FetchError, useLazyFetch } from "../../../hooks/useFetch.js";
import type { ResponseAudienceMapStats } from "../types.js";
import { BACKEND_URL } from "../../../constants/index.js";

const _useArtistSongshare = (): {
	data?: ResponseAudienceMapStats;
	loading: boolean;
	error?: FetchError<any>;
} => {
	const { id } = useArtist();
	const [{ data, loading, error }, fetchMap] =
		useLazyFetch<ResponseAudienceMapStats>({
			url: `${BACKEND_URL}/proxy/api/v1/marketing/songshare_analytics_data`,
		});

	/*
  useEffect(() => {
    if (!id ) {
      return;
    }

    fetchMap({
      params: {
        idUnique: id,

      }
    }).catch(console.error);
  }, [id]);*/

	return {
		data,
		loading,
		error,
	};
};

export const useArtistSongshare = () =>
	useSharedHook<ReturnType<typeof _useArtistSongshare>>(_useArtistSongshare);

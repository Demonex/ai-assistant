import { useCallback, useEffect, useMemo, useState } from "react";
import useSharedHook from "../../../../hooks/useSharedHook.js";
import { useLazyFetch } from "../../../../hooks/useFetch.js";
import { BACKEND_URL } from "../../../../constants/index.js";

const _useSubscriptionCalculator = () => {
	const [artistId, setArtistId] = useState<string>();
	const [openModal, setOpenModal] = useState(false);
	const [openAddSubscription, setOpenAddSubscription] = useState(false);
	const [limit, setLimit] = useState("2");
	const [period, setPeriod] = useState("1");
	const [{ data, loading, error }, fetchPlans] = useLazyFetch({
		url: `${BACKEND_URL}/subscription/plans`,
		cache: false,
	});

	const [
		{ data: dataPurchase, loading: loadingPurchase, error: errorPurchase },
		fetchPurchase,
	] = useLazyFetch({
		url: `${BACKEND_URL}/subscription/purchase`,
		method: "post",
		cache: false,
	});

	const [
		{ data: dataAddArtist, loading: loadingAddArtist, error: errorAddArtist },
		fetchAddArtist,
	] = useLazyFetch({
		url: `${BACKEND_URL}/subscription/:subscription/artist/:artist`,
		method: "post",
		cache: false,
	});

	const plan = useMemo(() => {
		return data?.find((item) => {
			return (
				(() => {
					switch (item.limit) {
						case 1: {
							return limit === "1";
						}
						case 5: {
							return limit === "2";
						}
						case 10: {
							return limit === "3";
						}
						case 20: {
							return limit === "4";
						}
						case 50: {
							return limit === "5";
						}
					}
				})() &&
				(() => {
					switch (item.period) {
						case "month": {
							return period === "1";
						}
						case "half-year": {
							return period === "2";
						}
						case "year": {
							return period === "3";
						}
					}
				})()
			);
		});
	}, [limit, period, data]);

	const handleClick = useCallback(
		(subscription = undefined, artist = undefined) => {
			if (subscription && artist) {
				fetchAddArtist({
					url: `${BACKEND_URL}/subscription/${subscription}/artist/${artist}`,
				});
			} else if (!subscription) {
				fetchPurchase({
					data: {
						plan: plan.id,
						artist: artistId,
					},
				});
			}
		},
		[plan, artistId],
	);

	useEffect(() => {
		fetchPlans().catch(console.error);
	}, []);

	useEffect(() => {
		if (!dataPurchase) {
			return;
		}
		open(dataPurchase.url);
	}, [dataPurchase]);

	return {
		openAddSubscription,
		setOpenAddSubscription,
		data,
		dataPurchase,
		plan,
		openModal,
		setOpenModal,
		limit,
		setLimit,
		period,
		setPeriod,
		handleClick,
		setArtistId,
		dataAddArtist,
	};
};
export const useSubscriptionCalculator = () =>
	useSharedHook<ReturnType<typeof _useSubscriptionCalculator>>(
		_useSubscriptionCalculator,
	);

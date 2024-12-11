import { lazy, memo, Suspense, useEffect, useMemo } from "react";
import { type ArtistNavigation, useArtist } from "../../hooks/useArtist.js";
import { useParams, useSearch } from "wouter";
import { overviewSources } from "../../../../data/consts/favoriteSources.js";
import Catalogue from "../../components/Catalogue/index.js";
import { FeedContent } from "../../components/FeedContent/index.js";

const AnalyticsContent = lazy(
	() => import("../../components/Analytics/AnalyticsContent.js"),
);
const AudienceContent = lazy(
	() => import("../../components/Audience/AudienceContent.js"),
);
const ToolsContent = lazy(() => import("../../components/Tools/index.js"));

export const ArtistContent = memo(() => {
	const { navigation, setParams } = useArtist();

	const params = useParams<{
		id?: string;
		name?: string;
		navigation?: ArtistNavigation;
	}>();

	const search = useSearch();

	const queryParams = useMemo<Record<string, string>>(() => {
		return Array.from(new URLSearchParams(search)).reduce(
			(prev, [key, value]) => ({
				...prev,
				[key]: value,
			}),
			{},
		);
	}, [search]);

	const defaultSource = useMemo(() => {
		return (
			overviewSources.find(({ slug }) => slug === queryParams.source) ||
			overviewSources[0]
		).slug;
	}, [queryParams?.source]);

	useEffect(() => {
		setParams({
			...params,
			source: queryParams?.source ?? defaultSource,
		});
	}, [params, queryParams?.source, defaultSource, setParams]);

	switch (navigation) {
		case "feed": {
			return (
				<Suspense fallback={null}>
					<FeedContent />
				</Suspense>
			);
		}
		case "analytics":
		case undefined: {
			return (
				<Suspense fallback={null}>
					<AnalyticsContent />
				</Suspense>
			);
		}
		case "audience": {
			return (
				<Suspense fallback={null}>
					<AudienceContent />
				</Suspense>
			);
		}
		case "tools": {
			return (
				<Suspense fallback={null}>
					<ToolsContent />
				</Suspense>
			);
		}
		case "catalogue": {
			return (
				<Suspense fallback={null}>
					<Catalogue />
				</Suspense>
			);
		}
		default: {
			return null;
		}
	}
});

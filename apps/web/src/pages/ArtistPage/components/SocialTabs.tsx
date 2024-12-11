import { memo, useCallback, useEffect } from "react";
import { overviewSources } from "../../../data/consts/favoriteSources.js";
import get from "lodash.get";
import { useArtist } from "../hooks/useArtist.js";
import { useChangeTab } from "../hooks/useChangeTab.js";
import { useSizes } from "../../../hooks/useSizes.js";
import { is } from "@amcharts/amcharts4/core.js";
import { navbar } from "../../../data/consts/navbar.js";
import { useParams, useSearch } from "wouter";

export const Tabs = memo(({}: any) => {
	const { source, setSource, navigation } = useArtist();
	const { setChangeTab, changeTab } = useChangeTab();
	const filteredSources = overviewSources.filter((_, index) => index !== 0);
	const handleClick = useCallback(
		(index: number) => {
			setSource(
				navigation === "feed"
					? get(overviewSources, `${index}.slug`)
					: get(filteredSources, `${index}.slug`),
			);
			setChangeTab(index);
		},
		[source, overviewSources, filteredSources],
	);

	const { isMobile, isTablet } = useSizes();
	const location = useSearch();
	const sourceFromLocation = location.split("=").pop();
	useEffect(() => {
		setSource(
			navigation === "feed"
				? overviewSources[0].slug
				: navigation === "analytics" || navigation === "audience"
					? overviewSources[1].slug
					: sourceFromLocation,
		);
	}, []);
	return (
		<>
			<ul
				className={`flex whitespace-nowrap border-slate-200/5 mb-px overflow-x-auto overflow-y-hidden items-center justify-between flex-1 ${isMobile || isTablet ? "gap-4" : "border-b gap-10"}`}
			>
				{navigation === "feed" ? (
					<>
						{overviewSources.map((sourceItem, index) => (
							<li key={index}>
								<div
									className={`capitalize flex text-t2Regular cursor-pointer 
              ${source === sourceItem.slug ? "text-medium_grey border-medium_grey border-b-solid " : "border-transparent hover:border-medium_grey hover:text-medium_grey"} 
              ${isMobile || isTablet ? "" : "border-b py-2 px-4 "}`}
									onClick={() => handleClick(index)}
								>
									{isMobile || isTablet ? (
										<div
											className={`flex items-center justify-center w-7 h-7 ${sourceItem.slug === source || index === 0 ? "" : " rounded-full bg-popup_gray p-1.5 "}`}
										>
											<img
												src={
													sourceItem.slug === source
														? sourceItem.activeLogo
														: sourceItem.secondaryLogo
												}
												alt=""
												className="max-w-7"
											/>
										</div>
									) : (
										sourceItem.name
									)}
								</div>
							</li>
						))}
					</>
				) : (
					<>
						{filteredSources.map((sourceItem, index) => (
							<li key={index}>
								<div
									className={`capitalize flex text-t2Regular cursor-pointer 
              ${source === sourceItem.slug ? "text-medium_grey border-medium_grey border-b-solid " : "border-transparent hover:border-medium_grey hover:text-medium_grey"} 
              ${isMobile || isTablet ? "" : "border-b py-2 px-4 "}`}
									onClick={() => handleClick(index)}
								>
									{isMobile || isTablet ? (
										<div
											className={`flex items-center justify-center w-7 h-7 ${sourceItem.slug === source || index === 0 ? "" : " rounded-full bg-popup_gray p-1.5 "}`}
										>
											<img
												src={
													sourceItem.slug === source
														? sourceItem.activeLogo
														: sourceItem.secondaryLogo
												}
												alt=""
												className="max-w-7"
											/>
										</div>
									) : (
										sourceItem.name
									)}
								</div>
							</li>
						))}
					</>
				)}
			</ul>
		</>
	);
});

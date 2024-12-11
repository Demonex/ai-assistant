import React, {
	memo,
	lazy,
	Suspense,
	useMemo,
	useEffect,
	Fragment,
} from "react";
import { Tabs } from "../SocialTabs.js";
import { useArtistAudienceMap } from "../../hooks/useArtistAudienceMap.js";
import { useArtistAudienceSummery } from "../../hooks/useArtistAudienceSummery.js";
import get from "lodash.get";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useArtist } from "../../hooks/useArtist.js";
import { overviewSources } from "../../../../data/consts/favoriteSources.js";
import "../../../../index.css";
import ChevronRight from "../../../../assets/ChevronRight.js";
import settings from "/assets/svg/settings_icon.svg";
import { useChangeTab } from "../../hooks/useChangeTab.js";
import { useSizes } from "../../../../hooks/useSizes.js";
import ArtistMobileHeader from "../ArtistMobileHeader.js";
import reload from "/assets/svg/reload_icon.svg";
import PrimaryButton from "../../../../components/PrimaryButton.js";
import { ShowOnLaptopToDesktop } from "../../../../components/SowOnLaptopToDeckTop/index.js";
import { ShowOnMobileToTablet } from "../../../../components/showFromMobileToTablet/index.js";
import { useManageTable } from "./hooks/useManageTable.js";
import GlobeIcon from "../../../../assets/GlobeIcon.js";
import MapIcon from "../../../../assets/MapIcon.js";
import InfoIcon from "../../../../assets/InfoIcon.js";
import { useAccount } from "../../../../components/Header/hooks/useAccount.js";
import { useSubscriptions } from "../../../../hooks/useSubscriptions.js";
import CountryDataPopup from "./components/CountryDataPopup.js";

const MapChart = lazy(() => import("./components/MapChart.js"));

const ChartsTabs = memo(() => {
	const { data, mapTabSelected, setMapTabSelected } = useArtistAudienceMap();
	return (
		<ul className="border-b space-x-6 flex whitespace-nowrap border-slate-200/5 mb-px overflow-x-auto overflow-y-hiddenr">
			{data?.mapStats.map((chart, index) => (
				<li
					key={index}
					className="overflow-y-hidden overflow-x-hidden min-w-fit"
				>
					<button
						className={`capitalize flex text-4 leading-6 font-semibold pt-3 pb-2.5 border-b whitespace-nowrap overflow-x-hidden ${index === mapTabSelected ? "text-indigo-400 border-indigo-500" : "border-transparent text-slate-200 hover:border-slate-700"}`}
						onClick={() => setMapTabSelected(index)}
					>
						{chart.name}
					</button>
				</li>
			))}
		</ul>
	);
});
const SkeletonChartsTabs = memo(() => (
	<SkeletonTheme baseColor="#C7D2FE0D" highlightColor="#C7D2FE12">
		<div className="flex gap-3 py-3 border-b border-slate-600/30">
			{Array.from({ length: 2 }).map((_, i) => (
				<Skeleton width="8rem" height="1.3rem" key={i} />
			))}
		</div>
	</SkeletonTheme>
));

const SkeletonDataSummary = memo(() => (
	<SkeletonTheme baseColor="#C7D2FE0D" highlightColor="#C7D2FE12">
		{Array.from({ length: 2 }).map((_, i) => (
			<Skeleton
				width="9.625rem"
				height={100}
				className="border border-indigo-500/30"
				borderRadius={10}
				key={i}
			/>
		))}
	</SkeletonTheme>
));
export const AudienceContent = memo(() => {
	const { elementRange: elementRangeLaptop } = useSizes(1420, 1920);
	const { changeTab } = useChangeTab();
	const { source: sourceSlug, setSource } = useArtist();
	const { profile } = useAccount();
	const { isSubscribed } = useSubscriptions();
	const { mapType, setSearchValue, searchRef, setMapType } = useManageTable();
	const getLogo = overviewSources.find((item) => item.slug === sourceSlug);
	const { elementRange, width, isMobile, isTablet } = useSizes();
	const logoChart = elementRange(6, 11.25);
	const sideDataWidth = elementRangeLaptop(5.5, 20.5);
	const {
		data: dataMap,
		mapTabSelected,
		mapButtonSelected,
		setMapButtonSelected,
		loading: dataMapLoading,
	} = useArtistAudienceMap();
	const { data: dataSummery, loading: dataSummeryLoading } =
		useArtistAudienceSummery();
	const buttons: (typeof dataMap.mapStats)[number]["data"]["columns"] =
		useMemo(() => {
			return get(dataMap, `mapStats.${mapTabSelected}.data.columns`, []).filter(
				({ showInMap }) => showInMap,
			);
		}, [dataMap]);

	const isDataExists = useMemo(() => {
		if (!dataMap && !dataSummery) {
			return true;
		}
		return Boolean(
			dataMap?.mapStats?.length || dataSummery?.summaryStats?.length,
		);
	}, [dataMap, dataSummery]);

	const source = useMemo(() => {
		return overviewSources.find(({ slug }) => slug === sourceSlug);
	}, [sourceSlug]);
	return (
		<>
			<main className="h-full relative z-20 pt-4 xl:max-w-none w-full lg:px-6 md:px-8 px-4">
				<header
					id="header"
					className="pb-3 border-b border-popup_gray md:border-none md:pb-[unset] md:mb-6 md:flex justify-between items-center  lg:px-[unset]"
				>
					{isMobile || isTablet ? (
						<ArtistMobileHeader />
					) : (
						<div className="flex-auto max-w-4xl">
							<h1 className="text-t1Semi_deck">Аудитория</h1>
						</div>
					)}
					<PrimaryButton
						titleClassName="text-caption_m_desk text-light_grey"
						className="px-6 py-4 border border-solid border-medium_grey rounded-xl hidden lg:flex"
						title="Обновить"
						isIcon={true}
						icon={reload}
					/>
				</header>
				<section className="relative ">
					<div className="  relative z-10">
						<div className=" flex overflow-auto  flex-col">
							<div className=" flex-none min-w-full overflow-y-hidden">
								<div className="flex min-w-full items-center gap-4">
									<ShowOnLaptopToDesktop>
										<button className="min-w-5 h-5">
											<ChevronRight
												color={
													changeTab === 0 || changeTab === undefined
														? "#7B7B7B"
														: "white"
												}
												className={"rotate-[180deg]"}
											/>
										</button>
									</ShowOnLaptopToDesktop>
									<div className="w-full border-b border-[#33333380] lg:border-none pb-3 md:pb-4 pt-3 md:pt-[unset] lg:pb-0">
										<Tabs />
									</div>
									<ShowOnLaptopToDesktop>
										<button className="min-w-5 h-5">
											<ChevronRight color="white" className={""} />
										</button>
									</ShowOnLaptopToDesktop>

									<img className="fill-white w-7 h-7 " src={settings} />
								</div>
							</div>
							<ShowOnMobileToTablet>
								<p className="text-[10px] font-normal leading-3 text-left text-medium_grey  mt-2">
									*компания Meta Platforms Inc., владеющая Facebook и Instagram,
									внесена в реестр экстремистских организаций, ее деятельность в
									России по поддержанию указанных соцсетей признана
									экстремистской деятельностью
								</p>
							</ShowOnMobileToTablet>
							{isDataExists ? (
								<>
									<section
										className={`py-6  flex  w-full gap-6 ${width < 1420 ? "flex-col" : "flex-row"}`}
									>
										{/* {
                            dataMapLoading === true
                              ? <SkeletonChartsTabs/>
                              : <ChartsTabs/>
                          }*/}
										<div className="w-full relative">
											{!isSubscribed && (
												<div className="w-full h-full top-0 left-0 absolute z-10" />
											)}
											<div className="w-full py-4 lg:p-8 flex justify-between lg:bg-popup_gray/50 rounded-t-[20px]">
												<div className="flex flex-col lg:flex-row gap-4 lg:gap-10 lg:items-center">
													<div
														style={{
															width: `${logoChart}rem`,
														}}
														className=" mr-6"
													>
														{getLogo?.logo}
													</div>
													<div className="flex flex-col md:flex-row gap-4 justify-center md:justify-end">
														{buttons.map((button, index) => (
															<button
																key={index}
																className={`text-caption_m_desk p-2 flex justify-start
                                        ${index === mapButtonSelected ? "text-medium_grey" : ""}`}
																onClick={() => setMapButtonSelected(index)}
															>
																{button.name}
															</button>
														))}
													</div>
													{mapType === "table" && (
														<div className="w-full md:w-fit flex items-center text-caption_r_desk text-medium_grey rounded-xl p-3.5  bg-transparent border-dark_grey border max-h-[52px]">
															<svg
																width="24"
																height="24"
																fill="none"
																aria-hidden="true"
																className="mr-3 flex-none"
															>
																<path
																	d="m19 19-3.5-3.5"
																	stroke="currentColor"
																	strokeWidth="2"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																></path>
																<circle
																	cx="11"
																	cy="11"
																	r="6"
																	stroke="currentColor"
																	strokeWidth="2"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																></circle>
															</svg>
															<input
																placeholder="Поиск по странам"
																className="bg-transparent text-white placeholder:text-medium_grey border-0 focus:ring-0 p-0"
																onChange={(e) => setSearchValue(e.target.value)}
																ref={searchRef}
															/>
														</div>
													)}
												</div>
											</div>
											<Suspense
												fallback={
													<div className="map-container w-full h-full" />
												}
											>
												<MapChart />
											</Suspense>
											<div className="flex w-full justify-between items-center  md:p-8 lg:bg-popup_gray/50 rounded-b-[20px]">
												<div className="flex items-center gap-4 ">
													<button
														onClick={() => {
															/* if (!profile || !isSubscribed) {
                                   return
                                 }*/
															setMapType("map");
														}}
													>
														<GlobeIcon
															className={` w-10 h-10 cursor-pointer ${mapType === "map" ? "fill-white" : "fill-medium_grey"}`}
														/>
													</button>
													<button
														onClick={() => {
															/* if (!profile || !isSubscribed) {
                                   return
                                 }*/
															setMapType("table");
														}}
													>
														<MapIcon
															className={`w-10 h-10 cursor-pointer ${mapType === "table" ? "fill-white" : "fill-medium_grey"}`}
														/>
													</button>
												</div>
												<InfoIcon className="fill-light_grey" />
											</div>
										</div>
										<div className="flex flex-col gap-4 lg:gap-6">
											{dataSummeryLoading === true ? (
												<SkeletonDataSummary />
											) : (
												dataSummery?.summaryStats?.map((item, index) => (
													<div
														style={{
															minWidth: `${sideDataWidth}rem`,
														}}
														key={index}
														className="py-6 px-7 bg-popup_gray/50 rounded-xl w-full "
													>
														<div className="flex items-center justify-between gap-14 w-full">
															<h2 className="text-caption_r_desk whitespace-nowrap text-medium_grey">
																{item.titleText},<br /> {item.subtitleText}
															</h2>
															<h1 className="text-t1Semi_deck">
																{item.primaryValue}
															</h1>
														</div>
													</div>
												))
											)}
										</div>
									</section>
								</>
							) : (
								<div className="mx-auto max-w-3xl flex items-start h-1/2 py-10 min-h-[50rem]">
									<p className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
										Subscribe to connect your {source?.name} account and import
										valuable Audience insights.
									</p>
								</div>
							)}
						</div>
					</div>
				</section>
			</main>
			<CountryDataPopup />
		</>
	);
});

export default AudienceContent;

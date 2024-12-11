import { socials } from "../../../data/consts/socials.js";
import { useArtistProfile } from "../hooks/useArtistProfile.js";
import { useArtistChart } from "../hooks/useArtistChart.js";
import { useArtist } from "../hooks/useArtist.js";
import React, { memo } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Chart } from "./Chart/Chart.js";
import { Performance } from "./Analytics/Performance.js";
import { TopTracks } from "./Analytics/TopTracks.js";
import { RelatedTracks } from "./Analytics/RelatedTracks.js";
import { Tabs } from "./SocialTabs.js";
import "../../../index.css";
import { useSizes } from "../../../hooks/useSizes.js";
import ArtistMobileHeader from "./ArtistMobileHeader.js";
import { useOpenMobileSidebar } from "../hooks/useOpenMobileSidebar.js";
import { SidebarMobile } from "./Sidebar/Sidebar.js";

const SkeletonArtistMobilePage = memo(() => (
	<SkeletonTheme baseColor="#C7D2FE0D" highlightColor="#C7D2FE12">
		<>
			<div className="w-full flex flex-col justify-center  relative overflow-hidden items-center mt-[55px]">
				<div className="w-[50%] h-[50%] flex justify-center aspect-square mt-5">
					<Skeleton width="25rem" height="25rem" />
				</div>
			</div>
			<div className="w-full flex flex-col items-center px-5 gap-3 z-30">
				<div className=" flex flex-col items-center gap-2">
					<Skeleton width="10rem" height="2rem" />
					<Skeleton width="3rem" height="2rem" />
					<div className="bg-gray-900/70 p-[8px] h-full w-full rounded-md flex items-center justify-center">
						<Skeleton width={32} height={32} />
					</div>
					<p className="text-md text-transparent capitalize bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text">
						{<Skeleton width="20rem" height="1.1rem" />}
					</p>
				</div>
				<div className="w-full overflow-y-scroll flex flex-col gap-4 mb-5">
					{Array.from({ length: 4 }).map((item, index) => (
						<div
							className="ring-1 ring-inset ring-white/5 text-white shadow-2xl rounded-xl w-full"
							key={index}
						>
							<div className="bg-transparent p-4 rounded-xl h-full flex justify-between">
								<Skeleton width="10rem" height="1.1rem" />
								<Skeleton width="3rem" height="1.5rem" />
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	</SkeletonTheme>
));

export const AnalyticsMobile = memo(() => {
	const { data: artistProfile, loading: loadingArtistProfile } =
		useArtistProfile();
	const { openMobileSidebar } = useOpenMobileSidebar();
	const { data: chartData, loading } = useArtistChart();
	const getLogo = socials.filter((item, _) => {
		const getSource = chartData?.chart?.source;
		return item.slug === getSource;
	});
	const { elementRange } = useSizes(320, 1023);
	const artistAvatarSize = elementRange(10, 30);
	return (
		<>
			{loadingArtistProfile === true ? (
				<SkeletonArtistMobilePage />
			) : (
				<>
					{openMobileSidebar ? (
						<SidebarMobile />
					) : (
						<>
							<div className="w-full px-4 py-4 md:px-8">
								<header
									id="header"
									className="pb-3 border-b border-popup_gray md:border-none md:pb-[unset] md:mb-6 md:flex justify-between items-center  lg:px-[unset]"
								>
									<ArtistMobileHeader />
								</header>
								<div className="w-full flex flex-col items-center gap-6 z-30">
									<div className="w-full overflow-y-scroll flex flex-col gap-4">
										<div className="w-full border-b border-[#33333380] pb-3 md:pb-4 pt-3 md:pt-[unset]">
											<Tabs />
										</div>
										<div>
											<p className="text-[10px] font-normal leading-3 text-left text-medium_grey -mt-2">
												*компания Meta Platforms Inc., владеющая Facebook и
												Instagram, внесена в реестр экстремистских организаций,
												ее деятельность в России по поддержанию указанных
												соцсетей признана экстремистской деятельностью
											</p>
										</div>
										<Chart />
										<Performance />
										<RelatedTracks />
										<TopTracks />
									</div>
								</div>
							</div>
						</>
					)}
				</>
			)}
		</>
	);
});

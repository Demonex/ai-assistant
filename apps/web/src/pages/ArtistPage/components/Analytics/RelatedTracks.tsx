import { memo } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useArtistTrack } from "../../hooks/useArtistTrack.js";
import { socials } from "../../../../data/consts/socials.js";
import { Link } from "wouter";
import { useArtist } from "../../hooks/useArtist.js";
import InfoIcon from "../../../../assets/InfoIcon.js";
import { useSizes } from "../../../../hooks/useSizes.js";
import { useTranslation } from "react-i18next";

const SkeletonRelatedTracks = () => {
	return (
		<SkeletonTheme baseColor="#C7D2FE0D" highlightColor="#C7D2FE12">
			<div className="flex items-center gap-3 justify-center mb-4">
				<Skeleton height={32} width={32} />
				<p className="text-sm lg:text-md">
					<Skeleton height={20} width={150} />
				</p>
			</div>
			<div>
				<ul className="w-full h-full grid grid-cols-2 md:grid-cols-5 justify-center 4xl:grid-cols-auto-fit-290 gap-4">
					{Array.from({ length: 10 }).map((item, index) => (
						<li className="" key={index}>
							<div className="rounded-xl border-l border-r border-b border-slate-200/5 ">
								<div className="flex items-end justify-center overflow-hidden rounded-t-xl">
									<Skeleton width={150} height={150} borderRadius={10} />
								</div>
								<div className="p-2 xl:p-4">
									<h3 className=" text-sm font-bold leading-6">
										{<Skeleton />}
									</h3>
									<p className="mt-2 text-sm line-clamp-1">{<Skeleton />}</p>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</SkeletonTheme>
	);
};

export const RelatedTracks = memo(() => {
	const { t } = useTranslation();
	const { data: trackData, loading: apiTrackDataLoading } = useArtistTrack();
	const getLogo = socials.filter((item, _) => {
		const getSource = trackData?.sourceId;
		return item.slug === getSource;
	});
	const { source } = useArtist();
	const { width } = useSizes();
	return (
		<div
			className={`lg:bg-popup_gray/50 rounded-[20px] lg:py-8  lg:px-7  h-fit ${trackData?.trackData?.listData?.length > 2 ? "w-full" : width > 1680 && width < 1980 ? "w-full max-w-[38.25rem]" : "w-full"} `}
		>
			{apiTrackDataLoading === true ? (
				<SkeletonRelatedTracks />
			) : (
				trackData?.trackData?.relatedTracks?.map((relatedTracksItem, index) => (
					<div key={index}>
						<div className="flex items-center gap-3 justify-between pb-4 border-b border-dark_grey mb-7">
							<p className="text-btnText text-light_grey">
								{t(relatedTracksItem.headerText)}
							</p>
							<InfoIcon className="fill-light_grey hover:fill-medium_grey" />
						</div>
						<ul className={"w-full  h-full  gap-4  flex flex-wrap"}>
							{relatedTracksItem.relatedTracks
								?.filter((_, index) => index < 12)
								.map((track, index) => (
									<div key={index}>
										<li className="group ">
											<Link
												to={`/track/${track.idUnique}/${track.baseUrl.split("/").pop()}?source=${source}`}
											>
												<div className="bg-popup_gray/50 max-w-[10.75rem] rounded-xl p-2 md:p-3 ">
													<div className=" w-[9.25rem] h-[9.25rem]">
														<div
															className="group-hover:scale-110 duration-300 rounded-[10px] bg-cover bg-no-repeat bg-center w-full h-full"
															style={{
																backgroundImage: `url(${track.imageUrl})`,
															}}
														/>
													</div>
													<div className="mt-4 w-full ">
														<h3 className=" text-caption_r_desk truncate ">
															{" "}
															{track.trackName}
														</h3>
														<p className="text-left mt-1 text-caption_r_desk text-medium_grey line-clamp-1">
															{track.artistName}
														</p>
													</div>
												</div>
											</Link>
										</li>
									</div>
								))}
						</ul>
					</div>
				))
			)}
		</div>
	);
});

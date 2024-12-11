import { useChartTrackData } from "../hooks/useChartTrackData.js";
import { socials } from "../../../data/consts/socials.js";
import { SkeletonPerformance } from "../../ArtistPage/components/Analytics/Performance.js";
import InfoIcon from "../../../assets/InfoIcon.js";

const Performance = () => {
	const { chartTrackData, loading } = useChartTrackData() || {};
	const getLogo = socials.filter((item, _) => {
		const getSource = chartTrackData?.chart.source;
		return item.slug === getSource;
	});
	return (
		<div className="w-full 2xl:max-w-[20.5rem] flex flex-col items-center lg:bg-popup_gray/50 rounded-[20px]">
			{loading ? (
				<SkeletonPerformance />
			) : (
				<>
					<div className=" flex flex-col items-center gap-6 w-full justify-center lg:px-7  py-4 lg:py-8 ">
						<div className="w-full flex justify-between items-center pb-4 border-b border-secondary_dark_gray">
							<p className="text-btnText text-light_grey">Статистика</p>
							<InfoIcon className="fill-light_grey" />
						</div>

						{chartTrackData?.chart.iconData.map((item, index) => {
							return (
								<div
									className="w-full overflow-y-scroll flex flex-col gap-3 py-2"
									key={index}
								>
									<div className="text-white w-full">
										<div className="flex justify-between ">
											<p className="text-caption_r_desk text-medium_grey">
												{item.text}
											</p>
											<p className=" text-t1Semi_deck ">{item.count}</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};
export default Performance;

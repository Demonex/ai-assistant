import React, { Fragment, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";

import {
	Bar,
	BarChart,
	Label,
	Rectangle,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";
import { navbar } from "../../../../../../../data/consts/navbar.js";
import SecondaryCloseIcon from "../../../../../../../assets/SecondaryCloseIcon.js";
import InfoIcon from "../../../../../../../assets/InfoIcon.js";

const popupData = {
	popupIdUnique: "tmcz2fha",
	popupInfo: {
		id: 3898517,
		idUnique: "tmcz2fha",
		trackName: "Zick Zack",
		metadata: [
			{
				displayText: "Rammstein",
			},
		],
		chartData: {
			titleText: "",
			subtitleText: "",
			categories: [
				"<img src='/files/source-icons/apple_music.webp' style='vertical-align: middle; width: 20px; height: 20px'/>",
				"<img src='/files/source-icons/deezer.webp' style='vertical-align: middle; width: 20px; height: 20px'/>",
				"<img src='/files/source-icons/instagram.webp' style='vertical-align: middle; width: 20px; height: 20px'/>",
				"<img src='/files/source-icons/tidal.webp' style='vertical-align: middle; width: 20px; height: 20px'/>",
			],
			maxYValue: 2,
			color: "#AF31FF",
			secondaryColor: "#591485",
			data: [
				{
					y: 1,
					text: "1",
					source: "apple_music",
				},
				{
					y: 1,
					text: "1",
					source: "deezer",
				},
				{
					y: 1,
					text: "1",
					source: "instagram",
				},
				{
					y: 1,
					text: "1",
					source: "tidal",
				},
			],
		},
		summaryData: [
			{
				deltaText: "",
				isPositiveDelta: true,
				primaryValue: 3,
				subtitleText: "Total",
				titleText: "Visits",
			},
			{
				deltaText: "",
				isPositiveDelta: true,
				primaryValue: 4,
				subtitleText: "Total",
				titleText: "Clicks",
			},
			{
				deltaText: "",
				isPositiveDelta: true,
				primaryValue: "133%",
				subtitleText: "",
				titleText: "Click-Through Rate",
			},
		],
		avatar: "https://i.scdn.co/image/ab67616d0000b2731108fef87966d83948b6a037",
		listDataType: "Track",
	},
	popupStyle: "songshare",
	sourceId: null,
	isRestricted: false,
	hasAccess: true,
};
const TrackInfoModal = memo(
	({ setOpenTrackInfoModal, openTrackInfoModal }: any, any) => {
		const dataWithIcon = popupData.popupInfo.chartData.data.map((item) => {
			const findLogo = navbar[0].content[0].options.filter(
				(icon) => icon.slug === item.source,
			);
			return {
				...item,
				icon: findLogo[0].logo,
			};
		});

		const isEven = (number) => {
			return number % 2 === 0;
		};
		return (
			<Transition appear show={openTrackInfoModal} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-40 overflow-y-auto"
					onClose={() => setOpenTrackInfoModal(false)}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/85 w-full h-full flex justify-center items-center " />
					</Transition.Child>
					<div className="h-full">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className=" bg-popup_gray lg:my-20 p-4 md:py-8 lg:py-10 md:px-8 lg:px-[3.75rem] lg:mx-auto lg:rounded-[20px] z-50 relative w-full lg:max-w-[60rem] mb-[4.5rem] lg:mb-[unset] h-full lg:h-[unset]">
								<div
									className="w-full flex justify-end cursor-pointer"
									onClick={() => setOpenTrackInfoModal(false)}
								>
									<SecondaryCloseIcon className="stroke-white" />
								</div>
								<div className="mt-6 flex flex-col gap-6">
									<div className="py-2 flex flex-col md:flex-row gap-6 md:items-center">
										<div>
											<img
												alt=""
												src={popupData.popupInfo.avatar}
												className="w-20 h-20 rounded-xl"
											/>
										</div>
										<div className="flex flex-col gap-2">
											<h1 className="text-t1Semi_deck">
												{popupData.popupInfo.trackName}
											</h1>
											{popupData.popupInfo.metadata.map((item, index) => (
												<p
													key={index}
													className="text-t2Regular text-light_grey"
												>
													{index !== popupData.popupInfo.metadata.length - 1
														? `${item.displayText},`
														: item.displayText}
												</p>
											))}
										</div>
									</div>
									<div className="lg:flex gap-4 lg:gap-6 grid md:grid-cols-2 grid-cols-1 ">
										{popupData.popupInfo.summaryData.map((item, index) => (
											<div
												className={`w-full py-6 px-7 bg-[#48484840] flex items-center justify-between gap-6 rounded-xl ${index === popupData.popupInfo.summaryData.length - 1 && isEven(popupData.popupInfo.summaryData.length - 1) ? "md:col-span-2" : ""}`}
												key={index}
											>
												<p className="text-caption_r_desk text-medium_grey">
													{item.titleText}
												</p>
												<p className="text-t1Semi_deck text-light_grey">
													{item.primaryValue}
												</p>
											</div>
										))}
									</div>
									<div className="max-h-[300px] w-full  h-[16rem] pt-4">
										<ResponsiveContainer width="100%" height="100%">
											<BarChart
												width={500}
												// height={300}
												data={dataWithIcon}
												/* margin={{
                         top: 5,
                         right: 30,
                         left: 20,
                         bottom: 5,
                       }}*/
												barSize={100}
											>
												<defs>
													<linearGradient
														id="Color0"
														x1="0"
														y1="0"
														x2="0"
														y2="1"
													>
														<stop
															offset="0%"
															stopColor={popupData.popupInfo.chartData.color}
															stopOpacity={1}
														/>
														<stop
															offset="100%"
															stopColor={
																popupData.popupInfo.chartData.secondaryColor
															}
															stopOpacity={0.2}
														/>
													</linearGradient>
													<linearGradient
														id="Color0Stroke"
														x1="1"
														y1="0.5"
														x2="0"
														y2="0.5"
													>
														<stop offset="0%" stopColor="#E4FF29" />
														<stop offset="100%" stopColor="#E4FF29" />
													</linearGradient>
												</defs>
												<XAxis
													// dataKey={'icon'}
													stroke="#484848"
													tickLine={false}
													// tick={<CustomXAxisTicks />}
													interval={0}
													domain={["auto", "auto"]}
												/>
												<YAxis
													allowDecimals={false}
													tick={{
														fill: "#7B7B7B",
														fontSize: 13,
														fontWeight: 400,
													}}
													stroke="transparent"
												>
													<Label
														position={{
															x: 10,
															y: 50,
														}}
														fill="#7B7B7B"
														angle={-90}
														style={{
															fontSize: 16,
															lineHeight: 24,
															fontWeight: 400,
														}}
													>
														Количество кликов
													</Label>
												</YAxis>
												<Bar
													label={{
														position: "top",
														fill: "#CCCCCD",
													}}
													dataKey="y"
													fill="url(#Color0)"
													activeBar={<Rectangle />}
												/>
											</BarChart>
										</ResponsiveContainer>
									</div>
									<div className="w-full flex justify-center items-center gap-4">
										<p className="text-caption_s_desk text-medium_grey ">
											*компания Meta Platforms Inc., владеющая Facebook и
											Instagram, внесена в реестр экстремистских организаций,
											<br /> ее деятельность в России по поддержанию указанных
											соцсетей признана экстремистской деятельностью
										</p>
										<InfoIcon className="fill-medium_grey min-w-5 h-5 " />
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		);
	},
);
export default TrackInfoModal;

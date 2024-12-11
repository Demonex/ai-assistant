import React, { Fragment, memo, useEffect, useMemo, useState } from "react";
import { useSubscriptions } from "../hooks/useSubscriptions.js";
import ChevronRight from "../../../../assets/ChevronRight.js";
import InfoIcon from "../../../../assets/InfoIcon.js";
import SecondaryButton from "../../../../components/SecondaryButton.js";
import { CheckMarks } from "../../../../assets/CheckMarks.js";
import { navbar } from "../../../../data/consts/navbar.js";
import { activityFeedFilter } from "../../consts.js";
import { ShowOnLaptopToDesktop } from "../../../../components/SowOnLaptopToDeckTop/index.js";
import { Dialog, Transition } from "@headlessui/react";
import { useSizes } from "../../../../hooks/useSizes.js";
import { ArrowBack } from "../../../../assets/ArrowBack.js";

const FilterParameters = memo(
	({
		currentArtist,
		filterLevel,
		setFilterLevel,
		setOpenMobileFilter,
	}: any) => {
		const filterOptions = useMemo(() => {
			return activityFeedFilter.map((social) => {
				const curr = navbar[0].content[0].options.find(
					(item) => item.slug === social.source,
				);
				return {
					...(social || {}),
					logo: curr?.logo,
				};
			}, {});
		}, []);
		return (
			<div className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-6 min-w-[22rem]">
				<div
					className="flex gap-2 items-center lg:hidden mb-4 md:mb-[unset]"
					onClick={() => setOpenMobileFilter(false)}
				>
					<ArrowBack className="fill-white w-5 h-5" />
					<p className="text-t2Regular">Все подписки</p>
				</div>
				<h2 className="text-btnText text-light_grey md:mt-10 lg:mt-[unset]">
					Настройка фильтрации
				</h2>
				{currentArtist ? (
					<div className="flex gap-6 items-center">
						<div className="flex gap-4 items-center w-[12rem]">
							<img
								src={currentArtist?.imageUrl}
								alt=""
								className="w-11 h-11 rounded-full"
							/>
							<p className={"text-caption_r_desk truncate"}>
								{currentArtist?.name}
							</p>
						</div>
						<SecondaryButton
							className="bg-primary_blue border-none text-white flex-row-reverse gap-2 py-3.5 px-5 hidden md:flex"
							title="Применить"
						>
							<CheckMarks className="fill-white" />
						</SecondaryButton>
					</div>
				) : (
					<p className="text-t2Regular text-medium_grey">
						Выбери подписку в списке слева
					</p>
				)}

				<div className="py-4 flex flex-col md:flex-row md:items-center gap-10 flex-wrap ">
					<div className="flex gap-2 items-center">
						<input
							// onChange={(e) => handleChecked(index, e.target.checked)}
							type="checkbox"
							className="min-w-[1.125rem] h-[1.125rem] border border-solid border-secondary_dark_gray rounded-sm bg-popup_gray"
						/>
						<p className="text-t2Regular whitespace-nowrap">Только новые</p>
						<InfoIcon className="fill-white" />
					</div>
					<div className="flex gap-2 items-center">
						<input
							// onChange={(e) => handleChecked(index, e.target.checked)}
							type="checkbox"
							className="min-w-[1.125rem] h-[1.125rem] border border-solid border-secondary_dark_gray rounded-sm bg-popup_gray"
						/>
						<p className="text-t2Regular whitespace-nowrap">
							Только редакционные
						</p>
						<InfoIcon className="fill-white" />
					</div>
					<div className="flex gap-2 items-center">
						<input
							// onChange={(e) => handleChecked(index, e.target.checked)}
							type="checkbox"
							className="min-w-[1.125rem] h-[1.125rem] border border-solid border-secondary_dark_gray rounded-sm bg-popup_gray"
						/>
						<p className="text-t2Regular whitespace-nowrap">Hide milestones</p>
						<InfoIcon className="fill-white" />
					</div>
				</div>
				<div className="relative w-full lg:max-w-[35rem]">
					<input
						step={1}
						id="labels-range-input"
						type="range"
						value={filterLevel}
						min={1}
						max={4}
						onChange={({ target: { value } }) => {
							setFilterLevel(value);
						}}
						className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-[#A51BC8] to-[#7641D3]"
					/>
					<div className="w-full ">
						<span className="text-caption_r_desk text-medium_grey dark:text-gray-400 absolute start-0 -bottom-8">
							Низкий
						</span>
						<div className=" absolute start-0 h-5 w-[1px] bg-medium_grey top-1/2 -translate-y-1/2 -z-10" />
						<span className="text-caption_r_desk text-medium_grey dark:text-gray-400 absolute start-1/3 -bottom-8">
							Средний
						</span>
						<div className=" absolute start-0 h-5 w-[1px] bg-medium_grey top-1/2 -translate-y-1/2 -z-10" />
						<span className="text-caption_r_desk text-medium_grey dark:text-gray-400 absolute start-2/3 -translate-x-1/4 rtl:translate-x-1/4 -bottom-8">
							Высокий
						</span>
						<div className=" absolute start-1/2 h-5 w-[1px] bg-medium_grey top-1/2 -translate-y-1/2 -z-10" />
						<span className="text-caption_r_desk text-medium_grey dark:text-gray-400 absolute end-0   -bottom-8 ">
							Макс.
						</span>
						<div className="absolute h-5 w-[1px] bg-medium_grey top-1/2 -translate-y-1/2 -z-10 end-0" />
					</div>
				</div>
				{currentArtist && (
					<div className="mt-6 pt-6">
						<ul>
							{filterOptions.map((item, index) => (
								<li key={index} className="py-2 flex gap-2 items-center">
									<img src={item.logo} alt="" className="max-w-5 max-h-5" />
									<p className="text-caption_r_desk text-medium_grey">
										{filterLevel === "1"
											? item.baselineDescription
											: filterLevel === "2"
												? item.midRangeDescription
												: filterLevel === "3"
													? item.highRangeDescription
													: item.topRangeDescription}
									</p>
								</li>
							))}
						</ul>
						<SecondaryButton
							className="bg-primary_blue border-none text-white flex-row-reverse gap-2 py-3.5 px-5 w-full md:w-fit mt-4 md:hidden"
							title="Применить"
						>
							<CheckMarks className="fill-white" />
						</SecondaryButton>
					</div>
				)}
			</div>
		);
	},
);
const ActivityFeed = memo(() => {
	const { artistsFromSubscriptions } = useSubscriptions();
	const { isMobile, isTablet } = useSizes();
	const [filterLevel, setFilterLevel] = useState("1");
	const [currentArtist, setCurrentArtist] = useState<any>(undefined);
	const [openMobileFilter, setOpenMobileFilter] = useState(false);
	const handleArtistClick = (value) => {
		setCurrentArtist(value);
		if (!isMobile && !isTablet) {
			return;
		}
		setOpenMobileFilter(true);
	};
	return (
		<>
			<h1 className="text-t1Semi_ipad lg:hidden">Ленты активности</h1>
			<section className="w-full py-10 flex justify-between gap-10">
				<div className="w-full lg:max-w-[35.25rem] flex flex-col gap-6">
					<h2 className="text-btnText text-light_grey">
						Уровень фильтрации по подпискам
					</h2>
					<ul className="">
						{Object.entries(artistsFromSubscriptions || {}).map(
							([_, value], index) => {
								return (
									<li
										onClick={() => handleArtistClick(value)}
										key={index}
										className="cursor-pointer p-4 flex items-center justify-between border-b border-secondary_dark_gray"
									>
										<div className="flex gap-4 w-2/3 items-center">
											<img
												src={value.imageUrl}
												alt=""
												className="w-11 h-11 rounded-full"
											/>
											<p
												className={`text-caption_r_desk ${currentArtist === value ? "text-medium_grey" : ""}`}
											>
												{value.name}
											</p>
										</div>
										<div className="flex gap-4 w-1/3 justify-between">
											<p
												className={`text-caption_r_desk ${currentArtist === value ? "text-medium_grey" : "text-light_grey"}`}
											>
												{filterLevel === "1"
													? "Низкий"
													: filterLevel === "2"
														? "Средний"
														: filterLevel === "3"
															? "Высокий"
															: "Макс."}
											</p>
											<ChevronRight
												className={` w-5 h-5 ${currentArtist === value ? "fill-medium_grey" : "fill-white"}`}
											/>
										</div>
									</li>
								);
							},
						)}
					</ul>
				</div>
				<ShowOnLaptopToDesktop>
					<FilterParameters
						filterLevel={filterLevel}
						currentArtist={currentArtist}
						setFilterLevel={setFilterLevel}
						setOpenMobileFilter={setOpenMobileFilter}
					/>
				</ShowOnLaptopToDesktop>
				<Transition show={openMobileFilter} as={Fragment}>
					<Dialog onClose={() => setOpenMobileFilter(false)}>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="transform translate-x-full"
							enterTo="-translate-x-0"
							leave="ease-in duration-200"
							leaveFrom="transform -translate-x-0"
							leaveTo="translate-x-full"
						>
							<div className="fixed inset-0 w-screen overflow-y-auto">
								<div className="flex min-h-full items-center justify-center mt-[5.25rem]">
									<Dialog.Panel className="w-full py-6 px-4 md:px-8 bg-[#0C0C0C]">
										<FilterParameters
											filterLevel={filterLevel}
											currentArtist={currentArtist}
											setFilterLevel={setFilterLevel}
											setOpenMobileFilter={setOpenMobileFilter}
										/>
									</Dialog.Panel>
								</div>
							</div>
						</Transition.Child>
					</Dialog>
				</Transition>
			</section>
		</>
	);
});
export default ActivityFeed;

import React, { Fragment, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SecondaryCloseIcon from "../../../../../assets/SecondaryCloseIcon.js";
import { useManageTable } from "../hooks/useManageTable.js";
import ArrowDropdown from "../../../../../assets/ArrowDropdown.js";
import { useSizes } from "../../../../../hooks/useSizes.js";

const ListOfTracks = memo(({ track }: any) => {
	return (
		<>
			{track.items.map((item, index) => (
				<tr
					className="flex justify-between items-center py-4 border-b border-secondary_dark_gray w-full"
					key={index}
				>
					<td className="w-[65%] flex gap-4">
						<img
							src={item.imageUrl}
							alt=""
							className="w-11 h-11 rounded-full"
						/>
						<div>
							<p className="text-t2Regular">{item.primaryText}</p>
							<p className="text-caption_s_desk text-medium_grey">
								{item.artistName}
							</p>
						</div>
					</td>
					{item.values.map((val, indexVal) => (
						<td
							key={indexVal}
							className="flex-1 px-3 text-caption_r_desk text-light_grey"
						>
							{val}
						</td>
					))}
				</tr>
			))}
		</>
	);
});
const CountryDataPopup = memo(() => {
	const { openModal, setOpenModal, dataPopup } = useManageTable();
	const { elementRange } = useSizes(1024, 1920);
	const { isMobile, isTablet } = useSizes();
	const minWidthContainer = elementRange(50, 76.9);
	return (
		<Transition appear show={openModal} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-40 overflow-y-auto"
				onClose={() => setOpenModal(false)}
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
				<div className="">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Dialog.Panel
							className=" bg-popup_gray lg:my-20 p-4 md:p-8 lg:p-10 lg:mx-auto lg:rounded-[20px] z-50 relative w-full lg:w-fit "
							style={{
								minWidth:
									isMobile || isTablet ? "unset" : `${minWidthContainer}rem`,
							}}
						>
							<div
								className="w-full flex justify-end"
								onClick={() => setOpenModal(false)}
							>
								<SecondaryCloseIcon className="stroke-white" />
							</div>
							<div className="flex flex-col gap-6">
								<div className="py-2 flex items-center gap-4">
									<div
										style={{
											backgroundImage: `url(${dataPopup?.popupInfo?.avatar})`,
										}}
										className="w-10 h-10 rounded-md bg-center bg-no-repeat "
									></div>
									<h1 className="text-t1Semi_deck">
										{dataPopup?.popupInfo?.countryName}
									</h1>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 lg:gap-6">
									{dataPopup?.popupInfo?.summaryData?.map((item, index) => (
										<div
											key={index}
											className="w-full py-9 px-7 flex items-center gap-6 rounded-xl bg-[#484848]/40 justify-between "
										>
											<h2 className="text-caption_r_desk text-medium_grey">
												{item.titleText}
											</h2>
											<p className="text-t1Semi_deck text-light_grey">
												{item.primaryValue}
											</p>
										</div>
									))}
								</div>
								<div>
									<h3 className="text-btnText text-light_grey mt-2 mb-4">
										Статистика по трекам
									</h3>
									<table className="w-full mb-[7.5rem] hidden md:table">
										<div className="px-8 md:py-8 lg:py-5 bg-[#48484840] rounded-t-xl">
											<thead className="table w-full">
												<tr className="flex justify-between ">
													<th className="flex items-center gap-2 w-[65%]">
														<p className="text-btnText">Название трека</p>
														<ArrowDropdown className={"fill-white"} />
													</th>
													{dataPopup?.popupInfo?.listDataHeaders?.map(
														(item, index) => (
															<th
																key={index}
																className="flex flex-1 items-center gap-2 px-3 whitespace-nowrap"
															>
																<p className="text-btnText">{item}</p>
																<ArrowDropdown className={"fill-white"} />
															</th>
														),
													)}
												</tr>
											</thead>
										</div>
										<div className="py-3 px-8 w-full bg-yellow flex items-center gap-.5">
											<p className="text-caption_r_desk text-black">
												Страна: <span>{dataPopup?.popupInfo?.countryName}</span>
											</p>
										</div>
										<tbody>
											{dataPopup?.popupInfo?.listData.map((track, index) => (
												<div key={index} className="px-8">
													<h1 className="py-4 text-t1Regular">
														{track.header.primaryText}
													</h1>
													<div className="table w-full">
														<ListOfTracks track={track} />
													</div>
												</div>
											))}
										</tbody>
									</table>
									<div className="md:hidden mb-[7.5rem]">
										<div className="py-3 px-8 w-full bg-yellow flex items-center gap-.5">
											<p className="text-caption_r_desk text-black">
												Страна: <span>{dataPopup?.popupInfo?.countryName}</span>
											</p>
										</div>
										<div>
											{dataPopup?.popupInfo?.listData?.map((item, index) => (
												<div className="mt-4" key={index}>
													<h2 className="text-t1Regular">
														{item?.header?.primaryText}
													</h2>
													<ul>
														{item.items.map((track, trackIndex) => (
															<li
																key={trackIndex}
																className="py-4 flex flex-col gap-4 border-b border-secondary_dark_gray"
															>
																<div className="flex gap-4 items-center">
																	<img
																		src={track.imageUrl}
																		alt=""
																		className="w-11 h-11 rounded-full"
																	/>
																	<div>
																		<p className="text-t2Regular">
																			{track.primaryText}
																		</p>
																		<p className="text-caption_s_desk text-medium_grey">
																			{track.artistName}
																		</p>
																	</div>
																</div>
																<div>
																	<div className="w-full grid grid-cols-2 gap-2">
																		{dataPopup?.popupInfo?.listDataHeaders.map(
																			(header, indexHeader) => (
																				<p
																					key={indexHeader}
																					className="text-caption_r_desk text-light_grey"
																				>
																					{header}
																				</p>
																			),
																		)}
																		{track.values.map((val, indexVal) => (
																			<p
																				key={indexVal}
																				className="text-caption_r_desk text-light_grey"
																			>
																				{val}
																			</p>
																		))}
																	</div>
																</div>
															</li>
														))}
													</ul>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
});
export default CountryDataPopup;

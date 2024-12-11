import { socials } from "../../../../data/consts/socials.js";
import { allSources } from "../../../../data/consts/favoriteSources.js";
import React, { memo, useState } from "react";
import { useFavoriteSources } from "../hooks/useFavoriteSources.js";
import { Listbox, Transition } from "@headlessui/react";
import ChevronRight from "../../../../assets/ChevronRight.js";
import { FavoriteIcon } from "../../../../assets/FavoriteIcon.js";
import { useSubscriptions } from "../hooks/useSubscriptions.js";
import { navbar } from "../../../../data/consts/navbar.js";

export const ListBox = memo(() => {
	const { artistsFromSubscriptions } = useSubscriptions();
	const artists = Object.entries(artistsFromSubscriptions);
	const [selectedSubscription, setSelectedSubscription] = useState(
		Object.values(artistsFromSubscriptions)[1],
	);

	return (
		<Listbox value={selectedSubscription} onChange={setSelectedSubscription}>
			<Listbox.Label className="text-caption_m_desk text-medium_grey ">
				Выбери подписку{" "}
			</Listbox.Label>
			<Listbox.Button className=" w-full relative mt-1.5">
				{({ open }) => (
					<div
						className={`flex justify-between items-center w-full text-t2Regular py-2.5 px-3.5  ${open ? " border border-solid border-b-secondary_dark_gray border-transparent bg-popup_gray rounded-t-xl " : "border border-solid border-secondary_dark_gray rounded-xl "}`}
					>
						<div className="flex gap-2 items-center">
							<p className="text-t2Regular">{selectedSubscription?.name}</p>
						</div>
						<ChevronRight
							color="#7B7B7B"
							className={` w-5 h-5 transition duration-300 ${open ? "-rotate-90 " : "rotate-90 transition"}`}
						/>
					</div>
				)}
			</Listbox.Button>
			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<Listbox.Options className="bg-popup_gray  rounded-b-xl  max-w-[35rem] absolute w-full">
					{artists?.map(([_, value], index) =>
						value.name !== selectedSubscription.name ? (
							<Listbox.Option
								key={index}
								value={value}
								className={`py-2.5 px-3.5 cursor-pointer  ${artists.length - 1 ? "" : "border-b border-secondary_dark_gray"}`}
							>
								{({ active, selected }) => (
									<div
										className={`flex gap-2 items-center ${active ? "" : ""}`}
									>
										<p className="text-t2Regular">{value.name}</p>
									</div>
								)}
							</Listbox.Option>
						) : null,
					)}
				</Listbox.Options>
			</Transition>
		</Listbox>
	);
});
export const FavoriteSources = memo(() => {
	const { favoriteSources, addFavoriteSource, removeFavoriteSources } =
		useFavoriteSources();
	const sources = navbar[0].content[0].options;

	return (
		<>
			<h1 className="text-t1Semi_ipad lg:hidden">Избранные платформы</h1>
			<section className="py-6 flex flex-col gap-6">
				<div className="w-full max-w-[35rem]">
					<ListBox />
				</div>
				<ol className="lg:w-1/2" type="1">
					{sources.map((source, index) => (
						<li
							key={index}
							className="px-6 py-4 border-b border-secondary_dark_gray flex justify-between"
						>
							<div className="flex gap-2 items-center">
								<img src={source.logo} alt={source.name} className="w-5 h-5" />
								<p className="text-t2Regular">{source.name}</p>
							</div>
							<FavoriteIcon className="fill-secondary_red" />
						</li>
					))}
				</ol>
				<p className="text-caption_s_desk text-medium_grey lg:w-1/2 mt-8 lg:mt-[unset]">
					*компания Meta Platforms Inc., владеющая Facebook и Instagram, внесена
					в реестр экстремистских организаций, ее деятельность в России по
					поддержанию указанных соцсетей признана экстремистской деятельностью
				</p>
			</section>
		</>
	);
});

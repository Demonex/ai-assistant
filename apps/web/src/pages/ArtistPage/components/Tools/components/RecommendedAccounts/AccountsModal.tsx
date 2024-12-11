import React, { Fragment, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "wouter";
import { navbar } from "../../../../../../data/consts/navbar.js";
import SecondaryCloseIcon from "../../../../../../assets/SecondaryCloseIcon.js";

const popupData = {
	result: "success",
	message: "Data retrieved.",
	type: "soundcloud_user",
	popupIdUnique: "336310932",
	popupInfo: {
		id: 8202890,
		externalId: "336310932",
		externalUrl: "https://soundcloud.com/kindhoneybear",
		name: "Honey Bear",
		imageUrl: "https://i1.sndcdn.com/avatars-000475764219-ppty0n-t300x300.jpg",
		contactInfo: [
			{
				iconName: "email",
				value: "promoforyoursong@gmail.com",
				url: "mailto:promoforyoursong@gmail.com",
				displayText: "Email",
			},
		],
		featuredArtists: [
			{
				id: 50655,
				idUnique: "ex1lbpqd",
				name: "Five Finger Death Punch",
				imageUrl:
					"https://i.scdn.co/image/ab676161000051741e7f796a17c2dc3c28bdeeb9",
				baseUrl: "/artist/ex1lbpqd/five-finger-death-punch",
				trackTitle: "Under And Over It (Kill The Noise Remix)",
				isRelated: 1,
				otherTracksText: "",
			},
			{
				id: 117669,
				idUnique: "9fmds2y4",
				name: "Apocalyptica",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174d5b5240aa1e0454e3ea2eb72",
				baseUrl: "/artist/9fmds2y4/apocalyptica",
				trackTitle: "I Don't Care",
				isRelated: 1,
				otherTracksText: "",
			},
			{
				id: 6579,
				idUnique: "hybwnsz9",
				name: "Yellow Claw",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174bfcdd40c31a9cc9ecd390779",
				baseUrl: "/artist/hybwnsz9/yellow-claw",
				trackTitle: "Thunder (Evil Activities & E-Life Remix)",
				isRelated: 0,
				otherTracksText: "(+5 more)",
			},
			{
				id: 1161,
				idUnique: "ao87gj4q",
				name: "R3HAB",
				imageUrl:
					"https://i.scdn.co/image/ab6761610000517420dfb8f52ef4926a22e552c8",
				baseUrl: "/artist/ao87gj4q/r3hab",
				trackTitle: "Turn Up The Love - R3hab Remix",
				isRelated: 0,
				otherTracksText: "(+5 more)",
			},
			{
				id: 1727,
				idUnique: "v9d81she",
				name: "Dash Berlin",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174da7dc9c89c7805e6a8394ddc",
				baseUrl: "/artist/v9d81she/dash-berlin",
				trackTitle: "World Falls Apart - Thomas Gold Remix Radio Edit",
				isRelated: 0,
				otherTracksText: "(+5 more)",
			},
			{
				id: 807,
				idUnique: "zekd2p9r",
				name: "Diplo",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174df01727aa674ddefa777797a",
				baseUrl: "/artist/zekd2p9r/diplo",
				trackTitle: "Pick Your Poison feat. Kay",
				isRelated: 0,
				otherTracksText: "(+4 more)",
			},
			{
				id: 4568,
				idUnique: "1oz4usfj",
				name: "NERVO",
				imageUrl:
					"https://i.scdn.co/image/ab676161000051740d672afd26632c2545d95a43",
				baseUrl: "/artist/1oz4usfj/nervo",
				trackTitle: "Ready for the Weekend - Don Diablo Remix",
				isRelated: 0,
				otherTracksText: "(+4 more)",
			},
			{
				id: 2448,
				idUnique: "4edf1y63",
				name: "Skrillex",
				imageUrl:
					"https://i.scdn.co/image/ab6761610000517461f92702ca14484aa263a931",
				baseUrl: "/artist/4edf1y63/skrillex",
				trackTitle: "Levels - Skrillex Remix",
				isRelated: 0,
				otherTracksText: "(+4 more)",
			},
			{
				id: 11898,
				idUnique: "9xezagd1",
				name: "NGHTMRE",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174466d14e7d8546d3b51368157",
				baseUrl: "/artist/9xezagd1/nghtmre",
				trackTitle: "MTRD",
				isRelated: 0,
				otherTracksText: "(+4 more)",
			},
			{
				id: 4180,
				idUnique: "1z7lo53g",
				name: "Lana Del Rey",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174b99cacf8acd5378206767261",
				baseUrl: "/artist/1z7lo53g/lana-del-rey",
				trackTitle: "West Coast - Alex Nagshineh Remix",
				isRelated: 0,
				otherTracksText: "(+3 more)",
			},
			{
				id: 802,
				idUnique: "3jn9guci",
				name: "Tiësto",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174e84e08fb1dfa2bf9b5a61563",
				baseUrl: "/artist/3jn9guci/tiesto",
				trackTitle: "Light Years Away - Extended Radio Edit",
				isRelated: 0,
				otherTracksText: "(+3 more)",
			},
			{
				id: 2623,
				idUnique: "zg0x9a7v",
				name: "Kill The Noise",
				imageUrl:
					"https://i.scdn.co/image/ab6761610000517447d6ca1ea7795273556c6a75",
				baseUrl: "/artist/zg0x9a7v/kill-the-noise",
				trackTitle: "Under And Over It (Kill The Noise Remix)",
				isRelated: 0,
				otherTracksText: "(+3 more)",
			},
			{
				id: 187,
				idUnique: "lfr57c3v",
				name: "Above & Beyond",
				imageUrl:
					"https://i.scdn.co/image/ab676161000051742a538d1a36a271885510d98a",
				baseUrl: "/artist/lfr57c3v/above-beyond",
				trackTitle: "Thing Called Love",
				isRelated: 0,
				otherTracksText: "(+3 more)",
			},
			{
				id: 829,
				idUnique: "kziftjly",
				name: "OceanLab",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174f6f3fe34f9bd7a78b6a727d9",
				baseUrl: "/artist/kziftjly/oceanlab",
				trackTitle: "Thing Called Love",
				isRelated: 0,
				otherTracksText: "(+3 more)",
			},
			{
				id: 11576,
				idUnique: "6ael8czp",
				name: "Danyka",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174a84952a328a64f6acd15df1d",
				baseUrl: "/artist/6ael8czp/danyka",
				trackTitle: "Yours Truly - Summer Was Fun Remix",
				isRelated: 0,
				otherTracksText: "(+3 more)",
			},
			{
				id: 2098,
				idUnique: "48ra1cnv",
				name: "Don Diablo",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174f0f2a0a6e0df42417a20bb8e",
				baseUrl: "/artist/48ra1cnv/don-diablo",
				trackTitle: "Ready for the Weekend - Don Diablo Remix",
				isRelated: 0,
				otherTracksText: "(+3 more)",
			},
			{
				id: 2087,
				idUnique: "wlbzrok3",
				name: "Boys Noize",
				imageUrl:
					"https://i.scdn.co/image/ab676161000051741fc195ac5c1868725eced009",
				baseUrl: "/artist/wlbzrok3/boys-noize",
				trackTitle: "What You Want (Chromeo Remix)",
				isRelated: 0,
				otherTracksText: "(+3 more)",
			},
			{
				id: 2180,
				idUnique: "2mtge7rp",
				name: "Fractal",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174a4b3b219a4d4e22c3ab0be84",
				baseUrl: "/artist/2mtge7rp/fractal",
				trackTitle: "Itvara",
				isRelated: 0,
				otherTracksText: "(+3 more)",
			},
			{
				id: 9324,
				idUnique: "ajp4h2yr",
				name: "Oliver Heldens",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174e0de3617061247aa35ff7865",
				baseUrl: "/artist/ajp4h2yr/oliver-heldens",
				trackTitle: "Waiting",
				isRelated: 0,
				otherTracksText: "(+3 more)",
			},
			{
				id: 86,
				idUnique: "ps6k3zle",
				name: "Armin van Buuren",
				imageUrl:
					"https://i.scdn.co/image/ab6761610000517490db664ba1bf6574239f859d",
				baseUrl: "/artist/ps6k3zle/armin-van-buuren",
				trackTitle:
					"Rapture (Armin Van Buuren Remix Remastered) [feat. Nadia Ali]",
				isRelated: 0,
				otherTracksText: "(+3 more)",
			},
		],
		isVerified: false,
		metadata: [
			{
				displayText: "SoundCloud",
				iconName: "soundcloud-circle",
			},
			{
				displayText: "UK",
			},
			{
				displayText: "11.2K Followers",
			},
		],
		videoSectionTitle: "Videos",
		videos: [],
	},
	popupStyle: "creator",
	sourceId: "soundcloud",
	isRestricted: false,
	hasAccess: true,
};

const AccountsModal = memo(({ openModal, setOpenModal }: any) => {
	const findIcon = navbar[0].content[0].options.find(
		(icon) => icon.slug === popupData.sourceId,
	);
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
						<Dialog.Panel className=" bg-popup_gray lg:my-20 p-4 md:py-8 lg:py-10 md:px-8 lg:px-[3.75rem] lg:mx-auto lg:rounded-[20px] z-50 relative w-full lg:max-w-[60rem] mb-[7rem] md:mb-[unset] h-auto md:h-full lg:h-[unset]">
							<div
								className="w-full flex justify-end cursor-pointer"
								onClick={() => setOpenModal(false)}
							>
								<SecondaryCloseIcon className="stroke-white" />
							</div>
							<div className="flex flex-col gap-6">
								<div className="pb-2 flex gap-6 flex-col md:flex-row">
									<img
										src={popupData.popupInfo.imageUrl}
										className="w-[5rem] h-[5rem] rounded-full"
									/>
									<div className="flex flex-col gap-2">
										<h1 className="text-t1Semi_mob md:text-t1Semi_deck">
											{popupData.popupInfo.name}
										</h1>
										<div className="flex gap-2 flex-wrap">
											{popupData.popupInfo.metadata.map((item, index) => (
												<div key={index} className="flex items-center gap-2">
													{index === 0 && (
														<img src={findIcon.logo} className="w-5 h-5" />
													)}
													<p
														className={`text-t2Regular ${index === 0 ? "text-light_grey" : index === 1 ? "text-white" : "text-medium_grey"}`}
													>
														{item.displayText}
														{index !==
															popupData.popupInfo.metadata.length - 1 && (
															<span className="text-medium_grey ml-2">|</span>
														)}
													</p>
												</div>
											))}
										</div>
									</div>
								</div>
								<div className="flex gap-4 md:gap-6 flex-col md:flex-row">
									<div className="w-full">
										<label className="text-caption_s_desk text-medium_grey">
											КОНТАКТЫ
										</label>
										<ul className="mt-4">
											{popupData.popupInfo.contactInfo.map((item, index) => (
												<li
													className="flex gap-2 mb-0.5 items-center"
													key={index}
												>
													<img src={findIcon.logo} className="w-5 h-5" />
													<Link to={item.url} className="text-t2Regular">
														{item.displayText}
													</Link>
												</li>
											))}
										</ul>
									</div>
								</div>
								<div>
									<h2 className="text-btnText ">Рекоммендованные музыканты</h2>
									<ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-2 ">
										{popupData.popupInfo.featuredArtists.map((item, index) => (
											<li
												key={index}
												className="py-2 flex gap-4 items-center border-b border-secondary_dark_gray"
											>
												<img
													src={item.imageUrl}
													className="w-11 h-11 rounded-full"
												/>
												<div className="w-2/3">
													<h3 className="text-t2Regular whitespace-nowrap truncate">
														{item.trackTitle}
													</h3>
													<p className="text-caption_s_desk text-medium_grey">
														{item.name}
													</p>
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
});
export default AccountsModal;

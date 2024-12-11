import React, { Fragment, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SecondaryCloseIcon from "../../../../../../../assets/SecondaryCloseIcon.js";
import { navbar } from "../../../../../../../data/consts/navbar.js";
import { Link } from "wouter";

const popupData = {
	result: "success",
	message: "Data retrieved.",
	type: "spotify_playlist",
	popupIdUnique: "5ays2V6J0Gx1ZBhqDSqUpJ",
	popupInfo: {
		id: 77005302,
		externalId: "5ays2V6J0Gx1ZBhqDSqUpJ",
		externalUrl: "https://open.spotify.com/playlist/5ays2V6J0Gx1ZBhqDSqUpJ",
		name: "All New Metal",
		imageUrl:
			"https://mosaic.scdn.co/120/ab67616d00001e023be704afb12805f8358b6d4dab67616d00001e02658c23d13dd933df7dc8d874ab67616d00001e028b6586da8313fae8dff2f12eab67616d00001e02d7e445d525503f3377863209",
		contactInfo: [
			{
				iconName: "dailyplaylists",
				value: "https://dailyplaylists.com/playlists/5ays2V6J0Gx1ZBhqDSqUpJ",
				url: "https://dailyplaylists.com/playlists/5ays2V6J0Gx1ZBhqDSqUpJ?utm_source=songstats",
				displayText: "DailyPlaylists",
			},
		],
		featuredArtists: [
			{
				id: 6930,
				idUnique: "5e1hza9y",
				name: "Metallica",
				imageUrl:
					"https://i.scdn.co/image/ab6761610000517469ca98dd3083f1082d740e44",
				baseUrl: "/artist/5e1hza9y/metallica",
				trackTitle: "Screaming Suicide",
				isRelated: 1,
				otherTracksText: "",
			},
			{
				id: 40250,
				idUnique: "xfhd20pe",
				name: "Slipknot",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174d0cdb283a7384a0edb665182",
				baseUrl: "/artist/xfhd20pe/slipknot",
				trackTitle: "Bone Church",
				isRelated: 1,
				otherTracksText: "",
			},
			{
				id: 296766,
				idUnique: "w1s8tvek",
				name: "Judas Priest",
				imageUrl:
					"https://i.scdn.co/image/ab676161000051744b3cfc24737acb15e73e8bd6",
				baseUrl: "/artist/w1s8tvek/judas-priest",
				trackTitle: "Panic Attack",
				isRelated: 1,
				otherTracksText: "",
			},
			{
				id: 217781,
				idUnique: "tkq5gwp1",
				name: "Ghost",
				imageUrl:
					"https://i.scdn.co/image/ab676161000051742518768732e7215a9f765ca8",
				baseUrl: "/artist/tkq5gwp1/ghost",
				trackTitle: "Jesus He Knows Me",
				isRelated: 1,
				otherTracksText: "",
			},
			{
				id: 172385,
				idUnique: "hcp5eaoi",
				name: "In Flames",
				imageUrl:
					"https://i.scdn.co/image/ab676161000051745c3bd919d1344a738af14136",
				baseUrl: "/artist/hcp5eaoi/in-flames",
				trackTitle: "Meet Your Maker",
				isRelated: 1,
				otherTracksText: "(+1 more)",
			},
			{
				id: 99958,
				idUnique: "zm6cuyqa",
				name: "Serj Tankian",
				imageUrl:
					"https://i.scdn.co/image/ab676161000051745e304e5c1968ca518011749d",
				baseUrl: "/artist/zm6cuyqa/serj-tankian",
				trackTitle: "Black Thunder (feat. Serj Tankian and DL of Bad Wolves)",
				isRelated: 1,
				otherTracksText: "",
			},
			{
				id: 199806,
				idUnique: "3q47evwn",
				name: "Avatar",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174855109a43a9e095d91916955",
				baseUrl: "/artist/3q47evwn/avatar",
				trackTitle: "The Dirt I'm Buried In",
				isRelated: 1,
				otherTracksText: "(+1 more)",
			},
			{
				id: 120779,
				idUnique: "vix0lcp6",
				name: "The Hu",
				imageUrl:
					"https://i.scdn.co/image/edaf8d77b3a916a071de63e50007c3483c33a75e",
				baseUrl: "/artist/vix0lcp6/the-hu",
				trackTitle: "Black Thunder (feat. Serj Tankian and DL of Bad Wolves)",
				isRelated: 1,
				otherTracksText: "",
			},
			{
				id: 4822,
				idUnique: "txf0oz1s",
				name: "Linkin Park",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174c7e6bd9e65eab62a53355576",
				baseUrl: "/artist/txf0oz1s/linkin-park",
				trackTitle: "Fighting Myself",
				isRelated: 0,
				otherTracksText: "",
			},
			{
				id: 17096,
				idUnique: "alkd2z5b",
				name: "Lil Uzi Vert",
				imageUrl:
					"https://i.scdn.co/image/ab676161000051741234d2f516796badbdf16a89",
				baseUrl: "/artist/alkd2z5b/lil-uzi-vert",
				trackTitle: "AmEN! (feat. Lil Uzi Vert and Daryl Palumbo of Glassjaw)",
				isRelated: 0,
				otherTracksText: "",
			},
			{
				id: 20862,
				idUnique: "sxc425m7",
				name: "Bring Me The Horizon",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174e7c9399d0b5d813c20cbec65",
				baseUrl: "/artist/sxc425m7/bring-me-the-horizon",
				trackTitle: "AmEN! (feat. Lil Uzi Vert and Daryl Palumbo of Glassjaw)",
				isRelated: 0,
				otherTracksText: "",
			},
			{
				id: 56594,
				idUnique: "dsu1i7a5",
				name: "BABYMETAL",
				imageUrl:
					"https://i.scdn.co/image/ab676161000051742c0d80b9de67c2819bb4dbc0",
				baseUrl: "/artist/dsu1i7a5/babymetal",
				trackTitle: "METALI!! - feat. Tom Morello",
				isRelated: 0,
				otherTracksText: "",
			},
			{
				id: 277458,
				idUnique: "mqvfli1o",
				name: "Ice Nine Kills",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174e8119ccdb928a59489dada04",
				baseUrl: "/artist/mqvfli1o/ice-nine-kills",
				trackTitle: "Meat & Greet",
				isRelated: 0,
				otherTracksText: "",
			},
			{
				id: 140507,
				idUnique: "z8earimd",
				name: "The HU",
				imageUrl:
					"https://i.scdn.co/image/ab676161000051742ccdc24acf91ba14b1b2273a",
				baseUrl: "/artist/z8earimd/the-hu",
				trackTitle: "Black Thunder (feat. Serj Tankian and DL of Bad Wolves)",
				isRelated: 0,
				otherTracksText: "",
			},
			{
				id: 132911,
				idUnique: "bl0a8xtw",
				name: "Electric Callboy",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174e7dfdfea3ce04c4a660baaf2",
				baseUrl: "/artist/bl0a8xtw/electric-callboy",
				trackTitle: "Everytime We Touch - TEKKNO Version",
				isRelated: 0,
				otherTracksText: "",
			},
			{
				id: 47097,
				idUnique: "cpjx8bv3",
				name: "Bad Wolves",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174aea7af79e09a90e00aa5952a",
				baseUrl: "/artist/cpjx8bv3/bad-wolves",
				trackTitle: "Black Thunder (feat. Serj Tankian and DL of Bad Wolves)",
				isRelated: 0,
				otherTracksText: "",
			},
			{
				id: 140554,
				idUnique: "h4di0nkl",
				name: "Powerman 5000",
				imageUrl:
					"https://i.scdn.co/image/ab676161000051740f957682f8d10f3cc8c81b69",
				baseUrl: "/artist/h4di0nkl/powerman-5000",
				trackTitle: "Invisible Man",
				isRelated: 0,
				otherTracksText: "",
			},
			{
				id: 132319,
				idUnique: "dwjksyb0",
				name: "Lacuna Coil",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174217481d42438a6eaaa1d450e",
				baseUrl: "/artist/dwjksyb0/lacuna-coil",
				trackTitle: "Never Dawn",
				isRelated: 0,
				otherTracksText: "",
			},
			{
				id: 29170,
				idUnique: "dyk9blq8",
				name: "Tom Morello",
				imageUrl:
					"https://i.scdn.co/image/ab67616100005174a824aca6e278acca89bc406b",
				baseUrl: "/artist/dyk9blq8/tom-morello",
				trackTitle: "METALI!! - feat. Tom Morello",
				isRelated: 0,
				otherTracksText: "",
			},
			{
				id: 229847,
				idUnique: "3yw6tda2",
				name: "Unleash The Archers",
				imageUrl:
					"https://i.scdn.co/image/ab676161000051748138046dbc917588b96bfc72",
				baseUrl: "/artist/3yw6tda2/unleash-the-archers",
				trackTitle: "Blood Empress",
				isRelated: 0,
				otherTracksText: "",
			},
		],
		basicInfo: [
			{
				key: "Genre",
				value: "Metal, Alternative Metal",
			},
			{
				key: "Type",
				value: "Listener",
			},
			{
				key: "28 Days Change",
				value: "-39 Followers",
			},
			{
				key: "Avg. Song Popularity",
				value: "46.2% (Any Popularity)",
			},
			{
				key: "Avg. Song Release Date",
				value: "29 Sep 2023 (Any Age)",
			},
			{
				key: "Last updated",
				value: "about 4 hours ago",
			},
		],
		metadata: [
			{
				displayText: "Spotify",
				iconName: "spotify-circle",
			},
			{
				displayText: "Christopher V.",
				link: "http://open.spotify.com/user/31sdmpni4gb4yiy6jduivpphoysm",
			},
			{
				displayText: "23.2K Followers",
			},
			{
				displayText: "35 Songs",
			},
		],
	},
	popupStyle: "playlist",
	sourceId: "spotify",
	isRestricted: false,
	hasAccess: true,
};

const TrackModal = memo(({ openModal, setOpenModal }: any) => {
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
											О ПЛЕЙЛИСТЕ
										</label>
										<ul className="mt-4">
											{popupData.popupInfo.basicInfo.map((item, index) => (
												<li className="flex gap-2 mb-0.5" key={index}>
													<p className="text-caption_m_desk text-light_grey whitespace-nowrap">
														{item.key} :
													</p>
													<p className="text-caption_m_desk text-light_grey">
														{item.value}
													</p>
												</li>
											))}
										</ul>
									</div>
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
									<h2 className="text-btnText ">Артисты</h2>
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
export default TrackModal;

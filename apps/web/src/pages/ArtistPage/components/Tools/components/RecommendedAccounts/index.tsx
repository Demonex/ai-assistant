import React, { memo, useState } from "react";
import TrackModal from "../Recommended/components/TrackModal.js";
import { ShowOnMobileToTablet } from "../../../../../../components/showFromMobileToTablet/index.js";
import ShareIconTools from "../../../../../../assets/ShareIconTools.js";
import { ReloadIcon } from "../../../../../../assets/ReloadIcon.js";
import { Listbox, Transition } from "@headlessui/react";
import ChevronRight from "../../../../../../assets/ChevronRight.js";
import InfoIcon from "../../../../../../assets/InfoIcon.js";
import { navbar } from "../../../../../../data/consts/navbar.js";
import AccountsModal from "./AccountsModal.js";

const data = {
	result: "success",
	message: "Data retrieved.",
	playlists: [
		{
			id: 1700619,
			primaryText: "Nación Rock",
			isVerified: false,
			secondaryText: "@nacion_rock",
			valueText: "79.5K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/001/700/619/original/data?1726541952",
			popupType: "instagram_user",
			popupIdUnique: "804928078",
			popupStyle: "creator",
		},
		{
			id: 15007679,
			primaryText: "Paul Rico",
			isVerified: false,
			secondaryText: "@paulricz",
			valueText: "239K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/015/007/679/original/data?1721171462",
			popupType: "instagram_user",
			popupIdUnique: "173933955",
			popupStyle: "creator",
		},
		{
			id: 520010,
			primaryText: "Tere Bascu I Tu guía en Australia 🇦🇺",
			isVerified: false,
			secondaryText: "@tere_bascu",
			valueText: "12.1K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/000/520/010/original/data?1713434944",
			popupType: "instagram_user",
			popupIdUnique: "1391504132",
			popupStyle: "creator",
		},
		{
			id: 20000486,
			primaryText: "Lukasz Bielawski",
			isVerified: false,
			secondaryText: "@nydaily_photos",
			valueText: "139K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/020/000/486/original/data?1721791098",
			popupType: "instagram_user",
			popupIdUnique: "192435886",
			popupStyle: "creator",
		},
		{
			id: 500091,
			primaryText: "Raspreet Sandhu || Professional Soccer Trainer",
			isVerified: false,
			secondaryText: "@itpa_soccer",
			valueText: "102K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/000/500/091/original/data?1721447187",
			popupType: "instagram_user",
			popupIdUnique: "39433013440",
			popupStyle: "creator",
		},
		{
			id: 620026,
			primaryText: "Munay Sandboard 🔥",
			isVerified: false,
			secondaryText: "@munay_sandboard",
			valueText: "52.9K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/000/620/026/original/data?1719138781",
			popupType: "instagram_user",
			popupIdUnique: "5824375560",
			popupStyle: "creator",
		},
		{
			id: 25008895,
			primaryText: "Velez Cynthia",
			isVerified: false,
			secondaryText: "@lapachuqita.viclera",
			valueText: "69.6K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/025/008/895/original/data?1691546585",
			popupType: "instagram_user",
			popupIdUnique: "2061689288",
			popupStyle: "creator",
		},
		{
			id: 13001623,
			primaryText: "Robin Petgrave",
			isVerified: true,
			secondaryText: "@robin.at.tam",
			valueText: "505K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/013/001/623/original/data?1726575198",
			popupType: "instagram_user",
			popupIdUnique: "638317592",
			popupStyle: "creator",
		},
		{
			id: 8200589,
			primaryText: "killswitchbikes",
			isVerified: false,
			secondaryText: "@_killswitchbikes",
			valueText: "252K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/008/200/589/original/data?1719990640",
			popupType: "instagram_user",
			popupIdUnique: "850263784",
			popupStyle: "creator",
		},
		{
			id: 22005373,
			primaryText: "Loyd Corgi",
			isVerified: false,
			secondaryText: "@loyd_king_corg",
			valueText: "103K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/022/005/373/original/data?1695324879",
			popupType: "instagram_user",
			popupIdUnique: "11951138398",
			popupStyle: "creator",
		},
		{
			id: 13013293,
			primaryText: "Matt Kasper",
			isVerified: true,
			secondaryText: "@theheavymetalvegan",
			valueText: "22.9K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/013/013/293/original/data?1691802746",
			popupType: "instagram_user",
			popupIdUnique: "50337925893",
			popupStyle: "creator",
		},
		{
			id: 3801655,
			primaryText: "Victoria Prince",
			isVerified: true,
			secondaryText: "@vprincemusic",
			valueText: "108K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/003/801/655/original/data?1699902164",
			popupType: "instagram_user",
			popupIdUnique: "3068908197",
			popupStyle: "creator",
		},
		{
			id: 42012524,
			primaryText: "Denisa Grossová",
			isVerified: true,
			secondaryText: "@denisagrossova",
			valueText: "21.9K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/042/012/524/original/data?1723752433",
			popupType: "instagram_user",
			popupIdUnique: "548688510",
			popupStyle: "creator",
		},
		{
			id: 11015469,
			primaryText: "SideX Japan",
			isVerified: false,
			secondaryText: "@sidexjapan",
			valueText: "57.7K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/011/015/469/original/data?1694149614",
			popupType: "instagram_user",
			popupIdUnique: "32657984745",
			popupStyle: "creator",
		},
		{
			id: 92019,
			primaryText: "Dj Cabezon",
			isVerified: false,
			secondaryText: "@djcabezon",
			valueText: "12K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/000/092/019/original/data?1713580951",
			popupType: "instagram_user",
			popupIdUnique: "7582908",
			popupStyle: "creator",
		},
		{
			id: 41019512,
			primaryText: "Anthony Jolon",
			isVerified: true,
			secondaryText: "@anthony_jolon",
			valueText: "38.9K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/041/019/512/original/data?1719313955",
			popupType: "instagram_user",
			popupIdUnique: "17152536",
			popupStyle: "creator",
		},
		{
			id: 24022735,
			primaryText: "Rafa Jaime",
			isVerified: false,
			secondaryText: "@rafajaimemx",
			valueText: "61.4K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/024/022/735/original/data?1716876553",
			popupType: "instagram_user",
			popupIdUnique: "259094031",
			popupStyle: "creator",
		},
		{
			id: 7002859,
			primaryText: "Robin Stone",
			isVerified: false,
			secondaryText: "@robin_stone_drums",
			valueText: "13.3K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/007/002/859/original/data?1721103554",
			popupType: "instagram_user",
			popupIdUnique: "5479328507",
			popupStyle: "creator",
		},
		{
			id: 1002669,
			primaryText: "Lloyd Peckham",
			isVerified: false,
			secondaryText: "@bearded_excavation_uk",
			valueText: "113K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/001/002/669/original/data?1722956294",
			popupType: "instagram_user",
			popupIdUnique: "10912882238",
			popupStyle: "creator",
		},
		{
			id: 37022064,
			primaryText: "𝖒𝖆𝖗𝖎𝖆𝖍",
			isVerified: false,
			secondaryText: "@mariahkrx",
			valueText: "35.7K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/037/022/064/original/data?1729159593",
			popupType: "instagram_user",
			popupIdUnique: "62341082538",
			popupStyle: "creator",
		},
		{
			id: 8002413,
			primaryText: "Bruna Kertes",
			isVerified: false,
			secondaryText: "@kertes_",
			valueText: "35.5K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/008/002/413/original/data?1713361021",
			popupType: "instagram_user",
			popupIdUnique: "40398073",
			popupStyle: "creator",
		},
		{
			id: 18025016,
			primaryText: "Logotips",
			isVerified: false,
			secondaryText: "@logotips__",
			valueText: "84K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/018/025/016/original/data?1727734049",
			popupType: "instagram_user",
			popupIdUnique: "8104640283",
			popupStyle: "creator",
		},
		{
			id: 6402383,
			primaryText: "Brittany Elliott (BZ)",
			isVerified: false,
			secondaryText: "@bzelliott",
			valueText: "45K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/006/402/383/original/data?1724835096",
			popupType: "instagram_user",
			popupIdUnique: "21068941",
			popupStyle: "creator",
		},
		{
			id: 24034399,
			primaryText: "Diandra Lazor",
			isVerified: false,
			secondaryText: "@sassysledgehammer",
			valueText: "45.9K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/024/034/399/original/data?1728202389",
			popupType: "instagram_user",
			popupIdUnique: "272533781",
			popupStyle: "creator",
		},
	],
	creators: [
		{
			id: 1700619,
			primaryText: "Nación Rock",
			isVerified: false,
			secondaryText: "@nacion_rock",
			valueText: "79.5K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/001/700/619/original/data?1726541952",
			popupType: "instagram_user",
			popupIdUnique: "804928078",
			popupStyle: "creator",
		},
		{
			id: 15007679,
			primaryText: "Paul Rico",
			isVerified: false,
			secondaryText: "@paulricz",
			valueText: "239K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/015/007/679/original/data?1721171462",
			popupType: "instagram_user",
			popupIdUnique: "173933955",
			popupStyle: "creator",
		},
		{
			id: 520010,
			primaryText: "Tere Bascu I Tu guía en Australia 🇦🇺",
			isVerified: false,
			secondaryText: "@tere_bascu",
			valueText: "12.1K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/000/520/010/original/data?1713434944",
			popupType: "instagram_user",
			popupIdUnique: "1391504132",
			popupStyle: "creator",
		},
		{
			id: 20000486,
			primaryText: "Lukasz Bielawski",
			isVerified: false,
			secondaryText: "@nydaily_photos",
			valueText: "139K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/020/000/486/original/data?1721791098",
			popupType: "instagram_user",
			popupIdUnique: "192435886",
			popupStyle: "creator",
		},
		{
			id: 500091,
			primaryText: "Raspreet Sandhu || Professional Soccer Trainer",
			isVerified: false,
			secondaryText: "@itpa_soccer",
			valueText: "102K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/000/500/091/original/data?1721447187",
			popupType: "instagram_user",
			popupIdUnique: "39433013440",
			popupStyle: "creator",
		},
		{
			id: 620026,
			primaryText: "Munay Sandboard 🔥",
			isVerified: false,
			secondaryText: "@munay_sandboard",
			valueText: "52.9K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/000/620/026/original/data?1719138781",
			popupType: "instagram_user",
			popupIdUnique: "5824375560",
			popupStyle: "creator",
		},
		{
			id: 25008895,
			primaryText: "Velez Cynthia",
			isVerified: false,
			secondaryText: "@lapachuqita.viclera",
			valueText: "69.6K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/025/008/895/original/data?1691546585",
			popupType: "instagram_user",
			popupIdUnique: "2061689288",
			popupStyle: "creator",
		},
		{
			id: 13001623,
			primaryText: "Robin Petgrave",
			isVerified: true,
			secondaryText: "@robin.at.tam",
			valueText: "505K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/013/001/623/original/data?1726575198",
			popupType: "instagram_user",
			popupIdUnique: "638317592",
			popupStyle: "creator",
		},
		{
			id: 8200589,
			primaryText: "killswitchbikes",
			isVerified: false,
			secondaryText: "@_killswitchbikes",
			valueText: "252K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/008/200/589/original/data?1719990640",
			popupType: "instagram_user",
			popupIdUnique: "850263784",
			popupStyle: "creator",
		},
		{
			id: 22005373,
			primaryText: "Loyd Corgi",
			isVerified: false,
			secondaryText: "@loyd_king_corg",
			valueText: "103K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/022/005/373/original/data?1695324879",
			popupType: "instagram_user",
			popupIdUnique: "11951138398",
			popupStyle: "creator",
		},
		{
			id: 13013293,
			primaryText: "Matt Kasper",
			isVerified: true,
			secondaryText: "@theheavymetalvegan",
			valueText: "22.9K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/013/013/293/original/data?1691802746",
			popupType: "instagram_user",
			popupIdUnique: "50337925893",
			popupStyle: "creator",
		},
		{
			id: 3801655,
			primaryText: "Victoria Prince",
			isVerified: true,
			secondaryText: "@vprincemusic",
			valueText: "108K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/003/801/655/original/data?1699902164",
			popupType: "instagram_user",
			popupIdUnique: "3068908197",
			popupStyle: "creator",
		},
		{
			id: 42012524,
			primaryText: "Denisa Grossová",
			isVerified: true,
			secondaryText: "@denisagrossova",
			valueText: "21.9K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/042/012/524/original/data?1723752433",
			popupType: "instagram_user",
			popupIdUnique: "548688510",
			popupStyle: "creator",
		},
		{
			id: 11015469,
			primaryText: "SideX Japan",
			isVerified: false,
			secondaryText: "@sidexjapan",
			valueText: "57.7K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/011/015/469/original/data?1694149614",
			popupType: "instagram_user",
			popupIdUnique: "32657984745",
			popupStyle: "creator",
		},
		{
			id: 92019,
			primaryText: "Dj Cabezon",
			isVerified: false,
			secondaryText: "@djcabezon",
			valueText: "12K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/000/092/019/original/data?1713580951",
			popupType: "instagram_user",
			popupIdUnique: "7582908",
			popupStyle: "creator",
		},
		{
			id: 41019512,
			primaryText: "Anthony Jolon",
			isVerified: true,
			secondaryText: "@anthony_jolon",
			valueText: "38.9K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/041/019/512/original/data?1719313955",
			popupType: "instagram_user",
			popupIdUnique: "17152536",
			popupStyle: "creator",
		},
		{
			id: 24022735,
			primaryText: "Rafa Jaime",
			isVerified: false,
			secondaryText: "@rafajaimemx",
			valueText: "61.4K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/024/022/735/original/data?1716876553",
			popupType: "instagram_user",
			popupIdUnique: "259094031",
			popupStyle: "creator",
		},
		{
			id: 7002859,
			primaryText: "Robin Stone",
			isVerified: false,
			secondaryText: "@robin_stone_drums",
			valueText: "13.3K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/007/002/859/original/data?1721103554",
			popupType: "instagram_user",
			popupIdUnique: "5479328507",
			popupStyle: "creator",
		},
		{
			id: 1002669,
			primaryText: "Lloyd Peckham",
			isVerified: false,
			secondaryText: "@bearded_excavation_uk",
			valueText: "113K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/001/002/669/original/data?1722956294",
			popupType: "instagram_user",
			popupIdUnique: "10912882238",
			popupStyle: "creator",
		},
		{
			id: 37022064,
			primaryText: "𝖒𝖆𝖗𝖎𝖆𝖍",
			isVerified: false,
			secondaryText: "@mariahkrx",
			valueText: "35.7K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/037/022/064/original/data?1729159593",
			popupType: "instagram_user",
			popupIdUnique: "62341082538",
			popupStyle: "creator",
		},
		{
			id: 8002413,
			primaryText: "Bruna Kertes",
			isVerified: false,
			secondaryText: "@kertes_",
			valueText: "35.5K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/008/002/413/original/data?1713361021",
			popupType: "instagram_user",
			popupIdUnique: "40398073",
			popupStyle: "creator",
		},
		{
			id: 18025016,
			primaryText: "Logotips",
			isVerified: false,
			secondaryText: "@logotips__",
			valueText: "84K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/018/025/016/original/data?1727734049",
			popupType: "instagram_user",
			popupIdUnique: "8104640283",
			popupStyle: "creator",
		},
		{
			id: 6402383,
			primaryText: "Brittany Elliott (BZ)",
			isVerified: false,
			secondaryText: "@bzelliott",
			valueText: "45K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/006/402/383/original/data?1724835096",
			popupType: "instagram_user",
			popupIdUnique: "21068941",
			popupStyle: "creator",
		},
		{
			id: 24034399,
			primaryText: "Diandra Lazor",
			isVerified: false,
			secondaryText: "@sassysledgehammer",
			valueText: "45.9K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/024/034/399/original/data?1728202389",
			popupType: "instagram_user",
			popupIdUnique: "272533781",
			popupStyle: "creator",
		},
	],
	recommendations: [
		{
			id: 1700619,
			primaryText: "Nación Rock",
			isVerified: false,
			secondaryText: "@nacion_rock",
			valueText: "79.5K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/001/700/619/original/data?1726541952",
			popupType: "instagram_user",
			popupIdUnique: "804928078",
			popupStyle: "creator",
		},
		{
			id: 15007679,
			primaryText: "Paul Rico",
			isVerified: false,
			secondaryText: "@paulricz",
			valueText: "239K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/015/007/679/original/data?1721171462",
			popupType: "instagram_user",
			popupIdUnique: "173933955",
			popupStyle: "creator",
		},
		{
			id: 520010,
			primaryText: "Tere Bascu I Tu guía en Australia 🇦🇺",
			isVerified: false,
			secondaryText: "@tere_bascu",
			valueText: "12.1K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/000/520/010/original/data?1713434944",
			popupType: "instagram_user",
			popupIdUnique: "1391504132",
			popupStyle: "creator",
		},
		{
			id: 20000486,
			primaryText: "Lukasz Bielawski",
			isVerified: false,
			secondaryText: "@nydaily_photos",
			valueText: "139K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/020/000/486/original/data?1721791098",
			popupType: "instagram_user",
			popupIdUnique: "192435886",
			popupStyle: "creator",
		},
		{
			id: 500091,
			primaryText: "Raspreet Sandhu || Professional Soccer Trainer",
			isVerified: false,
			secondaryText: "@itpa_soccer",
			valueText: "102K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/000/500/091/original/data?1721447187",
			popupType: "instagram_user",
			popupIdUnique: "39433013440",
			popupStyle: "creator",
		},
		{
			id: 620026,
			primaryText: "Munay Sandboard 🔥",
			isVerified: false,
			secondaryText: "@munay_sandboard",
			valueText: "52.9K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/000/620/026/original/data?1719138781",
			popupType: "instagram_user",
			popupIdUnique: "5824375560",
			popupStyle: "creator",
		},
		{
			id: 25008895,
			primaryText: "Velez Cynthia",
			isVerified: false,
			secondaryText: "@lapachuqita.viclera",
			valueText: "69.6K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/025/008/895/original/data?1691546585",
			popupType: "instagram_user",
			popupIdUnique: "2061689288",
			popupStyle: "creator",
		},
		{
			id: 13001623,
			primaryText: "Robin Petgrave",
			isVerified: true,
			secondaryText: "@robin.at.tam",
			valueText: "505K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/013/001/623/original/data?1726575198",
			popupType: "instagram_user",
			popupIdUnique: "638317592",
			popupStyle: "creator",
		},
		{
			id: 8200589,
			primaryText: "killswitchbikes",
			isVerified: false,
			secondaryText: "@_killswitchbikes",
			valueText: "252K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/008/200/589/original/data?1719990640",
			popupType: "instagram_user",
			popupIdUnique: "850263784",
			popupStyle: "creator",
		},
		{
			id: 22005373,
			primaryText: "Loyd Corgi",
			isVerified: false,
			secondaryText: "@loyd_king_corg",
			valueText: "103K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/022/005/373/original/data?1695324879",
			popupType: "instagram_user",
			popupIdUnique: "11951138398",
			popupStyle: "creator",
		},
		{
			id: 13013293,
			primaryText: "Matt Kasper",
			isVerified: true,
			secondaryText: "@theheavymetalvegan",
			valueText: "22.9K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/013/013/293/original/data?1691802746",
			popupType: "instagram_user",
			popupIdUnique: "50337925893",
			popupStyle: "creator",
		},
		{
			id: 3801655,
			primaryText: "Victoria Prince",
			isVerified: true,
			secondaryText: "@vprincemusic",
			valueText: "108K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/003/801/655/original/data?1699902164",
			popupType: "instagram_user",
			popupIdUnique: "3068908197",
			popupStyle: "creator",
		},
		{
			id: 42012524,
			primaryText: "Denisa Grossová",
			isVerified: true,
			secondaryText: "@denisagrossova",
			valueText: "21.9K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/042/012/524/original/data?1723752433",
			popupType: "instagram_user",
			popupIdUnique: "548688510",
			popupStyle: "creator",
		},
		{
			id: 11015469,
			primaryText: "SideX Japan",
			isVerified: false,
			secondaryText: "@sidexjapan",
			valueText: "57.7K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/011/015/469/original/data?1694149614",
			popupType: "instagram_user",
			popupIdUnique: "32657984745",
			popupStyle: "creator",
		},
		{
			id: 92019,
			primaryText: "Dj Cabezon",
			isVerified: false,
			secondaryText: "@djcabezon",
			valueText: "12K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/000/092/019/original/data?1713580951",
			popupType: "instagram_user",
			popupIdUnique: "7582908",
			popupStyle: "creator",
		},
		{
			id: 41019512,
			primaryText: "Anthony Jolon",
			isVerified: true,
			secondaryText: "@anthony_jolon",
			valueText: "38.9K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/041/019/512/original/data?1719313955",
			popupType: "instagram_user",
			popupIdUnique: "17152536",
			popupStyle: "creator",
		},
		{
			id: 24022735,
			primaryText: "Rafa Jaime",
			isVerified: false,
			secondaryText: "@rafajaimemx",
			valueText: "61.4K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/024/022/735/original/data?1716876553",
			popupType: "instagram_user",
			popupIdUnique: "259094031",
			popupStyle: "creator",
		},
		{
			id: 7002859,
			primaryText: "Robin Stone",
			isVerified: false,
			secondaryText: "@robin_stone_drums",
			valueText: "13.3K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/007/002/859/original/data?1721103554",
			popupType: "instagram_user",
			popupIdUnique: "5479328507",
			popupStyle: "creator",
		},
		{
			id: 1002669,
			primaryText: "Lloyd Peckham",
			isVerified: false,
			secondaryText: "@bearded_excavation_uk",
			valueText: "113K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/001/002/669/original/data?1722956294",
			popupType: "instagram_user",
			popupIdUnique: "10912882238",
			popupStyle: "creator",
		},
		{
			id: 37022064,
			primaryText: "𝖒𝖆𝖗𝖎𝖆𝖍",
			isVerified: false,
			secondaryText: "@mariahkrx",
			valueText: "35.7K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/037/022/064/original/data?1729159593",
			popupType: "instagram_user",
			popupIdUnique: "62341082538",
			popupStyle: "creator",
		},
		{
			id: 8002413,
			primaryText: "Bruna Kertes",
			isVerified: false,
			secondaryText: "@kertes_",
			valueText: "35.5K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/008/002/413/original/data?1713361021",
			popupType: "instagram_user",
			popupIdUnique: "40398073",
			popupStyle: "creator",
		},
		{
			id: 18025016,
			primaryText: "Logotips",
			isVerified: false,
			secondaryText: "@logotips__",
			valueText: "84K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/018/025/016/original/data?1727734049",
			popupType: "instagram_user",
			popupIdUnique: "8104640283",
			popupStyle: "creator",
		},
		{
			id: 6402383,
			primaryText: "Brittany Elliott (BZ)",
			isVerified: false,
			secondaryText: "@bzelliott",
			valueText: "45K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/006/402/383/original/data?1724835096",
			popupType: "instagram_user",
			popupIdUnique: "21068941",
			popupStyle: "creator",
		},
		{
			id: 24034399,
			primaryText: "Diandra Lazor",
			isVerified: false,
			secondaryText: "@sassysledgehammer",
			valueText: "45.9K Followers",
			imageUrl:
				"https://cdn.songstats.com/instagram_users/images/024/034/399/original/data?1728202389",
			popupType: "instagram_user",
			popupIdUnique: "272533781",
			popupStyle: "creator",
		},
	],
	filters: {
		source: "instagram",
		neverCollaborated: false,
		followers: "10000",
		contactInfoType: "any",
		countryCode: "any",
	},
};
const countries = [
	{
		text: "Any Country",
	},
	{
		icon: "https://songstats.com/files/flags/ar.png",
		text: "Argentina",
		code: "ar",
	},
	{
		icon: "https://songstats.com/files/flags/au.png",
		text: "Australia",
		code: "au",
	},
	{
		icon: "https://songstats.com/files/flags/br.png",
		text: "Brazil",
		code: "br",
	},
	{
		icon: "https://songstats.com/files/flags/ca.png",
		text: "Canada",
		code: "ca",
	},
	{
		icon: "https://songstats.com/files/flags/co.png",
		text: "Colombia",
		code: "co",
	},
	{
		icon: "https://songstats.com/files/flags/ec.png",
		text: "Ecuador",
		code: "ec",
	},
	{
		icon: "https://songstats.com/files/flags/fr.png",
		text: "France",
		code: "fr",
	},
	{
		icon: "https://songstats.com/files/flags/de.png",
		text: "Germany",
		code: "de",
	},
	{
		icon: "https://songstats.com/files/flags/id.png",
		text: "Indonesia",
		code: "id",
	},
	{
		icon: "https://songstats.com/files/flags/it.png",
		text: "Italy",
		code: "it",
	},
	{
		icon: "https://songstats.com/files/flags/jp.png",
		text: "Japan",
		code: "jp",
	},
	{
		icon: "https://songstats.com/files/flags/my.png",
		text: "Malaysia",
		code: "my",
	},
	{
		icon: "https://songstats.com/files/flags/mx.png",
		text: "Mexico",
		code: "mx",
	},
	{
		icon: "https://songstats.com/files/flags/nl.png",
		text: "Netherlands",
		code: "nl",
	},
	{
		icon: "https://songstats.com/files/flags/pe.png",
		text: "Peru",
		code: "pe",
	},
	{
		icon: "https://songstats.com/files/flags/ph.png",
		text: "Philippines",
		code: "ph",
	},
	{
		icon: "https://songstats.com/files/flags/ru.png",
		text: "Russia",
		code: "ru",
	},
	{
		icon: "https://songstats.com/files/flags/za.png",
		text: "South Africa",
		code: "za",
	},
	{
		icon: "https://songstats.com/files/flags/es.png",
		text: "Spain",
		code: "es",
	},
	{
		icon: "https://songstats.com/files/flags/th.png",
		text: "Thailand",
		code: "th",
	},
	{
		icon: "https://songstats.com/files/flags/tr.png",
		text: "Türkiye",
		code: "tr",
	},
	{
		icon: "https://songstats.com/files/flags/ua.png",
		text: "Ukraine",
		code: "ua",
	},
	{
		icon: "https://songstats.com/files/flags/gb.png",
		text: "United Kingdom",
		code: "gb",
	},
	{
		icon: "https://songstats.com/files/flags/us.png",
		text: "United States",
		code: "us",
	},
	{
		icon: "https://songstats.com/files/flags/ve.png",
		text: "Venezuela",
		code: "ve",
	},
	{
		icon: "https://songstats.com/files/flags/vn.png",
		text: "Vietnam",
		code: "vn",
	},
];
const contactsOptions = [
	{
		name: "Любой",
		id: "any",
	},
	{
		name: "SubmitHub",
		id: "submithub",
	},
	{
		name: "Collabstr",
		id: "collabstr",
	},
	{
		name: "Breakr",
		id: "breakr",
	},
	{
		name: "SpaceLoud",
		id: "spaceloud",
	},
	{
		name: "Facebook",
		id: "facebook",
	},
	{
		name: "x",
		id: "x",
	},
	{
		name: "TikTok",
		id: "tiktok",
	},
	{
		name: "YouTube",
		id: "youtube",
	},
	{
		name: "Email",
		id: "email",
	},
];
const followersQtyFilter = [
	{ name: "500 - 1000" },
	{ name: "1тыс - 10тыс" },
	{ name: "10тыс+" },
];
const RecommendedAccounts = memo(() => {
	const sourceArray = navbar[0].content[0].options.filter(
		(source) =>
			source.slug === "instagram" ||
			source.slug === "tiktok" ||
			source.slug === "soundcloud" ||
			source.slug === "youtube",
	);
	const [selectedSource, setSelectedSource] = useState(sourceArray[0]);
	const [selectedFollowersQtyFilter, setSelectedFollowersQtyFilter] = useState(
		followersQtyFilter[0],
	);
	const [selectedContactOption, setSelectedContactOption] = useState(
		contactsOptions[0],
	);
	const [selectedCountry, setSelectedCountry] = useState(countries[0]);
	const [openModal, setOpenModal] = useState(false);
	return (
		<div className="w-full flex flex-col gap-1">
			<AccountsModal openModal={openModal} setOpenModal={setOpenModal} />
			<ShowOnMobileToTablet>
				<div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-center w-full pt-6">
					<h1 className="text-t1Semi_ipad">Рекоммендованные Аккаунты</h1>
					<div className="flex gap-3">
						<div className="py-3 px-6 border border-medium_grey rounded-xl w-fit">
							<ShareIconTools className="fill-light_grey" />
						</div>
						<div className="py-3 px-6 border border-medium_grey rounded-xl w-fit">
							<ReloadIcon className="fill-light_grey" />
						</div>
					</div>
				</div>
			</ShowOnMobileToTablet>
			<div className="py-4 mt-1.5">
				<p className="text-caption_r_desk text-medium_grey">
					В этом разделе ты можешь найти аккаунты, сотрудничающие с похожими
					исполнителями.{" "}
				</p>
			</div>
			<div className="pt-1 flex gap-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:flex gap-4 lg:gap-6 w-fit lg:justify-start lg:flex-wrap lg:items-end">
					<div className="w-fit">
						<Listbox value={selectedSource} onChange={setSelectedSource}>
							<Listbox.Label className="text-caption_m_desk text-medium_grey ">
								Платформа
							</Listbox.Label>
							<Listbox.Button className=" w-[330px] relative mt-1.5">
								{({ open }) => (
									<div
										className={`flex justify-between items-center w-full text-t2Regular py-2.5 px-3.5  ${open ? " border-b border-solid border-secondary_dark_gray bg-popup_gray rounded-t-xl " : "border border-solid border-secondary_dark_gray rounded-xl "}`}
									>
										<div className="flex gap-2 items-center">
											<img
												src={selectedSource.logo}
												alt=""
												className="max-w-5"
											/>
											<p className="text-t2Regular">{selectedSource.name}</p>
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
								<Listbox.Options className="bg-popup_gray z-10 rounded-b-xl  max-w-[330px] absolute w-full">
									{sourceArray.map((source, index) =>
										source.slug !== selectedSource.slug ? (
											<Listbox.Option
												key={index}
												value={source}
												className={`py-2.5 px-5 cursor-pointer ${index === sourceArray.length - 1 ? "" : "border-b border-secondary_dark_gray"}`}
											>
												{({ active, selected }) => (
													<div
														className={`flex gap-2 items-center ${
															active ? "" : ""
														}`}
													>
														<img src={source.logo} alt="" className="max-w-5" />
														<p className="text-t2Regular">{source.name}</p>
													</div>
												)}
											</Listbox.Option>
										) : null,
									)}
								</Listbox.Options>
							</Transition>
						</Listbox>
					</div>
					<div className="w-fit">
						{data.filters.contactInfoType !== null && (
							<Listbox
								value={selectedContactOption}
								onChange={setSelectedContactOption}
							>
								<Listbox.Label className="text-caption_m_desk text-medium_grey ">
									Контакты
								</Listbox.Label>
								<Listbox.Button className="  w-[330px] relative mt-1.5">
									{({ open }) => (
										<div
											className={`flex justify-between items-center w-full text-t2Regular py-2.5 px-3.5  ${open ? " border-b border-solid border-secondary_dark_gray  bg-popup_gray rounded-t-xl " : "border border-solid border-secondary_dark_gray rounded-xl "}`}
										>
											<p className="text-t2Regular">
												{selectedContactOption.name}
											</p>
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
									<Listbox.Options className="bg-popup_gray  rounded-b-xl  max-w-[330px] absolute w-full">
										{contactsOptions.map((filter, index) =>
											filter.name !== selectedContactOption.name ? (
												<Listbox.Option
													key={index}
													value={filter}
													className={`py-2.5 px-5 cursor-pointer ${index === contactsOptions.length - 1 ? "" : "border-b border-secondary_dark_gray"}`}
												>
													{({ active }) => (
														<p className="text-t2Regular">{filter.name}</p>
													)}
												</Listbox.Option>
											) : null,
										)}
									</Listbox.Options>
								</Transition>
							</Listbox>
						)}
					</div>
					<div className="w-fit">
						{data.filters.followers !== null && (
							<Listbox
								value={selectedFollowersQtyFilter}
								onChange={setSelectedFollowersQtyFilter}
							>
								<Listbox.Label className="text-caption_m_desk text-medium_grey ">
									Количество подписчиков
								</Listbox.Label>
								<Listbox.Button className="  w-[330px] relative mt-1.5">
									{({ open }) => (
										<div
											className={`flex justify-between items-center w-full text-t2Regular py-2.5 px-3.5  ${open ? " border-b border-solid border-secondary_dark_gray  bg-popup_gray rounded-t-xl " : "border border-solid border-secondary_dark_gray rounded-xl "}`}
										>
											<p className="text-t2Regular">
												{selectedFollowersQtyFilter.name}
											</p>
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
									<Listbox.Options className="bg-popup_gray  rounded-b-xl absolute w-full  max-w-[330px] ">
										{followersQtyFilter.map((item, index) =>
											item.name !== selectedFollowersQtyFilter.name ? (
												<Listbox.Option
													key={index}
													value={item}
													className={`py-2.5 px-5 cursor-pointer ${index === followersQtyFilter.length - 1 ? "" : "border-b border-secondary_dark_gray"}`}
												>
													{({ active }) => (
														<p className="text-t2Regular">{item.name}</p>
													)}
												</Listbox.Option>
											) : null,
										)}
									</Listbox.Options>
								</Transition>
							</Listbox>
						)}
					</div>
					<div className="w-fit">
						{data.filters.countryCode !== null && (
							<Listbox value={selectedCountry} onChange={setSelectedCountry}>
								<Listbox.Label className="text-caption_m_desk text-medium_grey ">
									Страна
								</Listbox.Label>
								<Listbox.Button className="  w-[330px] relative mt-1.5">
									{({ open }) => (
										<div
											className={`flex justify-between items-center w-full text-t2Regular py-2.5 px-3.5  ${open ? " border-b border-solid border-secondary_dark_gray  bg-popup_gray rounded-t-xl " : "border border-solid border-secondary_dark_gray rounded-xl "}`}
										>
											<div className="flex items-center gap-2">
												{selectedCountry.icon && (
													<img
														src={selectedCountry.icon}
														alt=""
														className="max-w-5"
													/>
												)}
												<p className="text-t2Regular">{selectedCountry.text}</p>
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
									<Listbox.Options className="bg-popup_gray  rounded-b-xl absolute w-full  max-w-[330px] max-h-[18rem] overflow-y-scroll">
										{countries.map((item, index) =>
											item.text !== selectedCountry.text ? (
												<Listbox.Option
													key={index}
													value={item}
													className={`py-2.5 px-5 cursor-pointer ${index === countries.length - 1 ? "" : "border-b border-secondary_dark_gray"}`}
												>
													{({ active }) => (
														<div className="flex gap-2 items-center">
															<img src={item.icon} alt="" className="w-5" />
															<p className="text-t2Regular">{item.text}</p>
														</div>
													)}
												</Listbox.Option>
											) : null,
										)}
									</Listbox.Options>
								</Transition>
							</Listbox>
						)}
					</div>
					<InfoIcon className="fill-light_grey mb-3.5 hidden lg:block" />
				</div>
				<InfoIcon className="fill-light_grey mb-3.5  lg:hidden" />
			</div>
			<div className="pt-4 pb-1 w-full flex flex-col md:flex-row gap-4 md:gap-10">
				<div className="flex items-center gap-2">
					<input
						// onClick={() => onUpdateSubscription(item)}
						type="checkbox"
						className="bg-transparent border border-solid border-secondary_dark_gray rounded-sm"
						// defaultChecked={item.renew}
					/>
					<p className="text-t2Regular">Только новые</p>
				</div>
			</div>
			<div className="py-6">
				<ul className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
					{data.recommendations.map((item, index) => (
						<li
							className="w-full bg-[#27272780] rounded-xl p-4 flex justify-between gap-6 flex-col md:flex-row"
							key={index}
							onClick={() => setOpenModal(true)}
						>
							<div className="flex gap-4 items-center">
								<img
									src={item.imageUrl}
									className="w-[3.75rem] h-[3.75rem]  rounded-full"
								/>
								<div className="max-w-[15rem]">
									<h1 className="text-t2Regular truncate">
										{item.primaryText}
									</h1>
									<p className="text-caption_r_desk mt-1 text-light_grey">
										{item.secondaryText}
									</p>
								</div>
							</div>
							<div>
								<p className="text-caption_r_desk text-medium_grey whitespace-nowrap">
									{item.valueText}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
});
export default RecommendedAccounts;

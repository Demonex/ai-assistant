import { SpotifyLogoText } from "../../assets/SpotifyLogoText.js";
import React from "react";
import { AmazonLogoChart } from "../../assets/AmazonLogoChart.js";
import { AppleLogoChart } from "../../assets/AppleLogoChart.js";
import { BeatportLogoChart } from "../../assets/BeatportLogoChart.js";
import { DeezerLogoChart } from "../../assets/DeezerLogoChart.js";
import { InstaLogoChart } from "../../assets/InstaLogoChart.js";
import { ItunesLogoChart } from "../../assets/ItunesLogoChart.js";
import { ShazamLogoChart } from "../../assets/ShazamLogoChart.js";
import { SoundcloudLogoChart } from "../../assets/SoundcloudLogoChart.js";
import { TidalLogoChart } from "../../assets/TidalLogoChart.js";
import { TikTokLogoChart } from "../../assets/TikTokLogoChart.js";
import { TracklistsLogoChart } from "../../assets/TracklistsLogoChart.js";
import { TraxsourceLogoChart } from "../../assets/TraxsourceLogoChart.js";
import { YoutubeLogoChart } from "../../assets/YoutubeLogoChart.js";
import instagram from "/assets/svg/instagramLogo.svg";
import youtube from "/assets/svg/youtubeLogo.svg";
import applemusic from "/assets/svg/appleLogo.svg";
import spotify from "/assets/svg/spotifyLogo.svg";
import tiktok from "/assets/svg/tiktokLogo.svg";
import amazon from "/assets/svg/amazonLogo.svg";
import shazam from "/assets/svg/shasamLogo.svg";
import deezer from "/assets/svg/deezerLogo.svg";
import beatport from "/assets/svg/beatportLogo.svg";
import tidal from "/assets/svg/tidalLogo.svg";
import tracklist from "/assets/svg/tracklistLogo.svg";
import soundcloud from "/assets/svg/soundcloudLogo.svg";
import allIcon from "/assets/svg/all_icon.svg";
import allIconColored from "/assets/svg/all_icon_white.svg";

import AppleLogoColored from "/assets/svg/apple_logo.svg";
import tracklistColored from "/assets/svg/1001track_logo.svg";
import amazoneColored from "/assets/svg/amazon_logo.svg";
import beatportColored from "/assets/svg/beetport_logo.svg";
import deezerColored from "/assets/svg/deezer_logo.svg";
import instagramColored from "/assets/svg/instagram_logo.png";
import itunesColored from "/assets/svg/itunce_logo.svg";
import shasamColored from "/assets/svg/shazam_logo.svg";
import soundcloudColored from "/assets/svg/souncloud_logo.svg";
import spotifyColored from "/assets/svg/spotify_logo.svg";
import tidalColored from "/assets/svg/tidal_logo.svg";
import tiktokColored from "/assets/svg/tiktok_logo.svg";
import youtubeColored from "/assets/svg/youtube_logo.svg";
import traxsourseColored from "/assets/svg/traxsourse_logo.svg";

export const allSources = [
	{
		name: "Все",
		slug: "overview",
		logo: "",
		secondaryLogo: allIcon,
	},
	{
		name: "Apple Music",
		slug: "apple_music",
	},
	{
		name: "Facebook",
		slug: "facebook",
	},
	{
		name: "1001Tracklists",
		slug: "tracklist",
	},
	{
		name: "Amazon",
		slug: "amazon",
	},
	{
		name: "Spotify",
		slug: "spotify",
	},
	{
		name: "Deezer",
		slug: "deezer",
	},
	{
		name: "Instagram",
		slug: "instagram",
	},
	{
		name: "TikTok",
		slug: "tiktok",
	},
	{
		name: "YouTube",
		slug: "youtube",
	},
	{
		name: "Shazam",
		slug: "shazam",
	},
	{
		name: "Beatport",
		slug: "beatport",
	},

	{
		name: "iTunes",
		slug: "itunes",
	},
	{
		name: "Tidal",
		slug: "tidal",
	},
	{
		name: "Soundcloud",
		slug: "soundcloud",
	},
	{
		name: "1001Tracklists",
		slug: "tracklist",
	},
];

export const overviewSources = [
	{
		name: "Все",
		slug: "overview",
		logo: "",
		secondaryLogo: allIconColored,
		activeLogo: allIcon,
	},
	{
		name: "Spotify",
		slug: "spotify",
		logo: <SpotifyLogoText />,
		secondaryLogo: spotify,
		activeLogo: spotifyColored,
	},
	{
		name: "Apple Music",
		slug: "apple_music",
		logo: <AppleLogoChart />,
		secondaryLogo: applemusic,
		activeLogo: AppleLogoColored,
	},
	{
		name: "Amazon",
		slug: "amazon",
		logo: <AmazonLogoChart />,
		secondaryLogo: amazon,
		activeLogo: amazoneColored,
	},
	{
		name: "Deezer",
		slug: "deezer",
		logo: <DeezerLogoChart />,
		secondaryLogo: deezer,
		activeLogo: deezerColored,
	},
	{
		name: "Instagram",
		slug: "instagram",
		logo: <InstaLogoChart />,
		secondaryLogo: instagram,
		activeLogo: instagramColored,
	},
	{
		name: "TikTok",
		slug: "tiktok",
		logo: <TikTokLogoChart />,
		secondaryLogo: tiktok,
		activeLogo: tiktokColored,
	},
	{
		name: "YouTube",
		slug: "youtube",
		logo: <YoutubeLogoChart />,
		secondaryLogo: youtube,
		activeLogo: youtubeColored,
	},
	{
		name: "Shazam",
		slug: "shazam",
		logo: <ShazamLogoChart />,
		secondaryLogo: shazam,
		activeLogo: shasamColored,
	},
	{
		name: "1001Tracklists",
		slug: "tracklist",
		logo: <TracklistsLogoChart />,
		secondaryLogo: tracklist,
		activeLogo: traxsourseColored,
	},
	{
		name: "Beatport",
		slug: "beatport",
		logo: <BeatportLogoChart />,
		secondaryLogo: beatport,
		activeLogo: beatportColored,
	},
	/*{
    name: 'Traxsource',
    slug: 'traxsource',
    logo: <TraxsourceLogoChart/>
  },*/
	{
		name: "iTunes",
		slug: "itunes",
		logo: <ItunesLogoChart />,
		secondaryLogo: applemusic,
		activeLogo: itunesColored,
	},
	{
		name: "Tidal",
		slug: "tidal",
		logo: <TidalLogoChart />,
		secondaryLogo: tidal,
		activeLogo: tidalColored,
	},
	{
		name: "Soundcloud",
		slug: "soundcloud",
		logo: <SoundcloudLogoChart />,
		secondaryLogo: soundcloud,
		activeLogo: soundcloudColored,
	},
];

export const favoriteSources = [...allSources];

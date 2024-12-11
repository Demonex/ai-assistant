import Header from "../../components/HeaderMain/index.js";
import { useParams } from "wouter";
import HeroSpotify from "./components/HeroSpotify.js";
import HeroApple from "./components/HeroApple.js";
import HeroShazam from "./components/HeroShazam.js";
import HeroSoundcloud from "./components/HeroSoundcloud.js";
import HeroBeatport from "./components/HeroBeatport.js";
import VioletCTA from "../WelcomePage/components/VioletCTA.js";
import Potential from "./components/Potential.js";
import Auditoria from "../WelcomePage/components/Auditoria.js";
import Know from "../WelcomePage/components/Know.js";
import Geography from "../WelcomePage/components/Geography.js";
import Tariffes from "../WelcomePage/components/Tariffes.js";
import LilacCTA from "../WelcomePage/components/LilacCTA.js";
import FAQ from "../WelcomePage/components/FAQ.js";
import Telegram from "../WelcomePage/components/Telegram.js";
import Bottom from "../WelcomePage/components/Bottom.js";
import BottomBeforeFooter from "../WelcomePage/components/BottomBeforeFooter.js";
import Footer from "../../components/FooterMain/index.js";
import HeroDeezer from "./components/HeroDeezer.js";
import HeroAmazon from "./components/HeroAmazon.js";
import HeroYoutube from "./components/HeroYoutube.js";
import HeroTracklists from "./components/HeroTracklists.js";
import HeroTraxsource from "./components/HeroTraxsource.js";
import HeroItunes from "./components/HeroItunes.js";
import HeroTidal from "./components/HeroTidal.js";
import HeroInstagram from "./components/HeroInstagram.js";
import HeroTikTok from "./components/HeroTikTok.js";

export const PlatformPage = () => {
	const params = useParams();
	const platformName = params["platform-name"];
	const heroSection = () => {
		switch (platformName) {
			case "spotify":
				return <HeroSpotify />;
			case "soundcloud":
				return <HeroSoundcloud />;
			case "applemusic":
				return <HeroApple />;
			case "shazam":
				return <HeroShazam />;
			case "beatport":
				return <HeroBeatport />;
			case "deezer":
				return <HeroDeezer />;
			case "amazon":
				return <HeroAmazon />;
			case "youtube":
				return <HeroYoutube />;
			case "1001tracklists":
				return <HeroTracklists />;
			case "traxsource":
				return <HeroTraxsource />;
			case "itunes":
				return <HeroItunes />;
			case "tidal":
				return <HeroTidal />;
			case "instagram":
				return <HeroInstagram />;
			case "tiktok":
				return <HeroTikTok />;
		}
	};
	const tildaColor = () => {
		switch (platformName) {
			case "spotify":
				return "#1ED760";
			case "soundcloud":
				return "#F16D23";
			case "applemusic":
				return "#125BFF";
			case "shazam":
				return "#00B7FF";
			case "beatport":
				return "#01FF95";
			case "deezer":
				return "#A238FF";
			case "amazon":
				return "#25D1DA";
			case "youtube":
				return "#FF0000";
			case "1001tracklists":
				return "#51AADF";
			case "itunes":
				return "#125BFF";
			case "tidal":
				return "#125BFF";
			case "tiktok":
				return "#FF004F";
		}
	};
	return (
		<div className="w-full flex flex-col h-[100vh] items-center ">
			<Header />
			<div className="flex flex-col items-center px-auto max-w-[1920px] w-full bg-[#0C0C0C] z-10">
				{heroSection()}
				<VioletCTA />
				<Potential />
				<Auditoria />
				<Know />
				<Geography />
				<Tariffes />
				<LilacCTA />
				<FAQ />
				<Telegram />
				<Bottom />
			</div>
			<BottomBeforeFooter
				tildaColor={tildaColor()}
				fillPath={platformName === "instagram" ? "url(#gradient)" : ""}
				children={
					platformName === "instagram" ? (
						<>
							<linearGradient
								x2="1"
								y2="1"
								id="gradient"
								gradientTransform="rotate(45)"
							>
								<stop offset="0%" stop-color="#BC3081" />
								<stop offset="50%" stop-color="#F47133" />
							</linearGradient>
						</>
					) : (
						<></>
					)
				}
			/>
			<Footer />
		</div>
	);
};

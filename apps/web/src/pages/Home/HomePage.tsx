import { Header } from "../../components/Header/Header.js";
import { HeroSection } from "./components/HeroSection.js";
import { SubHero } from "./components/SubHero.js";
import { InsightsSection } from "./components/InsightsSection.js";
import { ConnectFans } from "./components/CoonectFans.js";
import { MeasureSuccess } from "./components/MeasureSuccess.js";
import { Footer } from "../../components/Footer/Footer.js";
import { memo } from "react";

export const HomePage = memo(() => {
	return (
		<div className="general_parent w-full h-full flex flex-col items-center">
			<div>
				<svg
					className="absolute blur-3xl opacity-80 right-96 -mt-20"
					width="70%"
					height="70%"
					viewBox="0 0 400 400"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clipPath="url(#clip0_17_60)">
						<g filter="url(#filter0_f_17_60)">
							<path
								d="M128.6 0H0V322.2L332.5 211.5L128.6 0Z"
								fill="#4D07E3"
							></path>
							<path
								d="M0 322.2V400H240H320L332.5 211.5L0 322.2Z"
								fill="#4C00FF"
							></path>
							<path
								d="M320 400H400V78.75L332.5 211.5L320 400Z"
								fill="#B5BFF1"
							></path>
							<path
								d="M400 0H128.6L332.5 211.5L400 78.75V0Z"
								fill="#7fcef3"
							></path>
						</g>
					</g>
					<defs>
						<filter
							id="filter0_f_17_60"
							x="-159.933"
							y="-159.933"
							width="719.867"
							height="719.867"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
							<feBlend
								mode="normal"
								in="SourceGraphic"
								in2="BackgroundImageFix"
								result="shape"
							></feBlend>
							<feGaussianBlur
								stdDeviation="79.9667"
								result="effect1_foregroundBlur_17_60"
							></feGaussianBlur>
						</filter>
					</defs>
				</svg>
			</div>
			<Header />
			<HeroSection />
			<SubHero />
			<InsightsSection />
			<ConnectFans />
			<MeasureSuccess />
			<Footer />
		</div>
	);
});

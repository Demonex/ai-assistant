import imgPng from "/assets/imgs/docs-dark@30.1a9f8cbf.png";
import { HeaderAccount } from "../../components/HeaderAccount/HeaderAccount.js";
import { Sidebar } from "../ArtistPage/components/Sidebar/Sidebar.js";
import TrackPageContent from "./components/TrackPageContent.js";
import { memo } from "react";
import Header from "../../components/HeaderMain/index.js";

export const TrackPage = memo(() => {
	return (
		<div className="h-full relative overflow-x-hidden flex flex-col items-center">
			<Header />
			<div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
				<Sidebar />
			</div>
			<TrackPageContent />
		</div>
	);
});

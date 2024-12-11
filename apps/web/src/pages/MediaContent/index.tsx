import Header from "../../components/HeaderMain/index.js";
import BottomBeforeFooter from "../WelcomePage/components/BottomBeforeFooter.js";
import Footer from "../../components/FooterMain/index.js";
import React, { memo, useEffect } from "react";
import { useSizes } from "../../hooks/useSizes.js";
import PathToArticle from "./components/PathToArticle.js";
import Article from "./components/Article.js";
import ReadMore from "./components/ReadMore.js";
import Telegram from "../WelcomePage/components/Telegram.js";
import Tariffes from "../WelcomePage/components/Tariffes.js";
import Bottom from "../WelcomePage/components/Bottom.js";

export const MediaContent = memo(() => {
	const { isMobile } = useSizes();

	return (
		<div className="w-full flex flex-col h-[100vh] items-center ">
			<Header />
			<div
				className="w-full flex flex-col items-center max-w-[880px] m-auto px-4 md:px-8"
				style={{
					marginTop: isMobile ? "68px" : "103px",
				}}
			>
				<PathToArticle />
				<Article />
			</div>
			<ReadMore />
			<div className="mainParent flex flex-col items-center px-auto max-w-[1920px] w-full bg-[#0C0C0C] z-10">
				<Telegram />
				<Tariffes />
				<Bottom />
			</div>
			<BottomBeforeFooter tildaColor="#125BFF" />
			<Footer />
		</div>
	);
});

import Header from "../../components/HeaderMain/index.js";
import Footer from "../../components/FooterMain/index.js";
import { memo } from "react";

export const HomePage = memo(() => {
	return (
		<div className="general_parent w-full h-full flex flex-col items-center">
			<Header />
			<div className="flex-1"></div>
			<Footer />
		</div>
	);
});

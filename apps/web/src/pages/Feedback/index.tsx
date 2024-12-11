import { memo, useState } from "react";
import Header from "../../components/HeaderMain/index.js";
import Footer from "../../components/FooterMain/index.js";
import { useSizes } from "../../hooks/useSizes.js";
import RRR from "/assets/svg/RRRRR.svg";
import { useElementRangeSize } from "../../hooks/useElementRangeSize.js";
import Form from "../Feedback/components/Form.js";
import SentMessage from "./components/SentMessage.js";
import { useIsSentMessage } from "./hooks/useIsSentMessage.js";

export const FeedbackPage = memo(() => {
	const { isMobile } = useSizes();
	const { elementRange: elementRangeLaptop } = useSizes(1024, 1920);
	const paddingBottom = elementRangeLaptop(60, 250);
	const rightPosition = elementRangeLaptop(0, 20);
	const { paddingHorizontal } = useElementRangeSize();
	const { isSentMessage } = useIsSentMessage();

	return (
		<div className="w-full flex flex-col h-[100vh] items-center ">
			<Header />
			<div
				className={`${isMobile ? "mt-[68px]" : "mt-[103px]"} w-full flex justify-center md:justify-between border-b border-b-[#33333380]/50`}
			>
				<div
					style={{
						paddingLeft: `${paddingHorizontal}px`,
						paddingRight: `${paddingHorizontal}px`,
						paddingBottom: isMobile ? "40px" : `${paddingBottom}px`,
						width: `${paddingHorizontal * 2 + 560}px`,
					}}
					className=" mt-10 z-20"
				>
					{isSentMessage ? <SentMessage /> : <Form />}
				</div>
				<div className="w-full h-full relative hidden md:block">
					<img
						src={RRR}
						className="absolute "
						style={{
							right: `-${rightPosition}%`,
						}}
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
});

import { memo } from "react";
import emailMessage from "/assets/svg/email-messagesvg.svg";
import PrimaryButton from "../../../components/PrimaryButton.js";
import { useSizes } from "../../../hooks/useSizes.js";

const SentMessage = memo(() => {
	const { elementRange } = useSizes(1024, 1920);
	const { isMobile, isTablet } = useSizes();
	const marginBottom = elementRange(60, 278);
	return (
		<div className="flex flex-col gap-10">
			<div>
				<img src={emailMessage} />
			</div>
			<div
				className="flex flex-col gap-6"
				style={{
					marginBottom: isMobile
						? "40px"
						: isTablet
							? "60px"
							: `${marginBottom}px`,
				}}
			>
				<p className="font-medium text-[1.5rem] lg:text-[2rem]">
					Твое сообщение уже в пути!
				</p>
				<PrimaryButton
					titleClassName="text-btnText"
					isIcon={false}
					title="На главную"
					className="py-2.5 md:py-4 px-20 w-full  md:w-[270px] bg-primary_blue  rounded-xl hover:scale-105 transition duration-300"
					to="/"
				/>
			</div>
		</div>
	);
});
export default SentMessage;

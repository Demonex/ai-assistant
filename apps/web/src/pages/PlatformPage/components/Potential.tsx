import marker from "/assets/png/blueMarker.png";
import picture from "/assets/png/imgPotential.png";
import { memo } from "react";
import { useElementRangeSize } from "../../../hooks/useElementRangeSize.js";
import { useSizes } from "../../../hooks/useSizes.js";

const Potential = memo(() => {
	const { h1Size, h1SizeMobile, marginVertical, paddingHorizontal } =
		useElementRangeSize();
	const { elementRange, isTablet, isMobile } = useSizes();
	const pictureSize = elementRange(330, 920);

	return (
		<>
			<div
				style={{
					marginTop: `${marginVertical}px`,
					marginBottom: `${marginVertical}px`,
					paddingLeft: `${paddingHorizontal}px`,
					paddingRight: `${paddingHorizontal}px`,
				}}
				className="flex flex-col gap-[50px] lg:flex-row lg:gap-[35px] w-full items-start lg:items-center"
			>
				<div className="leftSide" style={{}}>
					<h1
						className="text-h2Desctop font-bold lg:font-black"
						style={{
							fontSize:
								isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
						}}
					>
						Убедись в потенциале
						<br /> твоей музыки и узнай о&nbsp;
						<span className="w-full relative">
							признании&nbsp;
							<img
								src={marker}
								className="absolute right-0 -bottom-2 md:-bottom-4"
							/>
						</span>
						&nbsp;слушателями
					</h1>
				</div>
				<div className="w-full">
					<img
						src={picture}
						style={{
							width: isTablet || isMobile ? "100%" : `${pictureSize}px`,
						}}
					/>
				</div>
			</div>
		</>
	);
});
export default Potential;

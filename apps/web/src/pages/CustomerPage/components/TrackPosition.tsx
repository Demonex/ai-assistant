import img from "/assets/png/track_position_img.png";
import marker from "/assets/png/redMarker.png";
import React, { memo } from "react";
import { useElementRangeSize } from "../../../hooks/useElementRangeSize.js";
import { useSizes } from "../../../hooks/useSizes.js";
import { useParams } from "wouter";

const TrackPosition = memo(() => {
	const { paddingHorizontal, marginVertical, h1Size, h1SizeMobile } =
		useElementRangeSize();
	const params = useParams();
	const customerName = params["customer-name"];
	const { isMobile, isTablet } = useSizes();
	return (
		<div
			style={{
				paddingLeft: `${paddingHorizontal}px`,
				paddingRight: `${paddingHorizontal}px`,
				marginTop: `${marginVertical}px`,
				marginBottom: `${marginVertical}px`,
			}}
			className="w-full flex flex-col-reverse lg:flex-row lg:items-center gap-10 md:gap-[3.125rem] lg:gap-[9.75rem]"
		>
			<div className="w-full">
				<img src={img} />
			</div>
			<div
				style={{
					paddingRight: isMobile || isTablet ? `${paddingHorizontal}px` : "",
				}}
				className="w-full flex flex-col gap-5 md:gap-8 max-w-[760px]"
			>
				{customerName === "fans" ? (
					<h2
						style={{
							fontSize: isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
						}}
						className="text-h2Mobile md:text-h2Medium lg:text-h2Desctop"
					>
						Следи за&nbsp;позицией релизов &nbsp;в&nbsp;
						<span className="relative ">
							чартах&nbsp;
							<img src={marker} className="absolute right-0 " />
						</span>
						и&nbsp;плейлистах
					</h2>
				) : (
					<h2
						style={{
							fontSize: isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
						}}
						className="text-h2Mobile md:text-h2Medium lg:text-h2Desctop"
					>
						Следи за&nbsp;позицией {isMobile || isTablet ? null : <br />}своих
						артистов в&nbsp;
						<span className="relative whitespace-nowrap">
							<img src={marker} className="absolute right-0 " />
							чартах
						</span>
					</h2>
				)}
			</div>
		</div>
	);
});
export default TrackPosition;

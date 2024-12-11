import { useSizes } from "../../../hooks/useSizes.js";
import marker from "/assets/png/yellowMarker.png";
import picture from "/assets/png/auditoriaNew.png";
import { useElementRangeSize } from "../../../hooks/useElementRangeSize.js";
import { memo } from "react";

const Auditoria = memo(() => {
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
				className="flex flex-col gap-[50px] lg:flex-row-reverse lg:gap-[35px] w-full items-start "
			>
				<div className="leftSide" style={{}}>
					<h1
						className="text-h2Desctop font-bold lg:font-black"
						style={{
							fontSize:
								isTablet || isMobile ? `${h1SizeMobile}px` : `${h1Size}px`,
						}}
					>
						Разбирайся{isMobile || isTablet ? null : <br />} &nbsp;в своей
						<span className="relative w-fit">
							&nbsp; аудитории
							<img
								src={marker}
								className="absolute w-[80%] -bottom-[30%] right-0"
							/>
						</span>
						<br />
						перед каждым релизом
						<br /> и готовься к гастролям,
						<br /> как бог сцены
					</h1>
				</div>
				<div className="rightSide">
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
export default Auditoria;

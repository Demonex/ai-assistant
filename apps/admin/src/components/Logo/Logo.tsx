import React, { memo } from "react";

import "./index.scss";

const Logo = memo(({ width, height }: { width: number; height: number }) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 84 23"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				className="logo-path-fill"
				d="M50.8421 4.55325L46.8133 0.483887L39.7895 7.56844L32.6983 0.483887L28.7368 4.55325L35.755 11.5698L28.7368 18.592L32.6983 22.6557L39.7895 15.5711L46.8133 22.6557L50.8421 18.592L43.8239 11.5698L50.8421 4.55325ZM20.0445 17.9056C23.5054 12.8967 22.2627 6.02212 17.2688 2.55081C12.275 -0.920494 5.42106 0.325967 1.96017 5.33486C-1.50072 10.3438 -0.257997 17.2183 4.73587 20.6896C9.72973 24.1609 16.5837 22.9145 20.0445 17.9056ZM84 0.483887H61.8947V22.6557H84V0.483887Z"
				fill="#000000"
			></path>
			<mask
				id="mask0"
				style={{ maskType: "alpha" }}
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="84"
				height="23"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M50.8421 4.55325L46.8133 0.483887L39.7895 7.56844L32.6983 0.483887L28.7368 4.55325L35.755 11.5698L28.7368 18.592L32.6983 22.6557L39.7895 15.5711L46.8133 22.6557L50.8421 18.592L43.8239 11.5698L50.8421 4.55325ZM20.0445 17.9056C23.5054 12.8967 22.2627 6.02212 17.2688 2.55081C12.275 -0.920494 5.42106 0.325967 1.96017 5.33486C-1.50072 10.3438 -0.257997 17.2183 4.73587 20.6896C9.72973 24.1609 16.5837 22.9145 20.0445 17.9056ZM84 0.483887H61.8947V22.6557H84V0.483887Z"
					fill="#000000"
				></path>
			</mask>
			<g mask="url(#mask0)"></g>
		</svg>
	);
});
Logo.displayName = "Logo";
export const LogoComponent = () => <Logo width={160} height={40} />;
export const IconComponent = () => <Logo width={45} height={18} />;

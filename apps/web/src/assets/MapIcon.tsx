import { memo, type SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
	className?: string;
	color?: string;
	width?: string | number;
	height?: string | number;
}

const MapIcon = memo<Props>(({ className, color, width, height }) => {
	return (
		<svg
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M34.9 6.7C34.2 6 33.2 6 31.5 6H8.1C6.4 6 5.4 6 4.7 6.7C4 7.4 4 8.4 4 10.1V14.3V15.9V30.1C4 31.8 4 32.8 4.7 33.5C5.4 34.2 6.4 34.2 8.1 34.2H14H15.6H24H25.6H31.5C33.2 34.2 34.2 34.2 34.9 33.5C35.6 32.8 35.6 31.8 35.6 30.1V15.9V14.3V10.1C35.6 8.4 35.6 7.4 34.9 6.7ZM14 32.7H8.1C6.8 32.7 6.1 32.7 5.8 32.4C5.5 32.1 5.5 31.4 5.5 30.1V15.9H14V32.7ZM24 32.7H15.6V15.9H24V32.7ZM34 30.1C34 31.4 34 32.1 33.7 32.4C33.4 32.7 32.7 32.7 31.4 32.7H25.5V15.9H34V30.1ZM25.6 14.3H24H15.6H14H5.6V10.1C5.6 8.8 5.6 8.1 5.9 7.8C6.2 7.5 6.9 7.5 8.2 7.5H31.5C32.8 7.5 33.5 7.5 33.8 7.8C34 8.1 34 8.9 34 10.1V14.3H25.6Z"
				fill=""
			/>
		</svg>
	);
});
export default MapIcon;

import { memo, type SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
	className?: string;
}

const ArrowDropdown = memo<Props>(({ className, ...rest }) => {
	return (
		<svg
			width="20"
			height="21"
			viewBox="0 0 20 21"
			fill=""
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M9.84003 12.8079L6.74466 9.09342C6.38281 8.65924 6.69158 8 7.2568 8H12.7434C13.3086 8 13.6174 8.65923 13.2555 9.09342L10.1602 12.8079C10.0769 12.9079 9.92336 12.9079 9.84003 12.8079Z"
				fill=""
			/>
		</svg>
	);
});
export default ArrowDropdown;

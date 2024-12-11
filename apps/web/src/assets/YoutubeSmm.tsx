import { memo, type SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
	color?: string;
	width?: string | number;
	height?: string | number;
}

const YoutubeSmm = memo<Props>(
	({ color = "white", width, height, ...rest }) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={width}
				height={height}
				fill={color}
				{...rest}
			>
				<path
					fill=""
					fillRule="evenodd"
					d="M15.665 5.333c-1.325.004-6.394.042-9.935.307-.574.07-1.824.076-2.94 1.285-.88.92-1.165 3.01-1.165 3.01s-.268 2.25-.292 4.596v2.93c.024 2.345.292 4.594.292 4.594s.285 2.09 1.166 3.012c1.115 1.209 2.582 1.17 3.235 1.296 2.147.213 8.712.292 9.814.303h.546c1.412-.008 6.391-.053 9.882-.315.574-.07 1.824-.075 2.94-1.284.88-.921 1.165-3.012 1.165-3.012s.294-2.454.294-4.908v-2.302c0-2.456-.294-4.91-.294-4.91s-.285-2.09-1.165-3.01c-1.116-1.21-2.366-1.215-2.94-1.285-3.54-.265-8.61-.303-9.936-.307h-.667Zm-2.696 6.08 7.927 4.277-7.925 4.25-.002-8.527Z"
					clipRule="evenodd"
				/>
			</svg>
		);
	},
);
export default YoutubeSmm;

import { memo, type SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
	color?: string;
	width?: string | number;
	height?: string | number;
}

const VkSmm = memo<Props>(({ color = "white", width, height, ...rest }) => {
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
				d="M17.429 26C6.496 26 .259 18.492 0 6h5.477c.18 9.17 4.217 13.053 7.415 13.854V6h5.157v7.908c3.158-.34 6.475-3.944 7.595-7.908H30.8c-.86 4.885-4.458 8.489-7.016 9.97C26.343 17.171 30.44 20.314 32 26h-5.677c-1.219-3.804-4.257-6.747-8.274-7.147V26h-.62Z"
			/>
		</svg>
	);
});
export default VkSmm;

import { memo, type SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
	color?: string;
	width?: string | number;
	height?: string | number;
}

const TGSmm = memo<Props>(({ color = "white", width, height, ...rest }) => {
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
				d="m29.919 6.163-4.225 19.925c-.32 1.406-1.15 1.756-2.331 1.094l-6.438-4.744-3.106 2.988c-.344.344-.631.631-1.294.631l.463-6.556 11.93-10.78c.52-.463-.112-.72-.805-.257l-14.75 9.288-6.35-1.988c-1.381-.43-1.406-1.38.288-2.044l24.837-9.569c1.15-.43 2.156.255 1.78 2.012Z"
			/>
		</svg>
	);
});
export default TGSmm;

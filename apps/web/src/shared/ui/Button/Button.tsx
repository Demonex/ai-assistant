import { getVariantStyles } from "./Button.styles.js";
import type { ButtonProps } from "./Button.types.js";

export const Button = (props: ButtonProps) => {
	const { children, variant = "primary", ...rest } = props;

	return (
		<button
			className={`flex w-full justify-center rounded-xl ${getVariantStyles(variant)} px-3 py-3.5 text-caption_m_desk text-white hover:scale-105 transition duration-300`}
			{...rest}
		>
			{children}
		</button>
	);
};

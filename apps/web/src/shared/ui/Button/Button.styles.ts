import type { ButtonVariant } from "./Button.types.js";

export const getVariantStyles = (variant: ButtonVariant) => {
	let style;

	switch (variant) {
		case "primary":
			style = "bg-primary_blue";
			break;
		case "secondary":
			style = "border border-solid border-medium_grey";
			break;
		default:
			style = "bg-primary_blue";
			break;
	}

	return style;
};

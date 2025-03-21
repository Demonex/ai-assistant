import { cn } from "@repo/web/lib/utils.js";
import { Slider } from "@repo/web/components/ui/slider.js";

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderComponent({ className, ...props }: SliderProps) {
	return (
		<Slider
			defaultValue={[50]}
			max={100}
			step={1}
			className={cn("w-[100%]", className)}
			{...props}
		/>
	);
}

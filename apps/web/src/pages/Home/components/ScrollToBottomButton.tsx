import { CircleChevronDown } from "lucide-react";
import { memo, type FC } from "react";

interface ScrollToBottomButtonProps {
	isVisible: boolean;
	scrollToBottom: () => void;
}

export const ScrollToBottomButtont = memo(
	({ isVisible, scrollToBottom }: ScrollToBottomButtonProps) => {
		return (
			isVisible && (
				<CircleChevronDown
					size={36}
					strokeWidth={2}
					absoluteStrokeWidth
					className="bg-white rounded-full cursor-pointer"
					onClick={() => scrollToBottom()}
				/>
			)
		);
	},
);

import { type RefObject, useEffect, useState } from "react";

import { ChevronDown } from "lucide-react";

interface ScrollToBottomButtonProps {
	ref: RefObject<HTMLDivElement>;
}

export const ScrollToBottomButton = ({ ref }: ScrollToBottomButtonProps) => {
	const [isVisible, setIsVisible] = useState(false);

	const scrollToBottom = () => {
		ref.current.scrollTo({
			top: ref.current.scrollHeight,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		const container = ref.current;

		if (!container) return;

		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = container;
			setIsVisible(scrollTop + clientHeight < scrollHeight - 1000);
		};

		container.addEventListener("scroll", handleScroll);
		return () => {
			container.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		isVisible && (
			<div className="rounded-full border p-1 bg-white cursor-pointer shadow-md shadow-black-400 rounded-full">
				<ChevronDown
					size={25}
					strokeWidth={1.3}
					absoluteStrokeWidth
					onClick={scrollToBottom}
				/>
			</div>
		)
	);
};

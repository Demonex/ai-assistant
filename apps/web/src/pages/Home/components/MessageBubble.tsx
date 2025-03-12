import { formatLocalTime } from "@/helpers/index.js";
import { AccordionComponent } from "./AccordionComponent.js";
import { ReactMarkdownComponent } from "./ReactMarkdownComponent.js";
import { memo, useRef, useState } from "react";
import type { MessageProps } from "@/types/types.js";
import { toast } from "@/hooks/use-toast.js";
import { Copy } from "lucide-react";

export const MessageBubble = memo<{
	message: MessageProps;
	isRequest: boolean;
}>(({ message, isRequest }) => {
	const {
		created_at,
		message: text,
		fragments,
	} = isRequest ? message.request : message.response;

	const [isShowCopy, setIsShowCopy] = useState<string | null>(null);
	const [positionCopy, setPositionCopy] = useState<{ top: number }>({ top: 0 });

	const tooltipCopy = useRef(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const offsetY = e.clientY - rect.top;

		const tooltipHeight = tooltipCopy.current?.offsetHeight || 0;
		let correctedTop = offsetY - tooltipHeight / 2;

		correctedTop = Math.max(
			0,
			Math.min(correctedTop, rect.height - tooltipHeight),
		);

		setPositionCopy({ top: correctedTop });
	};

	const handleCopy = async (text: string) => {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("copy");
		document.body.removeChild(textArea);

		toast({
			title: "Текст cкопирован!",
		});
	};

	//TODO просмотреть, какие message шлет бэк и там принимать решение, оставлять эту фунцию или нет.
	const isFragments = (message) => {
		// console.log(message);
		return message.response.fragments && message.response.fragments.length > 0;
	};

	return (
		<div className={`max-w-screen-sm ${isRequest ? "self-end" : "w-full"}`}>
			<div className={`flex items-center gap-2 ${!isRequest && "w-full"}`}>
				<div
					className={`shadow-base rounded-lg border bg-card text-card-foreground ${isRequest ? "order-1" : "w-full"}`}
				>
					<div
						className={`relative inline-flex p-4 ${isFragments(message) && "w-full"}`}
						onMouseMove={handleMouseMove}
						onMouseEnter={() => setIsShowCopy(message.request.created_at)}
						onMouseLeave={() => setIsShowCopy(null)}
					>
						<ReactMarkdownComponent textMarkdown={text} />
						{isShowCopy === message.request.created_at && (
							<div
								ref={tooltipCopy}
								title="Копировать текст"
								onClick={() => handleCopy(message.request.message)}
								className={`absolute ${isRequest ? "right-[100%]" : "left-[100%]"} flex items-center cursor-pointer rounded-lg border bg-card text-card-foreground p-4`}
								style={{ top: `${positionCopy.top}px` }}
							>
								<Copy size={20} />
							</div>
						)}
					</div>
					{!isRequest && fragments && fragments.length > 0 && (
						<div className="inline-flex w-full">
							<AccordionComponent fragments={fragments} />
						</div>
					)}
				</div>
			</div>
			<div
				className={`flex items-center gap-2 ${isRequest ? "justify-end" : ""}`}
			>
				<time
					className={`mt-1 flex items-center text-sm text-muted-foreground ${isRequest ? "justify-end" : ""}`}
				>
					{formatLocalTime(created_at || new Date().toString())}
				</time>
			</div>
		</div>
	);
});

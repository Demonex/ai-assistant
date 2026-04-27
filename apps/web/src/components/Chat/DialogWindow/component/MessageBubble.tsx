import { type FC } from "react";

import { formatLocalTime } from "@repo/web/helpers/index.js";
import { toast } from "@repo/web/hooks/use-toast.js";
import type { Message } from "@repo/web/types/types.js";
import { Copy } from "lucide-react";

import { ReactMarkdownComponent } from "@/components/ReactMarkdownComponent.js";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip.js";

import { AccordionFragments } from "./AccordionFragments.js";

type MessageBubbleProps = {
	message: Message;
	isRequest: boolean;
};

export const MessageBubble: FC<MessageBubbleProps> = ({
	message,
	isRequest,
}) => {
	const {
		created_at,
		message: text,
		fragments,
	} = isRequest ? message.request : message.response;

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

	return (
		<div className={`max-w-screen-sm ${isRequest ? "self-end" : "w-full"}`}>
			<div className={`flex items-center gap-2 ${!isRequest && "w-full"}`}>
				<div
					className={`shadow-base rounded-lg border bg-card text-card-foreground ${
						isRequest ? "order-1" : "w-full"
					}`}
				>
					{text && (
						<div
							className={`relative inline-flex px-4 py-4 ${!isRequest && "w-full"}`}
						>
							<Tooltip>
								<TooltipTrigger asChild>
									<div
										onClick={() => handleCopy(text)}
										className="absolute right-0 bottom-[100%] flex items-center cursor-pointer hover:opacity-80 p-2"
									>
										<Copy size={14} />
									</div>
								</TooltipTrigger>
								<TooltipContent
									side="top"
									align="center"
									hidden={false}
									{...{
										children: "Копировать",
										hidden: false,
										className: "hidden md:block",
									}}
								/>
							</Tooltip>

							<ReactMarkdownComponent textMarkdown={text} />
						</div>
					)}

					{!isRequest && (
						<div className="inline-flex w-full">
							<AccordionFragments fragments={fragments} />
						</div>
					)}
				</div>
			</div>
			<div className={`flex items-center gap-2 ${isRequest && "justify-end"}`}>
				<time
					className={`mt-1 flex items-center text-sm text-muted-foreground ${
						isRequest && "justify-end"
					}`}
				>
					{formatLocalTime(created_at || new Date().toString(), "time")}
				</time>
			</div>
		</div>
	);
};

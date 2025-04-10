import { memo } from "react";

import { AccordionComponent } from "@repo/web/components/AccordionComponent.js";
import { formatLocalTime } from "@repo/web/helpers/index.js";
import { toast } from "@repo/web/hooks/use-toast.js";
import type { Message } from "@repo/web/types/types.js";
import { Copy } from "lucide-react";

import { ReactMarkdownComponent } from "./ReactMarkdownComponent.js";

export const MessageBubble = memo<{
	message: Message;
	isRequest: boolean;
}>(({ message, isRequest }) => {
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
					<div
						className={`relative inline-flex px-4 py-4 ${!isRequest && "w-full"}`}
					>
						<div
							title="Копировать текст"
							onClick={() =>
								handleCopy(
									isRequest
										? message.request.message
										: message.response.message,
								)
							}
							className="absolute right-0 bottom-[100%] flex items-center cursor-pointer hover:opacity-80 p-2"
						>
							<Copy size={14} />
						</div>

						<ReactMarkdownComponent textMarkdown={text} />
					</div>

					{!isRequest && fragments && fragments.length > 0 && (
						<div className="inline-flex w-full">
							<AccordionComponent fragments={fragments} />
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
});
